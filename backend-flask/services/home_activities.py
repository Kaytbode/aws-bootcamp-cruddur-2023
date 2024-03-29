from datetime import datetime, timedelta, timezone
from opentelemetry import trace
import logging
from lib.db import pool, query_wrap_array

tracer = trace.get_tracer("home activities")

class HomeActivities:
  def run(logger, cognito_user_id=None):
    logger.info("Home activities")
    with tracer.start_as_current_span("home activities mock data"):
      span = trace.get_current_span()
      now = datetime.now(timezone.utc).astimezone()
      span.set_attribute("app.now", now.isoformat())

      results = []

      sql = query_wrap_array("""
      SELECT
        activities.uuid,
        users.display_name,
        users.handle,
        activities.message,
        activities.replies_count,
        activities.reposts_count,
        activities.likes_count,
        activities.reply_to_activity_uuid,
        activities.expires_at,
        activities.created_at
      FROM public.activities
      LEFT JOIN public.users ON users.uuid = activities.user_uuid
      ORDER BY activities.created_at DESC
      """)

      with pool.connection() as conn:
        with conn.cursor() as cur:
          cur.execute(sql)
          # this will return a tuple
          # the first field being the data
          json = cur.fetchone()
          results = json[0]

      if cognito_user_id is not None:
        extra_crud = {
          'username': cognito_user_id,
          'uuid': '248959df-3079-4947-b847-9e0892d1bab4',
          'handle':  'Lore',
          'message': '{} is wonderful'.format(cognito_user_id),
          'created_at': (now - timedelta(hours=1)).isoformat(),
          'expires_at': (now + timedelta(hours=12)).isoformat(),
          'likes': 1042,
          'replies': []
        }

        results.insert(0,extra_crud)

      span.set_attribute("app.result length", len(results))
      return results
      
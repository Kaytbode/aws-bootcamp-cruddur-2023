import './HomeFeedPage.css';
import React from "react";
import { Auth } from 'aws-amplify';

import DesktopNavigation  from '../components/DesktopNavigation';
import DesktopSidebar     from '../components/DesktopSidebar';
import ActivityFeed from '../components/ActivityFeed';
import ActivityForm from '../components/ActivityForm';
import ReplyForm from '../components/ReplyForm';

// [TODO] Authenication
import Cookies from 'js-cookie'

// honeycomb 
import { trace } from '@opentelemetry/api';

export default function HomeFeedPage() {
  const [activities, setActivities] = React.useState([]);
  const [popped, setPopped] = React.useState(false);
  const [poppedReply, setPoppedReply] = React.useState(false);
  const [replyActivity, setReplyActivity] = React.useState({});
  const [user, setUser] = React.useState(null);
  const dataFetchedRef = React.useRef(false);

  const loadData = async () => {
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/api/activities/home`
    return trace
            .getTracer('home-activities tracer')
            .startActiveSpan(`Request: GET ${backend_url}`, async (span) => {

              const traceparent = `00-${span.spanContext().traceId}-${span.spanContext().spanId}-01`;
                try {
                  const res = await fetch(backend_url, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    },
                    method: "GET",
                    traceparent
                  });

                  span.setAttributes({
                    'http.method': 'GET',
                    'http.url': backend_url,
                    'response.status_code': 200
                  });

                  let resJson = await res.json();

                  if (res.status === 200) {
                    setActivities(resJson);
                    span.setStatus({ code: SpanStatusCode.OK });
                  } else {
                    console.log(res);
                  }
                } catch (err) {
                  console.log(err);
                  span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
                } finally {
                  span.end();
                }
            });
  };

  const checkAuth = async () => {
    Auth.currentAuthenticatedUser({
      // Optional, By default is false. 
      // If set to true, this call will send a 
      // request to Cognito to get the latest user data
      bypassCache: false 
    })
    .then((user) => {
      console.log('user',user);
      return Auth.currentAuthenticatedUser()
    }).then((cognito_user) => {
        setUser({
          display_name: cognito_user.attributes.name,
          handle: cognito_user.attributes.preferred_username
        })
    })
    .catch((err) => console.log(err));
  };

  React.useEffect(()=>{
    //prevents double call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    loadData();
    checkAuth();
  }, [])

  return (
    <article>
      <DesktopNavigation user={user} active={'home'} setPopped={setPopped} />
      <div className='content'>
        <ActivityForm  
          popped={popped}
          setPopped={setPopped} 
          setActivities={setActivities} 
        />
        <ReplyForm 
          activity={replyActivity} 
          popped={poppedReply} 
          setPopped={setPoppedReply} 
          setActivities={setActivities} 
          activities={activities} 
        />
        <ActivityFeed 
          title="Home" 
          setReplyActivity={setReplyActivity} 
          setPopped={setPoppedReply} 
          activities={activities} 
        />
      </div>
      <DesktopSidebar user={user} />
    </article>
  );
}
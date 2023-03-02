# Week 2 — Distributed Tracing

## Instrument Honeycomb
- Following along with the instructor, I instrumented the backend of my Cruddur application with Honeycomb. 
- I observed the traces were created as I refreshed the `/api/activities/home` page of the backend API.
- I added more attributes to my honeycomb instrumentation and ran custom queries to observe successful calls to the flask `/api/activities/home` route.
- The queries were saved for later use.
- Through [Honeycomb documentation](https://docs.honeycomb.io/getting-data-in/opentelemetry/browser-js/), I was able to instrument my frontend application and connect the frontend traces to the backend. 

- ![Honeycomb frontend-backend traces](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/honeycomb.png)

## Instrument AWS X-RAY
I instrumented the backend API to use AWS X-RAY.

![AWS X-RAY](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/xray%20traces.png)

## Configure custom logger
I configured the backend application to send logs to cloudwatch and I was able to view the log streams.

![Cloudwatch](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/custom%20logs.png)

## Integrate rollbar
I integrated rollbar into the backend and observed its output.

![Rollbar](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/rollbar.png)

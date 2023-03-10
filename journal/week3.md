# Week 3 — Decentralized Authentication

## AWS Cognito
- I created an application userpool using AWS Cognito
- Users can log in using email or username
- I configured my frontend application to use AWS amplify and AWS cognito
- I refactored the user signin, signup, password confirmation, password reset pages to use AWS cognito
- I implemented JWT verification on the backend flask app and I was able to show conditional messages based on user authentication status.
- I refactored the `CognitoJwtToken.verify` method to extract and verify the token. I did not have to use the `extract_access_token` function.
- I implemented user logout to remove token in local storage




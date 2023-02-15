# Week 0 — Billing and Architecture

## Spending Considerations

- Through Chirag's video, I was able to set up a billing alarm to monitor my estimated AWS charges.
I learnt from the instructor that AWS only provides 10 alarms for the free tier per month. 
- The instructor also guided me through the creation of cost budget to monitor and to be alerted, when my spending 
hits my particular set limit.

## Security Considerations

- Ashish's video gave a vivid explanation of setting up an extra layer of security on my AWS accounts.
Using an authentication application, I was able to successfully configure MFA on my AWS accounts. 
- He also explained the importance of restricting my AWS root account to administrative tasks and creating IAM users
for other everyday tasks. I created an IAM user and assigned roles to him. 
- Ashish explained the importance of using AWS organization to manage accounts. I did not set up an organization
on my AWS account because I do not think I need it yet.
- He also clarified the differences among users, policies and roles.

## Conceptual Diagram on a napkin

Using the live video as a guide, I created my "napkin" design. 
![napkin design](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/20230215_145206.jpg)

## Architectural diagram in Lucid Chart
I was able to use Lucid charts to replicate the mockup architectural design for the Cruddur application. A link to
[My Architectural design](https://lucid.app/lucidchart/aaec3710-eff3-4c5c-9cea-7c9ba7616d09/edit?viewport_loc=96%2C-3481%2C1672%2C857%2C0_0&invitationId=inv_2d5d2201-b182-4eda-8487-b321d6ffa2c2)
![Architectural design](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/my%20arch%20design.png)
- I got the **Momento icon** to display correctly on Lucid, by removing the fill attribute on the svg element.
## Configure AWS CLI in Gitpod
- I created my AWS credentials using the AWS console
- I used the AWS cloudshell to confirm my AWS profile.
- I set up environment variables on my Gitpod account.
- Using Andrew Brown's video as a guide, I configured my gitpod.yml file to automatically install AWS CLI in my workspace directory.

## Eventbridge on AWS health dashboard
- I used this [AWS doc](https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html) as a guide, to create an eventbridge rule
that monitors the health status of EC2 instances on my AWS account. 
- I configured it to use Amazon SNS as it target type.

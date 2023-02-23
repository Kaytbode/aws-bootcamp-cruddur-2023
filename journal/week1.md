# Week 1 — App Containerization

## Containerize application

Following the instructions laid out in the week 1 video, I used docker commands to containerize the frontend 
and backend of my application. I observed the JSON output of the backend on `localhost:4567/api/activities/home` 
and the frontend on `localhost:3000`. I also used the docker-compose command to build and observe the interactions 
between the frontend and the backend.

## Notifications endpoint

I created a notifications endpoint in the flask app and documented the api endpoint using OpenAPI document
and standard.I confirmed that the application frontend was displaying the new api endpoint correctly, after the 
modifications.

## Dynamodb container and Postgres container

I followed the instructions in the provided link and video to modify my docker-compose.yml file to install 
postgres and dynamodb containers. I created the music table in dynamodb and put items in it. I was also able to 
login to the postgres database as a postgres user.

## Docker CMD as external script

I executed the docker cmd command `python3 -m flask run --host=0.0.0.0 --port=4567` after navigating to the backend
directory and installing the required packages. I got **CORS - related errors**, but I solved it by adding the 
flask_cors decorator `@cross_origin()` below the app route `@app.route("/api/activities/home", methods=['GET'])` definition.

## Push and tag an image on dockerhub

I created a simple node.js application that prints `hello campers` to the console. Using docker locally installed on my
machine, I was able containerize the application and push it to dockerhub. You can view the docker image here 
[hello-campers](https://hub.docker.com/r/kaytbode/hello-campers).

## Launch an EC2 instance with docker installed

Using this [article](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html#create-container-image-install-docker)
as a guide, I was able to install docker on my EC2 instance. I pulled the image I created earlier from dockerhub
and ran the docker image. You can view the output below ![docker output on ec2 instance](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/ec2%20docker.png)

## Implement a health check in the V3 docker-compose file

I implemented a health check service to the Cruddur docker-compose.yml file and I was able to confirm it was active by using
the `docker ps` command. ![health check ](https://github.com/Kaytbode/aws-bootcamp-cruddur-2023/blob/main/journal/health-check.png)

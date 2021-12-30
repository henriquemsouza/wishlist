# Wishlist Serverless Lambda

## Requirements:
  * [Docker](https://docs.docker.com/engine/installation/)

  * [Docker-compose recommended version 1.29.2](https://docs.docker.com/compose/install/)



# Running the project with docker
## 1. Created an .env file based on the .env.sample file in the project root

### 2. Initial build with docker
```sh
docker-compose up --build
```

___
___


# Running the project without docker
## 1. Install
```sh
yarn
```

## 2. Running migrations
```sh
yarn migration:up
```

## Start Server
obs: without the docker you will need to create a postgres database manually and pass it in .env
```sh
yarn start:dev
```

___

## after running the project In the url below you can find a small documentation of the existing endpoints
```
http://localhost:3000/v1/api-docs/
```
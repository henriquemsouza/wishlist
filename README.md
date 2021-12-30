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

## Folder Structure (/src)
```sh
.
├── infra
│   ├── config
│   ├── container
│   ├── db
│   │   ├── entities
│   │   ├── migrations
│   │   ├── seeds
│   │   ├── utils
│   │   └── validations
│   │       └── errors
│   │           └── structureError
│   └── http
├── modules
│   ├── Customer
│   │   ├── CreateCustomer
│   │   │   └── interface
│   │   ├── DeleteCustomer
│   │   │   └── interface
│   │   ├── ListCustomer
│   │   │   └── interface
│   │   └── UpdateCustomer
│   │       └── interface
│   └── Wishlist
│       ├── CreateWishlistItem
│       │   ├── interface
│       │   └── utils
│       ├── DeleteWishlistItem
│       │   └── interface
│       └── ListWishlist
│           └── interface
├── server
├── services
│   └── product
├── shared
│   ├── adapters
│   ├── contracts
│   ├── decorators
│   ├── exceptions
│   ├── responses
│   └── types
└── utils

```

## Modules Structure 
```sh
.
├── Customer
│   ├── CreateCustomer
│   │   ├── CreateCustomerCase.ts
│   │   ├── CreateCustomerRouter.ts
│   │   └── interface
│   │       └── CreateCustomerInterface.ts
│   ├── CustomerContainer.ts
│   ├── CustomerRoutes.ts
│   ├── DeleteCustomer
│   │   ├── DeleteCustomerCase.ts
│   │   ├── DeleteCustomerRouter.ts
│   │   └── interface
│   │       └── DeleteCustomerInterface.ts
│   ├── ListCustomer
│   │   ├── interface
│   │   │   └── ListInterface.ts
│   │   ├── ListCustomerCase.ts
│   │   └── ListCustomerRouter.ts
│   └── UpdateCustomer
│       ├── interface
│       │   └── UpdateCustomerInterface.ts
│       ├── UpdateCustomerCase.ts
│       └── UpdateCustomerRouter.ts
├── Routes.ts
└── Wishlist
    ├── CreateWishlistItem
    │   ├── CreateWishlistItemCase.ts
    │   ├── CreateWishlistItemRouter.ts
    │   ├── interface
    │   │   └── CreateWishlistItemInterface.ts
    │   └── utils
    │       └── CreateWishlistItem.utils.ts
    ├── DeleteWishlistItem
    │   ├── DeleteWishlistItemCase.ts
    │   ├── DeleteWishlistItemRouter.ts
    │   └── interface
    │       └── DeleteWishlistItemInterface.ts
    ├── ListWishlist
    │   ├── interface
    │   │   └── ListWishlistInterface.ts
    │   ├── ListWishlistCase.ts
    │   └── ListWishlistRouter.ts
    ├── WishlistContainer.ts
    └── WishlistRoutes.ts

```
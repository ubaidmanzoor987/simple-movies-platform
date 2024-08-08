# Backend

### Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Setup Database

Download postresql for the platform you are using like (Windows, Ubuntu, linux etc). Setup the user name or Create a new role . Create the database name for example (q_for_rice)

## Running the app

Create a .env file in backend folder by copying .env.example and change the databse user name and password and database name setup

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Building the app

```bash
$ npm run build
```

Open [http://localhost:8000/api](http://localhost:8000/api) with your browser to see the swagger.

#

# Front End

## Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Create a .env file in frontend folder by copying .env.example

## Setup Project

First, Install the modules :

```bash
npm install
```

## Run Project

```
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

```

Open [http://localhost:6171](http://localhost:6171) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Build Project

```
npm run build
```

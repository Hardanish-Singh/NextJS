This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. First, run the below command to download npm packages

```bash
 npm i
```

2. Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the Project

1. The Project uses latest version of NextJS(which uses folder based routing), React.
2. All the API Routes are under _src/app/api_
3. All the Server Actions are under _/actions_
4. All the Components are under _/src/app/components_
5. The Project Next Auth v5 beta version for Authentication ( JWT Strategy )
6. I am using bcryptjs for hashing the password, React Toast for showing notification, Zod for schema validations and Prisma ORM with SQLite DB.
7. when we visit home page [http://localhost:3000](http://localhost:3000), <br/>
   a. if the user is not authenticated, it will automatically redirect to /login page/route <br/>
   b. if the user is not registered, there is an option to register/sign up which will redirect to /register page/route, the api route for this is [/api/register] <br/>
   c. if the user forgot its password, there is an option to reset the password which will redirect to /reset page/route which uses server action. <br/>
   d. After successful authentication, user goes to home page where can play videos. <br/>
8. I am using React Player for showing Vidoes/Audios which are hardcoded in the code at the moment.

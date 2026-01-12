# NextJS Projects Repository

This repository hosts a collection of Next.js applications exploring different features, versions, and use cases.

## Projects

### 1. [Issue Tracker (v2)](./issue_tracker)

A comprehensive issue tracking application built with Next.js 14.

-   **Location**: `issue_tracker/`
-   **Key Tech**: Next.js 14, Prisma, NextAuth.js (v5 Beta), Radix UI Themes, React Hook Form.
-   **Highlights**: Uses newer `@auth/prisma-adapter` and NextAuth v5.

### 2. [Issue Tracker (v1)](./issue-tracker)

An earlier version of the issue tracking application.

-   **Location**: `issue-tracker/`
-   **Key Tech**: Next.js 14, Prisma, NextAuth.js (v4), Radix UI Themes.
-   **Highlights**: Uses standard `next-auth` v4 and `@next-auth/prisma-adapter`.

### 3. [Video Storytelling App](./video-storytelling-next-app)

A modern storytelling application leveraging the latest Next.js features.

-   **Location**: `video-storytelling-next-app/`
-   **Key Tech**: Next.js 15, Turbopack, Prisma, NextAuth.js (v5 Beta), React 19.
-   **Highlights**: Built with the latest React 19 and Next.js 15 stack including Turbopack for faster development.

## Getting Started

Navigate to any project directory and follow the standard Next.js setup:

```bash
cd <project-folder>
npm install
# or
yarn install

# Run development server
npm run dev
```

## Prerequisites

-   **Node.js**: Latest LTS recommended (required for Next.js 15).
-   **Database**: Most projects behave as monorepos with their own `prisma` setup. Ensure you have a configured database (e.g., MySQL, PostgreSQL) and update the `.env` file in each project folder accordingly.

---

_Repository for NextJS Projects and Topics_

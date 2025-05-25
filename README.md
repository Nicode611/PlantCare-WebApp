## About the Project

**PlantCare** is a plant management web app built with **Next.js**. It helps users track watering schedules, plant health, and other important care information through a clean and modern interface. The project leverages a set of powerful libraries and tools such as ShadCN UI for the design system, FullCalendar for task planning, and Axios for HTTP requests.

## Getting Started

### Frontend

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Backend

To run the backend locally with a local database, follow these steps:

1. Make sure you have **PostgreSQL** (or your preferred database) installed and running on your machine.
2. Create a database named `plantcare` (or choose your own name and adjust accordingly).
3. In the project root, create a `.env` file and set your database URL. For example:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/plantcare"
   ```

4. Install Prisma dependencies if not already installed:

   ```bash
   npm install @prisma/client
   ```

5. Generate Prisma client and apply migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

Now your database is ready, and you can use the app with backend features connected.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Dependancies

Carrousel - swiper
Calendar - FullCalendar
Components - shadcn/ui
Icons - Lucide
HTTP Request - Axios

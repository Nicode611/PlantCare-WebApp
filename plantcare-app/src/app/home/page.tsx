import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import HomeClient from './HomeClient';

async function Page() {
  /* const session = await auth();
  if (!session) {
    redirect('/signin');
  } */
  return <HomeClient />;
}
export default Page;

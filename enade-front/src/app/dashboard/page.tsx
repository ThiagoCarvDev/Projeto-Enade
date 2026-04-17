import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { ButtonSignOut } from "./_components/button-signout";
import { redirect } from 'next/navigation';
import CardWrapper, { Card } from '@/components/dashboard/card';

import LatestInvoices from '@/components/dashboard/latest-simulation';
import ErrorReview from '@/components/dashboard/error-review'

export default async function Dashboard() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

        <ErrorReview />
        <LatestInvoices />

      </div>


      <ButtonSignOut />
    </div>
  );
}
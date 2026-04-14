import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { ButtonSignOut } from "./_components/button-signout";
import { redirect } from 'next/navigation';

export default async function Dashboard() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-2">Página dashboard</h1>
      <h3>Usuario logado: {session.user.name}</h3>
      <h3 className='mb-4'>Email: {session.user.email}</h3>
      <h3 className='mb-4'>Id user: {session.user.id}</h3>
      <ButtonSignOut />
    </div>
  );
}
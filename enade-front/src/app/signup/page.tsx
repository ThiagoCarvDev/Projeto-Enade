import Link from "next/link"
import { SignupForm } from "./_components/signup-form"

export default function Signup() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Cadastro</h1>
          <p className="mt-2 text-sm text-muted-foreground">Crie sua conta para começar</p>
        </div>

        <SignupForm />

        <div className="text-center text-sm">
          <p>
            Já tem uma conta?{" "}
            <Link href="/" className="font-medium text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

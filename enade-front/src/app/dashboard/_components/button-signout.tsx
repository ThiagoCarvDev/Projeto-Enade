"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export function ButtonSignOut() {
  const router = useRouter();

  async function signOut() {
    router.replace("/");
  }

  return (
    <Button onClick={signOut}>
      Sair da conta
    </Button>
  );
}
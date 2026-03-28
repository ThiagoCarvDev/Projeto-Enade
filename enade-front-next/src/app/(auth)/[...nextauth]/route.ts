import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

// next-auth precisa responder GET e POST
export { handler as GET, handler as POST }
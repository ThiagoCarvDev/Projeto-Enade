import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                senha: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                // Por enquanto fixo para testar
                // Depois você troca pela consulta no banco
                if (
                    credentials?.email === "teste@enade.com" &&
                    credentials?.senha === "123456"
                ) {
                    return {
                        id: "1",
                        name: "João Silva",
                        email: "teste@enade.com",
                    }
                }

                return null // login negado
            },
        }),
    ],

    pages: {
        signIn: "/login", // sua tela de login
    },

    session: {
        strategy: "jwt", // sessão via token, sem banco por enquanto
    },

    secret: process.env.NEXTAUTH_SECRET,
}
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

enum Role {
    JOB_SEEKER = 'JOB_SEEKER',
    RECRUITER = 'RECRUITER',
}

const prisma = new PrismaClient();

declare module "next-auth" {
    interface Session {
        id: string;
        role: string;
    }
}

export const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "select", options: Object.values(Role) },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { name, email, password, role } = credentials;

                let user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    user = await prisma.user.create({
                        data: {
                            email,
                            name,
                            password: hashedPassword,
                            role: role as Role
                        },
                    });
                }

                const isValidPassword = await bcrypt.compare(password, user.password);
                if (isValidPassword) {
                    return { id: user.id.toString(), email: user.email, role: user.role };
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id as string;
                session.role = token.role as string;
            }
            return session;
        },
    },
};

import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { UserInterface } from '@/interfaces/UserInterface';
import { prisma } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session) return null;

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) return session;

      session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        maxTokens: user.maxTokens,
      } as UserInterface;

      return session;
    },
  },
};

export default NextAuth(authOptions);

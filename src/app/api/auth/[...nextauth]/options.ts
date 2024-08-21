import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const user = {
          id: '1',
          name: 'John Doe',
          email: 'jJqz8@example.com',
          password: '123456',
        }

        if (user.email === data.email && user.password === data.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/login',
    signOut: '/account',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/register',
  },
};
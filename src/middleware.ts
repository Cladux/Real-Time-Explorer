// export { default } from 'next-auth/middleware';

// export const config = {
//   matcher: '/((?!login|support|register|forget-password|reset-password).*)',
// };


export { auth as middleware } from "@/lib/auth"
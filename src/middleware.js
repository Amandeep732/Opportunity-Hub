import { NextResponse } from 'next/server'
 

export async function middleware(request) {
   const path = request.nextUrl.pathname;

  const protectedBases = [
    '/api/event/usersApi',
    '/api/event/adminApi'
  ];

   const needsAuth = protectedBases.some(base => path.startsWith(base));
   const token = request.cookies.get('accessToken')?.value || '';

   if (needsAuth && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/api/:path*'  ]
}
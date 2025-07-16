
import { NextResponse } from 'next/server'
import { verifyadmin } from './helpers/verifyadmin';


export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('accessToken')?.value
  const userApiBase = '/api/event/usersApi';
  const adminApiBase = '/api/event/adminApi';
  // auth logic for all routes
  const isProtected = path.startsWith(userApiBase) || path.startsWith(adminApiBase);
  if (!isProtected) {
    return NextResponse.next();
  }
  // isAdmin logic for all admin routes
  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized - No token provided" },
      { status: 401 }
    );
  }

  const user = verifyadmin(token)
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid token" },
      { status: 401 }
    );
  }
  if (path.startsWith(adminApiBase) && user.role !== 'admin') {
    return NextResponse.json(
      { error: "Forbidden - Admin access required" },
      { status: 403 }
    );
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-data', JSON.stringify({
    id: user.id,
    role: user.role
  }));

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ['/api/event/usersApi/:path*', '/api/event/adminApi/:path*']
}
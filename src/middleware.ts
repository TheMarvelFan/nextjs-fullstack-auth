import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/signup', "/verifyemail", "/forgotPassword", "/createNewPassword"].includes(path);
    const cookie = request.cookies.get('token')?.value || "";

    if (isPublicPath && cookie) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !cookie) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/profile',
        '/profile/:path',
        '/signup',
        '/verifyemail',
        '/forgotPassword',
        '/createNewPassword'
    ]
}

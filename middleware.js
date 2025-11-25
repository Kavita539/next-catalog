import { NextResponse } from 'next/server';

export function isAuthenticated(request) {
    return request.cookies.has('auth_token'); 
}

export function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        if (!isAuthenticated(request)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/'],
};
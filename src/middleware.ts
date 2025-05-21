import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const publicPaths = ['/', '/cadastro', '/api/login', '/api/auth/me', '/api/auth/logout', '/api/classes'];

    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }

    const cookie = req.headers.get('cookie') || '';
    const { token } = parse(cookie);

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|images|api|api/.*).*)',
    ],
};

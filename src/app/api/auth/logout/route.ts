import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
    const res = NextResponse.json({ ok: true });

    res.headers.set(
        'Set-Cookie',
        serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict',
            maxAge: 0, // expira imediatamente
        })
    );

    return res;
}

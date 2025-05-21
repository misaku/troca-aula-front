import {NextRequest, NextResponse} from 'next/server';
import {serialize} from 'cookie'
import api from "@/api.service";


export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    try {

        const response = await api.post('/auth/login', { email, password });
        const { access_token:token } = response.data;

        const res = NextResponse.json({ ok: true });


        const maxAge = 7 * 24 * 60 * 60 * 1000;
        const expiresAt = new Date(Date.now() + maxAge)

        res.headers.set(
            'Set-Cookie',
            serialize('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                sameSite: 'strict',
                expires: expiresAt,
                maxAge: maxAge,
            })
        );

        return res;
    } catch (e) {
        return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET() {
    try {
        const cookie = await cookies();

        const tokenCookie = cookie.get('token');      // retorna { value, name, ... } ou undefined

        if (!tokenCookie) {
            return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
        }


        const secret = new TextEncoder().encode(process?.env?.SECRET ?? 's0//P4$$w0rD');

        const { payload } = await jwtVerify(tokenCookie.value, secret);
        // @ts-ignore
        const [upsUser] = payload?.sub?.upsUser ?? [];
        console.log(payload);
        return NextResponse.json({
            id: payload?.sub?.id,
            name: payload?.sub?.name,
            email: payload?.sub?.email,
            profileId: upsUser?.profileId
        });
    } catch (error) {
        return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
}

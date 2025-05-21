import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import api from "@/api.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {email, password} = req.body
    const payload = {
        password,
        email,
    }
    try {
        const response = await api.post('/auth/login', payload);

        if (response.status === 200) {
            return res.status(401).json({message: 'Credenciais inválidas'})
        }

        const {token} = response.data;

        res.setHeader('Set-Cookie', serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict',
        }))

        return res.status(200).json({ok: true})
    } catch (e) {
        return res.status(500).json({message: 'Erro interno'})
    }
}

import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import api from "@/api.service";


export async function PATCH(req: NextRequest, {params}: { params: { id: string } }
) {
    try {
        const cookie = await cookies();

        const tokenCookie = cookie.get('token');      // retorna { value, name, ... } ou undefined
        const {id} = params; // Parâmetro de rota
        const body = await req.json(); // Corpo da requisição

        const reponse = await api.patch(`/classes/${id}`, body, // Corpo da requisição (payload)
            {
                headers: {
                    'Authorization': `Bearer ${tokenCookie?.value}`
                }
            })
        return NextResponse.json(reponse.data, {status: 200});
    } catch (error) {
        console.error(error); // Para log, nunca envie detalhes completos para o cliente
        return NextResponse.json(
            {error: 'Ocorreu um erro ao Atualizar as classes.'},
            {status: 500}
        );

    }
}
export async function DELETE(req: NextRequest, {params}: { params: { id: string } }
) {
    try {
        const cookie = await cookies();

        const tokenCookie = cookie.get('token');      // retorna { value, name, ... } ou undefined
        const {id} = params; // Parâmetro de rota

        const reponse = await api.delete(`/classes/${id}`, // Corpo da requisição (payload)
            {
                headers: {
                    'Authorization': `Bearer ${tokenCookie?.value}`
                }
            })
        return NextResponse.json(reponse.data, {status: 200});
    } catch (error) {
        console.error(error); // Para log, nunca envie detalhes completos para o cliente
        return NextResponse.json(
            {error: 'Ocorreu um erro ao deletar as classes.'},
            {status: 500}
        );

    }
}

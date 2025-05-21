import {useState, useEffect} from 'react';
import Base64 from 'crypto-js/enc-base64';
import {enc}from 'crypto-js';
export interface UserData{

}

export function useUser() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const decodeToken = (token: string) => {
        try {
            // JWT tokens são divididos em 3 partes por pontos
            const [, payloadBase64] = token.split('.');
            // Decodifica a parte do payload do JWT
            const decodedPayload = Base64.parse(payloadBase64).toString(enc.Utf8);
            return JSON.parse(decodedPayload);
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return null;
        }
    };

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/auth/me', {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            } else {
                setUserData(null);
            }
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            setUserData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setUserData(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return {
        user: userData,
        isLoading,
        logout,
        refreshUserData: fetchUserData
    };
}

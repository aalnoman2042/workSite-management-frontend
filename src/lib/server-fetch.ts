import { getCookie } from "@/services/auth/tokenHandler";



const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1";

export

const serverFetchHelper = async (endPoint: string, options: RequestInit): Promise<Response> => {
    const {headers, ...restOptions} = options;
    const accessToken = await getCookie('accessToken');
    const refreshToken = await getCookie('refreshToken');

    const response = await fetch(`${BACKEND_URL}${endPoint}`, { 
        headers: {
            ...headers,
     Cooike : accessToken ? `accessToken=${accessToken}; refreshToken=${refreshToken}` : '',
            'Content-Type': 'application/json',
        },
        ...restOptions,
        credentials: 'include' 
    });
    return response;
}

export const serverFetch = {
    get: async (endPoint: string, options: RequestInit = {}): Promise<Response> => {
        return serverFetchHelper(endPoint, { ...options, method: 'GET' });
    }
}
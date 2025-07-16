import { jwtVerify } from 'jose'

export const verifyadmin = async (token) => {
    try {
        const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}
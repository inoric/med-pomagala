import { JwtPayload } from "jsonwebtoken";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = 'token';

interface TokenData extends JwtPayload {
    userId: number;
}

export function setToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
}

export function unsetToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
}

export function getToken(): string|null {
    if (!process.browser) {
        return null;
    }

    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (!token) { // Token not set
        return null;
    }

    return token;
}

/**
 * Get decoded token. Null will be returned for expired tokens.
 */
export function getTokenData(): TokenData|null {
    const token = getToken();
    if (!token) { // Token not set
        return null;
    }

    const tokenData = jwtDecode<TokenData>(token);
    if (tokenData.exp) {
        const unixMsecs = (new Date()).getTime(); // Miliseconds since the unix epoch
        const unixSecs = Math.floor(unixMsecs / 1000); // Seconds since the unix epoch
        if (unixSecs >= tokenData.exp) {
            console.warn('TOKEN EXPIRED');
            return null;
        }
    }

    return tokenData;
}

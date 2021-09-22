import { useEffect } from "react";
import { getTokenData } from "./client-token";

export function useAuthGuard(): string|null {
    useEffect(() => {
        if (!process.browser) {
            return;
        }

        if (!getTokenData()) {
            window.location.href = "/login";
        }
    }, []);

    if (!process.browser) {
        return null;
    }

    return window.sessionStorage.getItem('token');
}
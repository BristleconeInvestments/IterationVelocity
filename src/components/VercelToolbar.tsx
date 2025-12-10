import { useEffect } from 'react';
import { mountVercelToolbar, unmountVercelToolbar } from '@vercel/toolbar';

export function VercelToolbar() {
    useEffect(() => {
        mountVercelToolbar();
        return () => unmountVercelToolbar();
    }, []);

    return null;
}

import { useEffect } from 'react';
import { mountVercelToolbar } from '@vercel/toolbar/vite';

export function VercelToolbar() {
    useEffect(() => {
        // Only mount in the browser
        if (typeof window !== 'undefined') {
            const unmount = mountVercelToolbar();
            return () => {
                if (unmount) unmount();
            };
        }
    }, []);

    return null;
}

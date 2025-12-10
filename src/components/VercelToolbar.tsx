import { useEffect } from 'react';
import { mountVercelToolbar, unmountVercelToolbar } from '@vercel/toolbar';

export function VercelToolbar() {
    useEffect(() => {
        console.log('Mounting Vercel Toolbar...');
        try {
            const cleanup = mountVercelToolbar();
            console.log('Vercel Toolbar mounted. Cleanup fn:', cleanup);
            /*
              If mountVercelToolbar returns a cleanup function, use it.
              Otherwise fall back to the global unmount.
            */
            return () => {
                console.log('Unmounting Vercel Toolbar...');
                if (typeof cleanup === 'function') {
                    cleanup();
                } else {
                    unmountVercelToolbar();
                }
            };
        } catch (err) {
            console.error('Failed to mount Vercel Toolbar:', err);
        }
    }, []);

    return null;
}

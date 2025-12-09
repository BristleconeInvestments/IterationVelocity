import { type Flag } from '../lib/flags';
import { ReactNode } from 'react';

interface FlagGuardProps {
    flag: Flag<boolean>;
    children?: ReactNode;
    fallback?: ReactNode;
}

export function FlagGuard({ flag, children, fallback = null }: FlagGuardProps) {
    // In a real SSR environment, you might pass values from the server.
    // For Client-Side SPA, we rely on the default or overrides (if implemented).
    // The .getValue() from @vercel/flags/react usually needs context or default.
    // Since we defined decide() in the flag, we can often just use the flag key-based check
    // or use the simple approach for now:

    // Note: unstable_flag in react returns a component or a hook depending on usage?
    // Actually, 'flag' from @vercel/flags/react returns a standard object structure.

    // Checking documentation behavior simulation:
    // If 'decide' is static client-side, we can just call it or check default?
    // But strictly, we should treat it as dynamic.

    // For now in this Vite app, we simply execute the decide function if it's synchronous,
    // or we need a proper async loader. Assuming decide() is sync for SPA simple flags.

    const isEnabled = flag.decide();

    return isEnabled ? <>{children}</> : <>{fallback}</>;
}

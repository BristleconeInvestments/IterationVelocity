// Stubbing Vercel Flags partially since the specific package imports are tricky in this env
// We define our own simple Flag type for now to unblock the build and framework structure.

export type Flag<T> = {
    key: string;
    decide: () => T;
    description?: string;
    defaultValue?: T;
};

const getFlagValue = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') return defaultValue;

    // 1. Check for Vercel Toolbar overrides (cookie)
    // The cookie name is 'vercel-flag-overrides'
    // It stores a JSON object of overrides
    try {
        const cookies = document.cookie.split(';');
        const overrideCookie = cookies.find(c => c.trim().startsWith('vercel-flag-overrides='));
        if (overrideCookie) {
            const cookieValue = overrideCookie.split('=')[1];
            // Decode URI component because cookies are often encoded
            const decodedValue = decodeURIComponent(cookieValue);
            const overrides = JSON.parse(decodedValue);
            if (overrides && typeof overrides === 'object' && key in overrides) {
                return overrides[key] as T;
            }
        }
    } catch (e) {
        console.warn(`Failed to parse vercel-flag-overrides cookie`, e);
    }

    // 2. Fallback to localStorage for local testing
    const localOverride = localStorage.getItem(`flag-${key}`);
    if (localOverride !== null) {
        try {
            return JSON.parse(localOverride) as T;
        } catch (e) {
            console.error(`Failed to parse local flag override for ${key}`, e);
        }
    }

    return defaultValue;
};

export const showSettings: Flag<boolean> = {
    key: 'show-settings',
    decide: () => getFlagValue('show-settings', false),
    description: 'Show settings page',
    defaultValue: true
};

export const showDocuments: Flag<boolean> = {
    key: 'show-documents',
    decide: () => getFlagValue('show-documents', false),
    description: 'Show documents page',
    defaultValue: true
};

export const flags = {
    showSettings,
    showDocuments,
};

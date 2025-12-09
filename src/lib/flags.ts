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

    // Check for Vercel Toolbar overrides or local manual overrides
    // using localStorage for simplicity in this stub implementation
    const override = localStorage.getItem(`flag-${key}`);
    if (override !== null) {
        try {
            return JSON.parse(override) as T;
        } catch (e) {
            console.error(`Failed to parse flag override for ${key}`, e);
        }
    }
    return defaultValue;
};

export const showSettings: Flag<boolean> = {
    key: 'show-settings',
    decide: () => getFlagValue('show-settings', true),
    description: 'Show settings page',
    defaultValue: true
};

export const showDocuments: Flag<boolean> = {
    key: 'show-documents',
    decide: () => getFlagValue('show-documents', true),
    description: 'Show documents page',
    defaultValue: true
};

export const flags = {
    showSettings,
    showDocuments,
};

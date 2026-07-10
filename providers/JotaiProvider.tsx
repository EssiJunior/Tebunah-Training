
'use client';

import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { WritableAtom } from 'jotai';

// Component pour hydrater les atoms avec des valeurs initiales
function HydrateAtoms({ initialValues, children }: {initialValues: [WritableAtom<unknown, unknown[], unknown>, unknown][], children: React.ReactNode}) {
    useHydrateAtoms(initialValues);
    return children;
}

export function JotaiProvider({ children, initialValues = [] }:{children: React.ReactNode, initialValues?: [WritableAtom<unknown, unknown[], unknown>, unknown][]}) {
    return (
        <Provider>
            <HydrateAtoms initialValues={initialValues}>
                {children}
            </HydrateAtoms>
        </Provider>
    );
}

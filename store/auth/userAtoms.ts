
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom pour les données utilisateur (persisté)
export const authUserAtom = atomWithStorage<AuthUser>('authUser', {
    user: {
        name: "",
        email: "",
        phone: "",
        role: ""
    },
    token: ""
});

// Atom dérivé (computed) - non persisté
export const authUserDisplayNameAtom = atom((get) => {
    const authUser = get(authUserAtom);
    return authUser;
});

export const authUserActionsAtom = atom(
    null, // Pas de valeur initiale pour write-only atom
    (get, set, action: AuthUserAction) => {
        switch (action.type) {
            case 'STORE':
                set(authUserAtom, action.payload);
                break;

            case 'REMOVE':
                set(authUserAtom, {
                    user: {
                        name: "",
                        email: "",
                        phone: "",
                        role: ""
                    },
                    token: ""
                });
                break;

            default:
                break;
        }
    }
);
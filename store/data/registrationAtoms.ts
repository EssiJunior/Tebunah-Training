
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom pour les données utilisateur (persisté)
export const registrationsAtom = atomWithStorage<Registration[]>('registrations', []);

// Atom dérivé (computed) - non persisté
export const registrationsDisplayNameAtom = atom((get) => {
    const registrations = get(registrationsAtom);
    return registrations;
});

export const registrationsActionsAtom = atom(
    null, // Pas de valeur initiale pour write-only atom
    (get, set, action: RegistrationsAction) => {
        switch (action.type) {
            case 'STORE':
                set(registrationsAtom, action.payload);
                break;

            case 'REMOVE':
                set(registrationsAtom, []);
                break;

            default:
                break;
        }
    }
);
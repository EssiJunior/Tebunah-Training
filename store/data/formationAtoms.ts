
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom pour les données utilisateur (persisté)
export const formationsAtom = atomWithStorage<Formation[]>('formations', []);

// Atom dérivé (computed) - non persisté
export const formationsDisplayNameAtom = atom((get) => {
    const formations = get(formationsAtom);
    return formations;
});

export const formationsActionsAtom = atom(
    null, // Pas de valeur initiale pour write-only atom
    (get, set, action: FormationsAction) => {
        switch (action.type) {
            case 'STORE':
                set(formationsAtom, action.payload);
                break;

            case 'REMOVE':
                set(formationsAtom, []);
                break;

            default:
                break;
        }
    }
);
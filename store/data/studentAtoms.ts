
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Atom pour les données utilisateur (persisté)
export const studentsAtom = atomWithStorage<Student[]>('students', []);

// Atom dérivé (computed) - non persisté
export const studentsDisplayNameAtom = atom((get) => {
    const students = get(studentsAtom);
    return students;
});

export const studentsActionsAtom = atom(
    null, // Pas de valeur initiale pour write-only atom
    (get, set, action: StudentsAction) => {
        switch (action.type) {
            case 'STORE':
                set(studentsAtom, action.payload);
                break;

            case 'REMOVE':
                set(studentsAtom, []);
                break;

            default:
                break;
        }
    }
);
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// ⚠️ IMPORTANT: Pour Next.js, on doit vérifier si on est côté client
const isClient = typeof window !== 'undefined';

// Helper pour créer des atoms avec storage sécurisé pour Next.js
interface CreateStorageAtom {
    <T>(key: string, initialValue: unknown): ReturnType<typeof atom> | ReturnType<typeof atomWithStorage>;
}

export const createStorageAtom: CreateStorageAtom = (key, initialValue) => {
    if (!isClient) {
        // Sur le serveur, retourner un atom normal
        return atom(initialValue);
    }
    // Sur le client, utiliser atomWithStorage
    return atomWithStorage(key, initialValue);
};
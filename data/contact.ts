export interface ContactInfo {
    platform: string
    href: string
    label: string
}

export const CONTACTS: ContactInfo[] = [
    {
        platform: 'Contact',
        href: 'tel:237690743737',
        label: 'Contact',
    },
    {
        platform: 'WhatsApp',
        href: 'https://wa.me/237690743737',
        label: 'WhatsApp',
    },
    {
        platform: 'Email',
        href: 'mailto:dev@essijunior.com',
        label: 'dev@essijunior.com',
    },
]

export const LOCATION = 'Yaoundé, CM'
export const RESPONSE_TIME = 'Réponse sous 24h'

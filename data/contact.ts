export interface ContactInfo {
  platform: string
  href: string
  label: string
}

export const CONTACTS: ContactInfo[] = [
  {
    platform: 'WhatsApp',
    href: 'https://wa.me/237XXXXXXXXX',
    label: 'WhatsApp',
  },
  {
    platform: 'Email',
    href: 'mailto:contact@essidev.cm',
    label: 'contact@essidev.cm',
  },
]

export const LOCATION = 'Yaoundé, CM'
export const RESPONSE_TIME = 'Réponse sous 24h'

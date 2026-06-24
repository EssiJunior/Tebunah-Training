import { formations } from '@/data/formations'
import FormationDetail from '@/components/molecules/FormationDetail'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return formations.map((f) => ({ slug: f.id }))
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const formation = formations.find((f) => f.id === slug)
    if (!formation) return {}
    return {
        title: `${formation.metaTitle} — Formations IT`,
        description: formation.metaDescription,
    }
}

export default async function FormationPage({ params }: Props) {
    const { slug } = await params
    const formation = formations.find((f) => f.id === slug)
    return <FormationDetail formation={formation!} />
}

export const dynamic = 'force-static'
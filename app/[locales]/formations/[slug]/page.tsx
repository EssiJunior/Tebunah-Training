import { notFound } from 'next/navigation'
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
        title: `${formation.title} — Formations IT`,
        description: formation.description,
    }
}

export default async function FormationPage({ params }: Props) {
    const { slug } = await params
    const formation = formations.find((f) => f.id === slug)
    console.log('Formation page: ', slug)
    if (!formation) notFound()
    return <FormationDetail formation={formation} />
}
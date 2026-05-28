
const SectionMarker = ({ title, id, className }: { title?: string, id?: string, className?: string }) => {
    return (
        <div className={`flex items-center gap-4 mb-10 ${className}`}>
            <div className="w-10 h-px bg-accent" />
            <span className="font-mono text-accent tracking-widest">{title}</span>
            <div className="flex-1 h-px bg-line" />
            <span className="font-mono text-[10px] text-white/15">{id}</span>
        </div>
    )
}

export default SectionMarker

const Field = ({
    label,
    input,
    error,
}: {
    label: string
    input: React.ReactNode
    error?: string
}) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="font-domine text-[11px] text-white/30 uppercase tracking-widest">
                {label}
            </label>
            <div className={[
                'font-domine text-[13px]',
                '[&_input]:w-full [&_input]:bg-surface2 [&_input]:border [&_input]:rounded [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-white/70 [&_input]:outline-none [&_input]:placeholder:text-white/15',
                '[&_select]:w-full [&_select]:bg-surface2 [&_select]:border [&_select]:rounded [&_select]:px-3 [&_select]:py-2.5 [&_select]:text-white/70 [&_select]:outline-none',
                '[&_textarea]:w-full [&_textarea]:bg-surface2 [&_textarea]:border [&_textarea]:rounded [&_textarea]:px-3 [&_textarea]:py-2.5 [&_textarea]:text-white/70 [&_textarea]:outline-none [&_textarea]:placeholder:text-white/15',
                error
                    ? '[&_input]:border-red-500/40 [&_select]:border-red-500/40 [&_textarea]:border-red-500/40'
                    : '[&_input]:border-white/8 [&_select]:border-white/8 [&_textarea]:border-white/8',
            ].join(' ')}>
                {input}
            </div>
            {error && (
                <span className="font-domine text-[10px] text-red-400">{error}</span>
            )}
        </div>
    )
}

export default Field
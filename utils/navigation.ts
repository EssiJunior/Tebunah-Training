const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export { go }
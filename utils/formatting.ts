function getInitials(name: string) {
    return name.split(" ").map((name) => name[0]).join("").toUpperCase().slice(0, 2);
}

function formatPrice(amount: number | string) {
    const n = Number(amount) || 0
    const formatted = n.toLocaleString('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0, maximumFractionDigits: 0 })
    return formatted
}

export { getInitials, formatPrice }
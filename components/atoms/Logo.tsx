import React from "react"

const Logo: React.FC<LogoProps> = ({ id, className, handleClick }) => {
    return (
        <a href={id} className={`flex items-center justify-center px-1.5 relative z-10 ${className}`} onClick={handleClick}>
            <span className={`font-mono! font-thin! mb-1`}>Tebunah<span className="font-black text-xl text-accent">Training</span></span>
        </a>
    )
}

export default Logo
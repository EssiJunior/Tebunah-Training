'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import Field from '@/components/atoms/Field'
import Logo from '@/components/atoms/Logo'
import { AlertCircle } from 'lucide-react'
import { motion } from 'motion/react'
import Button from '@/components/atoms/Button'

export default function AdminLoginPage() {
  const { login, message, setMessage } = useAdmin()
  const router = useRouter()
  const pathname = usePathname()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      if (!email) {
        setError('email')
        setMessage('email is required')
        return
      }
      if (!password) {
        setError('password')
        setMessage('password is required')
        return
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email')
      setMessage('Format email invalide')
      return
    }

    setIsSubmitting(true)
    setMessage('')
    setError('')
    setTimeout(async () => {
      const success = await login(email, password)
      setIsSubmitting(false)

      if (success) {
        const segments = pathname?.split('/') || []
        const locale = segments[1] || 'fr'
        router.push(`/${locale}/admin`)
      } else {
        setError('An error occurred during login. Please try again later.')
      }
    }, 500)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 relative overflow-hidden font-mono selection:bg-accent selection:text-bg">
      {/* Decorative background glow circles */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-ice/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 translate-x-1/2 translate-y-1/2 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-[420px] border border-white/6 bg-surface/50 backdrop-blur-xl p-8 rounded-px md:shadow-2xl md:shadow-black/45 relative z-10">

        {/* Branding & Logo */}
        <div className="text-center mb-8">
          <Logo className="inline-flex scale-110 mb-4" />
          <h6 className="text-[11px] text-white/30 tracking-widest uppercase">
            Portail Administration
          </h6>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field
            label="Adresse Email"
            input={
              <input
                type="text"
                inputMode='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: admin@tebunah.com"
                className="w-full"
                disabled={isSubmitting}
              />
            }
            error={error === 'email' ? message : ''}
          />

          <Field
            label="Mot de Passe"
            input={
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
                disabled={isSubmitting}
              />
            }
            error={error === 'password' ? message : ''}
          />

          <div className="w-full mt-8">
            {error == '' && message && <motion.p
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center  gap-2 text-red-400 bg-red-400/10 px-2 py-1 mb-4 rounded-lg text-[13px] overflow-hidden text-ellipsis whitespace-nowrap">
              <AlertCircle size={16} />
              {message}
            </motion.p>}
            <Button
              type="submit"
              isLoading={isSubmitting}
              className={`w-full py-3.5 text-[14px] tracking-widest uppercase transition-all duration-200 mt-6 `}
            >
              Se Connecter
            </Button>
          </div>
        </form>
      </div>

      {/* Footer disclaimer */}
      <p className="mt-8 text-[10px] text-white/20 tracking-wider">
        © 2026 Tebunah Training. Tous droits réservés.
      </p>
    </div>
  )
}

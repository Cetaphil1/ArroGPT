'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AuthCard from '@/components/AuthCard'

export default function Login2Page() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    try {
      setError('')
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        router.push('/profile')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <AuthCard
      title="Sign In"
      submitText="Sign In"
      onSubmit={handleLogin}
      switchText="Don't have an account?"
      switchLink="/signin2"
      switchLinkText="Sign up"
      error={error}
    />
  )
}

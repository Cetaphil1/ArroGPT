'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import AuthCard from '@/components/AuthCard'

export default function Signin2Page() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSignUp = async (email: string, password: string) => {
    try {
      setError('')
      setSuccess('')
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.email_confirmed_at) {
          // No confirmation required, redirect to profile
          router.push('/profile')
        } else {
          // Confirmation required, show message
          setSuccess('Please check your email for a confirmation link.')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <AuthCard
      title="Sign Up"
      submitText="Create Account"
      onSubmit={handleSignUp}
      switchText="Already have an account?"
      switchLink="/login2"
      switchLinkText="Sign in"
      error={error}
      success={success}
    />
  )
}

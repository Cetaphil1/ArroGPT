'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Heading, Text, Button, VStack, Spinner } from '@chakra-ui/react'
import { supabase } from '@/lib/supabaseClient'
import type { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
        } else {
          router.push('/login2')
        }
      } catch (error) {
        console.error('Error checking session:', error)
        router.push('/login2')
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/login2')
        } else if (session?.user) {
          setUser(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/login2')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Loading...</Text>
        </VStack>
      </Box>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50" py={12} px={4}>
      <Box
        className="max-w-md w-full space-y-8"
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
      >
        <VStack spacing={6}>
          <Heading size="lg" textAlign="center">
            Profile
          </Heading>
          
          <VStack spacing={4} w="full">
            <Box w="full">
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Email
              </Text>
              <Text fontSize="md" p={3} bg="gray.50" rounded="md">
                {user.email}
              </Text>
            </Box>

            <Box w="full">
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                User ID
              </Text>
              <Text fontSize="sm" p={3} bg="gray.50" rounded="md" fontFamily="mono">
                {user.id}
              </Text>
            </Box>

            <Button
              colorScheme="red"
              size="lg"
              w="full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  )
}
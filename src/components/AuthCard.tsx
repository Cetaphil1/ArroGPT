'use client'

import { useState } from 'react'
import { Box, Input, Button, Text, VStack, HStack, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

interface AuthCardProps {
  title: string
  submitText: string
  onSubmit: (email: string, password: string) => Promise<void>
  switchText: string
  switchLink: string
  switchLinkText: string
  error?: string
  success?: string
}

export default function AuthCard({
  title,
  submitText,
  onSubmit,
  switchText,
  switchLink,
  switchLinkText,
  error,
  success
}: AuthCardProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    try {
      await onSubmit(email, password)
    } catch (err) {
      // Error handling is done in parent component
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gray-50"
      py={12}
      px={4}
    >
      <Box
        className="max-w-md w-full space-y-8"
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
      >
        <VStack spacing={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            {title}
          </Text>
          
          <Box as="form" onSubmit={handleSubmit} w="full">
            <VStack spacing={4}>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Email
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  size="lg"
                />
              </Box>
              
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Password
                </Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  size="lg"
                />
              </Box>

              {error && (
                <Text color="red.500" fontSize="sm" textAlign="center">
                  {error}
                </Text>
              )}

              {success && (
                <Text color="green.500" fontSize="sm" textAlign="center">
                  {success}
                </Text>
              )}

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                w="full"
                isLoading={isLoading}
                loadingText="Processing..."
              >
                {submitText}
              </Button>
            </VStack>
          </Box>

          <HStack spacing={1}>
            <Text fontSize="sm" color="gray.600">
              {switchText}
            </Text>
            <Link as={NextLink} href={switchLink} color="blue.500" fontSize="sm">
              {switchLinkText}
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

'use client';

import { Box, Container, VStack, Text, Flex, Icon, Card, CardBody, CardHeader, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { MdArrowBack, MdPerson } from 'react-icons/md';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup data:', formData);
  };

  return (
    <Box minH="100vh" bg="gray.900" display="flex" alignItems="center" justifyContent="center" p="4">
      <Container maxW="md">
        <VStack spacing={8} align="stretch">
          {/* Back Button */}
          <Flex align="center" gap={2}>
            <Icon as={MdArrowBack} boxSize={5} cursor="pointer" color="gray.400" _hover={{ color: 'white' }} onClick={() => window.history.back()} />
            <Text fontSize="sm" color="gray.400">
              Back to Chat
            </Text>
          </Flex>

          {/* Signup Card */}
          <Card bg="gray.800" borderColor="whiteAlpha.200" border="1px">
            <CardHeader textAlign="center">
              <Icon as={MdPerson} boxSize={12} color="purple.400" mb={4} />
              <Heading size="lg" color="white" mb={2}>
                Create Account
              </Heading>
              <Text color="gray.400" fontSize="sm">
                Join Arro Chat to get started
              </Text>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color="gray.200">Full Name</FormLabel>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      bg="gray.700"
                      borderColor="gray.600"
                      color="white"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{ borderColor: 'purple.400', boxShadow: 'none' }}
                      placeholder="Enter your full name"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.200">Email</FormLabel>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      bg="gray.700"
                      borderColor="gray.600"
                      color="white"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{ borderColor: 'purple.400', boxShadow: 'none' }}
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="gray.200">Password</FormLabel>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      bg="gray.700"
                      borderColor="gray.600"
                      color="white"
                      _placeholder={{ color: 'gray.400' }}
                      _focus={{ borderColor: 'purple.400', boxShadow: 'none' }}
                      placeholder="Create a password"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    bg="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
                    color="white"
                    size="lg"
                    w="full"
                    mt={4}
                    _hover={{ opacity: 0.9 }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    Create Account
                  </Button>

                  <Text color="gray.400" fontSize="sm" textAlign="center">
                    Already have an account?{' '}
                    <Text as="span" color="purple.400" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                      Sign in
                    </Text>
                  </Text>
                </VStack>
              </form>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
}

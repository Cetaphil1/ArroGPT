'use client';
import { Box, VStack, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Sidebar() {
  return (
    <Box as="aside" w="260px" minH="100dvh" borderRight="1px solid"
      borderColor="whiteAlpha.300" bg="#000" p={4} position="sticky" top={0}>
      <VStack align="stretch" spacing={2}>
        <Button as={NextLink} href="/" variant="ghost" justifyContent="flex-start">Chat</Button>
        <Button as={NextLink} href="/profile" variant="ghost" justifyContent="flex-start">Profile</Button>
        <Button as="a" href="https://nflvp.com/about_us" target="_blank" rel="noopener noreferrer"
          variant="ghost" justifyContent="flex-start">Settings</Button>
      </VStack>
    </Box>
  );
}
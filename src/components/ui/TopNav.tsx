'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Flex, Text, Button, Icon, useDisclosure } from '@chakra-ui/react';
import { MdSettings, MdPerson, MdLogin } from 'react-icons/md';
import SettingsModal from '../settings/SettingsModal';

export default function TopNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg="gray.900"
      shadow="lg"
      borderBottom="1px"
      borderColor="gray.700"
      px={6}
      py={4}
    >
      <Flex
        maxW="5xl"
        mx="auto"
        justify="space-between"
        align="center"
      >
        {/* Left: Brand */}
        <Text
          as={Link}
          href="/"
          fontSize="xl"
          fontWeight="bold"
          color="purple.400"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          textDecoration="none"
        >
          D3VD
        </Text>

        {/* Right: Navigation */}
        <Flex gap={4} align="center">
          <Button
            as={Link}
            href="/profile"
            variant="ghost"
            leftIcon={<Icon as={MdPerson} />}
            size="sm"
            color="white"
            _hover={{ bg: 'gray.800' }}
          >
            Profile
          </Button>
          
          <Button
            as={Link}
            href="/signup"
            variant="ghost"
            leftIcon={<Icon as={MdLogin} />}
            size="sm"
            color="white"
            _hover={{ bg: 'gray.800' }}
          >
            Signup
          </Button>

          <Button
            variant="ghost"
            leftIcon={<Icon as={MdSettings} />}
            size="sm"
            color="white"
            _hover={{ bg: 'gray.800' }}
            onClick={onOpen}
          >
            Settings
          </Button>
        </Flex>
      </Flex>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

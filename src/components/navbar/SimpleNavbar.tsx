'use client';
import React from 'react';
import {
  Box,
  Flex,
  Text,
  HStack,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import { SidebarResponsive } from '@/components/sidebar/Sidebar';
import { MdSettings, MdPerson, MdLogout } from 'react-icons/md';
import NextLink from 'next/link';

interface SimpleNavbarProps {
  setApiKey?: any;
  onOpen?: any;
  logoText?: string;
  brandText?: string;
  secondary?: boolean;
}

export default function SimpleNavbar(props: SimpleNavbarProps) {
  const { setApiKey, onOpen, logoText = 'Arro Chat', brandText = 'Chat' } = props;

  return (
    <Box
      position="fixed"
      top="0"
      right="0"
      left={{ base: '0', xl: '290px' }}
      zIndex="1000"
      bg="rgba(17, 25, 40, 0.95)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      px="6"
      py="4"
    >
      <Flex justify="space-between" align="center" w="100%">
        {/* Left: Mobile menu + Brand */}
        <Flex align="center" gap="4">
          <SidebarResponsive />
          <Text color="gray.100" fontSize="lg" fontWeight="600">
            {brandText}
          </Text>
        </Flex>

        {/* Right: Model pills + Profile menu */}
        <Flex align="center" gap="4">
          {/* Model Pills */}
          <HStack spacing="2" display={{ base: 'none', md: 'flex' }}>
            <Badge colorScheme="purple" variant="solid" px="3" py="1" borderRadius="full">
              Arro GPT
            </Badge>
            <Badge colorScheme="purple" variant="outline" px="3" py="1" borderRadius="full">
              Arro GPT (Thinking)
            </Badge>
          </HStack>

          {/* Profile Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="unstyled"
              p="0"
              minW="auto"
              h="auto"
              _focus={{ boxShadow: 'none' }}
            >
              <Avatar
                size="sm"
                bg="purple.500"
                color="white"
                name="User"
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
              />
            </MenuButton>
            <MenuList
              bg="gray.800"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="xl"
              p="2"
              minW="200px"
            >
              <MenuItem
                as={NextLink}
                href="/profile"
                bg="transparent"
                color="gray.100"
                _hover={{ bg: 'whiteAlpha.100' }}
                borderRadius="lg"
                icon={<Icon as={MdPerson} boxSize="4" />}
              >
                Profile Settings
              </MenuItem>
              <MenuItem
                as={NextLink}
                href="/settings"
                bg="transparent"
                color="gray.100"
                _hover={{ bg: 'whiteAlpha.100' }}
                borderRadius="lg"
                icon={<Icon as={MdSettings} boxSize="4" />}
              >
                Settings
              </MenuItem>
              <MenuItem
                bg="transparent"
                color="red.400"
                _hover={{ bg: 'whiteAlpha.100' }}
                borderRadius="lg"
                icon={<Icon as={MdLogout} boxSize="4" />}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}

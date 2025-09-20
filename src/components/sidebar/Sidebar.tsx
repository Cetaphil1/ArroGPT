'use client';
import React, { PropsWithChildren } from 'react';
import {
  Box,
  VStack,
  Button,
  Icon,
  Text,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { MdAutoAwesome, MdSettings, MdPerson, MdLogin } from 'react-icons/md';
import { IoMenuOutline } from 'react-icons/io5';
import { isWindowAvailable } from '@/utils/navigation';

export interface SidebarProps extends PropsWithChildren {
  routes?: any[];
  setApiKey?: any;
}

const links = [
  { label: "D3VD", href: "/", icon: MdAutoAwesome },
  { label: "Profile", href: "https://nflvp.com/login", icon: MdPerson, external: true },
  { label: "Settings", href: "/settings", icon: MdSettings },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <Box
      bg="gray.800"
      w="285px"
      h="100vh"
      position="fixed"
      left="0"
      top="0"
      borderRight="1px solid"
      borderColor="whiteAlpha.200"
      display={{ base: 'none', xl: 'block' }}
    >
      <Flex direction="column" h="100%" p="6">
        {/* Brand */}
        <Box mb="8">
          <Text fontSize="xl" fontWeight="bold" color="gray.100">
            Arro Chat
          </Text>
        </Box>

        {/* Navigation Links */}
        <VStack spacing="2" align="stretch" flex="1">
          {links.map((link, index) => {
            const isActive = !link.external && pathname === link.href;
            return (
              <Button
                key={index}
                as={link.external ? "a" : NextLink}
                href={link.href}
                variant="ghost"
                justifyContent="flex-start"
                h="12"
                fontWeight="500"
                color={isActive ? "white" : "text"}
                bg={isActive ? "text" : "transparent"}
                _hover={{
                  bg: isActive ? "brand.800" : "brand.50",
                  color: isActive ? "white" : "text",
                }}
                leftIcon={<Icon as={link.icon} boxSize="5" />}
              >
                {link.label}
              </Button>
            );
          })}
        </VStack>

        {/* Auth Buttons */}
        <VStack spacing="3" mt="auto" pt="4">
          <Button
            as="a"
            href="https://nflvp.com/login"
            target="_self"
            bg="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
            color="white"
            size="sm"
            w="full"
            _hover={{ opacity: 0.9 }}
          >
            Sign In
          </Button>
          <Button
            as="a"
            href="https://nflvp.com/signin"
            target="_self"
            variant="outline"
            borderColor="purple.400"
            color="purple.400"
            size="sm"
            w="full"
            _hover={{ bg: "purple.400", color: "white" }}
          >
            Sign Up
          </Button>
          <Text fontSize="xs" color="gray.500" textAlign="center" mt="2">
            Powered by Arro AI
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

function Sidebar(props: SidebarProps) {
  return <SidebarContent />;
}

// FUNCTIONS
export function SidebarResponsive() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} alignItems="center">
      <Flex w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color="white"
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: 'pointer' }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent
          bg="gray.800"
          borderRight="1px solid"
          borderColor="whiteAlpha.200"
        >
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            color="white"
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody p="6" pt="16">
            <VStack spacing="2" align="stretch" h="full">
              {links.map((link, index) => {
                const isActive = !link.external && pathname === link.href;
                return (
                  <Button
                    key={index}
                    as={link.external ? "a" : NextLink}
                    href={link.href}
                    variant="ghost"
                    justifyContent="flex-start"
                    h="12"
                    fontWeight="500"
                    color={isActive ? "white" : "text"}
                    bg={isActive ? "text" : "transparent"}
                    _hover={{
                      bg: isActive ? "brand.800" : "brand.50",
                      color: isActive ? "white" : "text",
                    }}
                    leftIcon={<Icon as={link.icon} boxSize="5" />}
                    onClick={onClose}
                  >
                    {link.label}
                  </Button>
                );
              })}
              
              {/* Auth Buttons */}
              <VStack spacing="3" mt="auto" pt="4">
                <Button
                  as="a"
                  href="https://nflvp.com/login"
                  target="_self"
                  bg="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
                  color="white"
                  size="sm"
                  w="full"
                  _hover={{ opacity: 0.9 }}
                  onClick={onClose}
                >
                  Sign In
                </Button>
                <Button
                  as="a"
                  href="https://nflvp.com/signin"
                  target="_self"
                  variant="outline"
                  borderColor="purple.400"
                  color="purple.400"
                  size="sm"
                  w="full"
                  _hover={{ bg: "purple.400", color: "white" }}
                  onClick={onClose}
                >
                  Sign Up
                </Button>
              </VStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Sidebar;

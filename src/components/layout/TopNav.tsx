'use client';
import { Flex, HStack, Text, Link } from '@chakra-ui/react';
import ModelSelect from '@/components/chat/ModelSelect';
import { useLayout } from '@/contexts/LayoutContext';

export default function TopNav() {
  const { isInputFocused } = useLayout();

  return (
    <Flex 
      as="header" 
      h={isInputFocused ? "0" : "56px"}
      align="center" 
      px={4}
      borderBottom="1px solid" 
      borderColor="whiteAlpha.300" 
      bg="#000" 
      position="sticky" 
      top={0} 
      zIndex={10}
      overflow="hidden"
      transition="height 0.3s ease"
      opacity={isInputFocused ? 0 : 1}
    >
      <HStack spacing={3}>
        <ModelSelect />
      </HStack>
      <Link 
        href="https://nflvp.com" 
        isExternal 
        ml="auto" 
        _hover={{ textDecoration: 'none', opacity: 0.8 }}
      >
        <Text fontWeight="extrabold">D3VD</Text>
      </Link>
    </Flex>
  );
}
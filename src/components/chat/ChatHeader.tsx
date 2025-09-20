'use client';

import { Flex, Heading, Spacer, Menu, MenuButton, MenuList, MenuItem, Button, Badge } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

type Props = {
  hasFirstUserMessage: boolean;
  model: string;
  setModel: (m: string) => void;
};

export default function ChatHeader({ hasFirstUserMessage, model, setModel }: Props) {
  return (
    <Flex as="header" h="56px" align="center" px="4" borderBottom="1px solid" borderColor="gray.700" bg="gray.900">
      <Heading size="md" color="white">D3VD</Heading>
      <Spacer />
      {hasFirstUserMessage ? (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" color="white" borderColor="gray.600" _hover={{ bg: 'gray.800' }}>
            {model}
          </MenuButton>
          <MenuList bg="gray.800" borderColor="gray.700">
            {['Arro', 'Arro Thinking'].map(m => (
              <MenuItem key={m} bg="gray.800" _hover={{ bg: 'gray.700' }} color="white" onClick={() => setModel(m)}>
                {m}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Badge colorScheme="purple" variant="subtle">Arro</Badge>
      )}
    </Flex>
  );
}

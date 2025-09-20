'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  useToast,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useArroKey } from '@/hooks/useArroKey';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const { get, set, clear } = useArroKey();
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      setApiKey(get());
    }
  }, [isOpen, get]);

  const handleSave = () => {
    set(apiKey);
    toast({
      title: 'API Key Saved',
      description: 'Your Arro GPT API key has been saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleClear = () => {
    clear();
    setApiKey('');
    toast({
      title: 'API Key Cleared',
      description: 'Your Arro GPT API key has been cleared.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader color="white">Settings</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" color="gray.400" mb={4}>
                Configure your Arro GPT API key. This will be used when you select Arro GPT models.
              </Text>
            </Box>
            
            <FormControl>
              <FormLabel color="white">Arro GPT API Key</FormLabel>
              <Input
                type="password"
                placeholder="Enter your Arro GPT API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                bg="gray.700"
                borderColor="gray.600"
                color="white"
                _placeholder={{ color: 'gray.400' }}
              />
            </FormControl>

            <Flex gap={3} justify="flex-end">
              <Button 
                variant="outline" 
                onClick={handleClear}
                borderColor="gray.600"
                color="white"
                _hover={{ bg: 'gray.700' }}
              >
                Clear
              </Button>
              <Button 
                colorScheme="purple" 
                onClick={handleSave}
                bg="purple.600"
                _hover={{ bg: 'purple.700' }}
              >
                Save
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

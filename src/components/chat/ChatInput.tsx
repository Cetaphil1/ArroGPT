'use client';

import { useState, useRef, useEffect } from 'react';
import { Flex, Textarea, Button } from '@chakra-ui/react';

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('');
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        onSend(text.trim());
        setText('');
      }
    }
  };

  return (
    <Flex gap="2" p="4" borderTop="1px solid" borderColor="gray.700" bg="gray.900">
      <Textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        bg="gray.800"
        color="white"
        borderColor="gray.700"
        _placeholder={{ color: 'gray.400' }}
        resize="none"
        minH="48px"
        maxH="160px"
      />
      <Button
        onClick={() => { if (text.trim()) { onSend(text.trim()); setText(''); } }}
        colorScheme="purple"
        isDisabled={disabled || text.trim().length === 0}
      >
        Send
      </Button>
    </Flex>
  );
}

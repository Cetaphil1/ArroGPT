'use client';
import { useState, useEffect, useRef } from 'react';
import { Box, VStack, Input, Button, HStack, Text } from '@chakra-ui/react';
type Msg = { role: 'user' | 'assistant'; content: string };

export default function Page() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  async function send() {
    const content = input.trim();
    if (!content) return;
    const next = [...messages, { role: 'user', content }];
    setMessages(next); setInput('');
    const model = (window as any).__D3VD_MODEL__ || localStorage.getItem('d3vd:model') || 'arlow';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages: next }),
      });
      if (!res.ok) { setMessages(m => [...m, { role:'assistant', content:'Setup issue (401/500). Check server key or model.' }]); return; }
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content ?? data?.content ?? '';
      setMessages(m => [...m, { role:'assistant', content: reply }]);
    } catch { setMessages(m => [...m, { role:'assistant', content:'Network error.' }]); }
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) { if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); } }

  return (
    <VStack align="stretch" spacing={4}>
      <Box>
        {messages.map((m, i) => (
          <Box key={i} p={3} bg={m.role==='user'?'whiteAlpha.200':'whiteAlpha.100'} borderRadius="md" mb={2}>
            <Text opacity={0.8} fontSize="sm" mb={1}>{m.role.toUpperCase()}</Text>
            <Text whiteSpace="pre-wrap">{m.content}</Text>
          </Box>
        ))}
      </Box>
      <HStack>
        <Input ref={inputRef} placeholder="Type your message here..." value={input}
          onChange={(e)=>setInput(e.target.value)} onKeyDown={onKeyDown}
          bg="black" borderColor="whiteAlpha.400" />
        <Button onClick={send}>Send</Button>
      </HStack>
    </VStack>
  );
}
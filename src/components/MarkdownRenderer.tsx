'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSanitize from 'rehype-sanitize';
import rehypeKatex from 'rehype-katex';
import { Heading, Text, Code as ChakraCode, Link as ChakraLink, ListItem, UnorderedList, OrderedList, Divider, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Props = { children: string };

export default function MarkdownRenderer({ children }: Props) {
  return (
    <Box w="100%" overflowX="auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[
          rehypeKatex,
          // Keep sanitize last; default schema already strips unsafe tags.
          rehypeSanitize
        ]}
        components={{
          h1: ({node, ...props}) => <Heading as="h1" size="xl" mt={4} mb={2} color="white" {...props} />,
          h2: ({node, ...props}) => <Heading as="h2" size="lg" mt={4} mb={2} color="white" {...props} />,
          h3: ({node, ...props}) => <Heading as="h3" size="md" mt={3} mb={2} color="white" {...props} />,
          h4: ({node, ...props}) => <Heading as="h4" size="sm" mt={3} mb={2} color="white" {...props} />,
          h5: ({node, ...props}) => <Heading as="h5" size="xs" mt={2} mb={1} color="white" {...props} />,
          h6: ({node, ...props}) => <Heading as="h6" size="xs" mt={2} mb={1} color="white" {...props} />,
          p:  ({node, ...props}) => <Text mb={3} color="white" lineHeight="1.6" {...props} />,
          a:  ({node, href, ...props}) => <ChakraLink href={href} isExternal color="blue.300" _hover={{ color: "blue.200" }} {...props} />,
          ul: ({node, ...props}) => <UnorderedList pl={6} mb={3} color="white" {...props} />,
          ol: ({node, ...props}) => <OrderedList pl={6} mb={3} color="white" {...props} />,
          li: ({node, ...props}) => <ListItem mb={1} color="white" {...props} />,
          hr: ({node, ...props}) => <Divider my={4} borderColor="whiteAlpha.300" {...props} />,
          blockquote: ({node, ...props}) => (
            <Box 
              as="blockquote" 
              borderLeft="4px solid" 
              borderColor="gray.500" 
              pl={4} 
              py={2} 
              my={3} 
              bg="whiteAlpha.50"
              fontStyle="italic"
              color="gray.300"
              {...props} 
            />
          ),
          table: ({node, ...props}) => (
            <Box overflowX="auto" my={4}>
              <Table variant="simple" size="sm" colorScheme="gray" {...props} />
            </Box>
          ),
          thead: ({node, ...props}) => <Thead {...props} />,
          tbody: ({node, ...props}) => <Tbody {...props} />,
          tr: ({node, ...props}) => <Tr {...props} />,
          th: ({node, ...props}) => <Th color="white" borderColor="whiteAlpha.300" {...props} />,
          td: ({node, ...props}) => <Td color="white" borderColor="whiteAlpha.300" {...props} />,
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '');
            if (inline) {
              return (
                <ChakraCode 
                  fontSize="0.9em" 
                  px="1.5" 
                  py="0.5" 
                  rounded="md" 
                  bg="gray.700" 
                  color="green.300"
                  {...props}
                >
                  {children}
                </ChakraCode>
              );
            }
            return (
              <Box my={3} borderWidth="1px" borderColor="gray.600" rounded="lg" overflow="hidden">
                <SyntaxHighlighter 
                  language={match?.[1] || 'text'} 
                  style={oneDark}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: '16px',
                    background: '#1a1a1a',
                    fontSize: '14px'
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </Box>
            );
          }
        }}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
}


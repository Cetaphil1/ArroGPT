'use client';

import * as React from 'react';
import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles = {
  global: {
    'html, body, #__next': { height: '100%' },
    body: { bg: 'gray.900', color: 'white' },
  },
};

const theme = extendTheme({ config, styles });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
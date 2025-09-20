'use client';
import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  styles: { global: { body: { bg: '#000', color: '#fff' } } }
});
export default theme;
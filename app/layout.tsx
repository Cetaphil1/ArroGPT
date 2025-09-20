import type { Metadata } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';

export const metadata: Metadata = { title: 'D3VD', description: 'D3VD chat' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ChakraProvider>
      </body>
    </html>
  );
}
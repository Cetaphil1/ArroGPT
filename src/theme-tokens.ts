// Theme tokens with no Chakra imports - pure JavaScript objects

// Type definition for Card component (exported for compatibility)
export interface CustomCardProps {
  size?: string;
  variant?: string;
  [key: string]: any;
}
export const tokens = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    bg: "#ffffff",
    text: "#000000",
    border: "#000000",
    brand: {
      50: "#ffffff",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#000000",
    },
  },
  styles: {
    global: {
      'html, body': { height: '100%' },
      body: {
        bg: "bg",
        color: "text",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: {
          bg: 'text',
          color: 'bg',
          _hover: {
            bg: 'brand.800',
          },
        },
        outline: {
          borderColor: 'text',
          color: 'text',
          _hover: {
            bg: 'text',
            color: 'bg',
          },
        },
        ghost: {
          color: 'text',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'text',
            color: 'text',
            _placeholder: {
              color: 'brand.500',
            },
            _focus: {
              borderColor: 'text',
              boxShadow: 'none',
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderColor: 'text',
          color: 'text',
          _placeholder: {
            color: 'brand.500',
          },
          _focus: {
            borderColor: 'text',
            boxShadow: 'none',
          },
        },
      },
    },
  },
  fonts: {
    heading: "system-ui, sans-serif",
    body: "system-ui, sans-serif",
  },
};

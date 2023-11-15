import { Theme, darkTheme } from '@rainbow-me/rainbowkit';

const baseTheme: Theme = darkTheme({
  fontStack: 'system',
  accentColor: '#f5c583',
  accentColorForeground: '#1b1b1b',
  borderRadius: 'small',
  overlayBlur: 'small',
});

export const RAINBOWKIT_CUSTOM_THEME: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    connectButtonBackground: '#f5c583',
    connectButtonText: '#1b1b1b',
    modalBackground: '#171820',
    menuItemBackground: '#f5c58388',
  },
};

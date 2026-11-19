import type { Preview } from '@storybook/angular-vite';
import '@fontsource-variable/inter';
import './storybook.scss';


const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tema del design system',
      toolbar: {
        title: 'Tema',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Chiaro', icon: 'sun' },
          { value: 'dark', title: 'Scuro', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (storyFn, context) => {
      const theme = context.globals['theme'];
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-rs-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-rs-theme');
      }
      return storyFn();
    },
  ],
  parameters: {
    backgrounds: { disable: true },
    // … i parameters che l'init ha già generato
  },
};

export default preview;

// @ts-nocheck
import type {Preview} from '@storybook/vue3';
import {setup} from '@storybook/vue3';
import vuetify from './plugins/vuetify';
import {withVuetifyTheme} from './withVuetifyTheme.decorator';
import i18n, {i18nConfig} from './plugins/i18n';
import {createPinia} from 'pinia';
import {toastOptions} from "./plugins/toastify";
import vueSchemaForms from "./plugins/vueSchemaForms";
import {App} from "vue";
import Vue3Toastify from "vue3-toastify";

const preview: Preview = {
  parameters: {
    locale: i18nConfig.locale,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

const pinia = createPinia();
setup(async (app: App) => {
  app.use(vuetify)
    .use(i18n)
    .use(pinia)
    .use(Vue3Toastify, toastOptions)
})


export const decorators = [withVuetifyTheme];

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: i18nConfig.locale,
    toolbar: {
      icon: 'globe',
      items: [
        {value: 'en', left: '🇺🇸', title: 'English'},
        {value: 'pl', left: '🇵🇱', title: 'Polski'},
      ],
      dynamicTitle: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      items: [
        {value: 'light', title: 'Light', left: '🌞'},
        {value: 'dark', title: 'Dark', left: '🌛'},
      ],
      dynamicTitle: true,
    },
  },
};

export default preview;

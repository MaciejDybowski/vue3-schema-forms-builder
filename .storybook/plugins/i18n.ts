import { createI18n } from 'vue-i18n';

// Minimal i18n config for Storybook
// Builder components use useBuilderLocale composable which has its own translations
export const i18nConfig = {
  locale: localStorage.getItem('locale') || 'pl',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: {
    en: {},
    pl: {},
  },
};

export default createI18n(i18nConfig);

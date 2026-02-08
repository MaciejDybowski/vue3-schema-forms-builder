import { createI18n } from 'vue-i18n';

// Import centralized translations
import commonEn from '../../src/locales/common/en.json';
import commonPl from '../../src/locales/common/pl.json';
import builderEn from '../../src/locales/builder/en.json';
import builderPl from '../../src/locales/builder/pl.json';
import elementsDrawerEn from '../../src/locales/elements-drawer/en.json';
import elementsDrawerPl from '../../src/locales/elements-drawer/pl.json';
import mainCanvasEn from '../../src/locales/main-canvas/en.json';
import mainCanvasPl from '../../src/locales/main-canvas/pl.json';
import atomsEn from '../../src/locales/properties-drawer/atoms/en.json';
import atomsPl from '../../src/locales/properties-drawer/atoms/pl.json';
import panelsEn from '../../src/locales/properties-drawer/panels/en.json';
import panelsPl from '../../src/locales/properties-drawer/panels/pl.json';
import controlsEn from '../../src/locales/properties-drawer/controls/en.json';
import controlsPl from '../../src/locales/properties-drawer/controls/pl.json';

// Merge all messages into flat structure (same as setup.ts)
const messages = {
  en: {
    ...commonEn,
    ...builderEn,
    ...elementsDrawerEn,
    ...mainCanvasEn,
    ...atomsEn,
    ...panelsEn,
    ...controlsEn,
  },
  pl: {
    ...commonPl,
    ...builderPl,
    ...elementsDrawerPl,
    ...mainCanvasPl,
    ...atomsPl,
    ...panelsPl,
    ...controlsPl,
  },
};

export const i18nConfig = {
  locale: localStorage.getItem('locale') || 'pl',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages,
};

export default createI18n(i18nConfig);

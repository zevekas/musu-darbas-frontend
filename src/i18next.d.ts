import 'i18next'
import type lt from '#/../public/locales/lt/translation.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: typeof lt }
  }
}

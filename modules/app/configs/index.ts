import { LocaleNamespace } from '@modules/common'
import { Translator } from '@modules/core'

export const i18n = Translator.setup({
    resources: {
        en: {
            [LocaleNamespace.DEFAULT]: require('../../../assets/localization/en/default.json'),
        },
        fr: {
            [LocaleNamespace.DEFAULT]: require('../../../assets/localization/fr/default.json'),
        },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: Object.values(LocaleNamespace),
    defaultNS: LocaleNamespace.DEFAULT,
    debug: false,
    interpolation: {
        escapeValue: false,
    },
    nsSeparator: false,
    keySeparator: false,
    compatibilityJSON: 'v3'
})

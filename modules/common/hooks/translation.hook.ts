import {TFunction} from 'i18next'
import {
    Namespace,
    useTranslation as useLocalTranslation,
    UseTranslationOptions,
} from 'react-i18next'

export const useTranslation = (ns?: Namespace, options?: UseTranslationOptions): TFunction => {
    const {t} = useLocalTranslation(ns, options)

    return t
}

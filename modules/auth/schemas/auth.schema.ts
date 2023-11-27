import { validateEmail } from '@modules/common'
import * as Yup from 'yup'

export const loginSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
        .nullable()
        .trim()
        .max(50, 'EMAIL_INVALID_MSG')
        .required('')
        .matches(validateEmail, 'EMAIL_INVALID_MSG')
        .email('EMAIL_INVALID_MSG')
    ,
        password:  Yup.string()
        .trim()
        .required('')
        .nullable(true)
        .max(200, 'maximum_character_is200'),
    })
}

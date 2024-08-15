import { t } from 'i18next';
import * as Yup from 'yup'

export const SignupSchema = Yup.object().shape({
    username: Yup
        .string()
        .min(3, ({ min }) => t('signUp.validation.min_username', { min }))
        .max(25, ({ max }) => t('signUp.validation.max_username', { max }))
        .required(() => t('signUp.validation.required_username')),
    password: Yup
        .string()
        .min(7, ({ min }) => t('signUp.validation.min_password', { min }))
        .max(15, ({ max }) => t('signUp.validation.max_password', { max }))
        .required(() => t('signUp.validation.required_password')),
    email: Yup
        .string()
        .email(() => t('signUp.validation.invalid_email'))
        .required(() => t('signUp.validation.required_email')),
});

export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup
        .string()
        .email(() => t('forgot.validation.invalid_email'))
        .required(() => t('forgot.validation.required_email')),
});
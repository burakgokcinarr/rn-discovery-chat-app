import * as Yup from 'yup'

export const SignupSchema = Yup.object().shape({
    username: Yup
        .string()
        .min(3, ({ min }) => `Nickname must be at least ${min} characters`)
        .max(25, ({ max }) => `Nickname must be at most ${max} characters`)
        .required('Nickname is required'),
    password: Yup
        .string()
        .min(7, ({ min }) => `Password must be at least ${min} characters`)
        .max(15, ({ max }) => `Password must be at most ${max} characters`)
        .required('Password is required'),
    email: Yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
});
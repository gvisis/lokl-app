import * as Yup from 'yup';

const loginValidatorSchema = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Invalid email format').max(50).trim(),
	password: Yup.string().required('Password is required').min(6).max(50).trim(),
})
const passwordResetValidatorSchema = Yup.object().shape({
	email: Yup.string().required('Email field is required').email('Invalid email format').max(50).trim(),
})
export const validator = {
	login: loginValidatorSchema,
	passwordReset: passwordResetValidatorSchema,
}



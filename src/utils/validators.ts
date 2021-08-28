import * as Yup from 'yup';
import i18n from 'i18next';

const t = i18n.t.bind(i18n);

const pass = {
  min: 6,
  max: 50,
};
const loginValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .required(t('yup:email-required'))
    .email(t('yup:email-invalid-format'))
    .max(pass.max, t('yup:pass-size-max', { max: pass.max }))
    .trim(),
  password: Yup.string()
    .required(t('yup:pass-required'))
    .min(pass.min, t('yup:pass-size-min', { min: pass.min }))
    .max(pass.max, t('yup:pass-size-max', { max: pass.max }))
    .trim(),
});
const passwordResetValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .required(t('yup:email-required'))
    .email(t('yup:email-invalid-format'))
    .max(pass.max, t('yup:pass-size-max', { max: pass.max }))
    .trim(),
});

const signupValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .required(t('yup:email-required'))
    .email(t('yup:email-invalid-format'))
    .max(pass.max, t('yup:pass-size-max', { max: pass.max }))
    .trim(),
  password: Yup.string()
    .required(t('yup:pass-required'))
    .min(pass.min, t('yup:pass-size-min', { min: pass.min }))
    .max(pass.max, t('yup:pass-size-max', { max: pass.max }))
    .trim(),
  confirmPassword: Yup.string()
    .required(t('yup:pass-confirm'))
    .oneOf([Yup.ref('password')], t('yup:pass-match'))
    .min(pass.min, t('yup:pass-size-min', { min: pass.min }))
    .max(pass.max, t('yup:pass-size-max', { max: pass.max }))
    .trim(),
});

const adValidatorSchema = Yup.object().shape({
  description: Yup.string()
    .required('Description required')
    .min(5, 'Minimum characters ${min}')
    .max(300, 'Maximum characters ${max}')
    .trim(),
  title: Yup.string()
    .required('Please enter the title')
    .min(5, 'At least ${min} characters')
    .max(40, 'Maximum characters ${max}')
    .trim(),

  price: Yup.number()
    .required('Price needed')
    .typeError('Digits only')
    .positive('Positive no. only')
    .test(
      'maxDigits',
      'No more than 6 digits',
      number => String(number).length <= 6,
    ),
});

export const validator = {
  login: loginValidatorSchema,
  passwordReset: passwordResetValidatorSchema,
  signup: signupValidatorSchema,
  ad: adValidatorSchema,
};

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
  // TODO: started braking the code with Promise rejection from regexp ??
  // description: Yup.string()
  //   .required('Description required')
  //   .min(5, 'Minimum characters ${min}')
  //   .max(300, 'Maximum characters ${max}')
  //   .trim(),
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
const addressValidatorSchema = Yup.object().shape({
  street: Yup.string()
    .required('Street required')
    .min(5, 'At least ${min} characters')
    .max(40, 'Maximum characters ${max}')
    .trim(),
  city: Yup.string()
    .required('City required')
    .min(2, 'At least ${min} characters')
    .max(40, 'Maximum characters ${max}')
    .trim(),
  name: Yup.string()
    .required('Name required')
    .min(2, 'At least ${min} characters')
    .max(40, 'Maximum characters ${max}')
    .trim(),
  phone: Yup.string()
    .required('Phone required')
    .min(6, 'At least ${min} characters')
    .max(40, 'Maximum characters ${max}')
    .trim(),
  country: Yup.string()
    .required('Country required')
    .min(2, 'At least ${min} characters')
    .max(40, 'Maximum characters ${max}')
    .trim(),
  postCode: Yup.string()
    .required('Post code required')
    .min(2, 'At least ${min} characters')
    .max(40, 'Maximum characters ${max}')
    .trim(),
});

const paymentValidatorSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required('Card number required')
    .min(16, 'Minimum 16 digits')
    .max(16, 'Maximum 16 digits')
    .trim(),
  expiryDate: Yup.string()
    .required('Expiry date required')
    .min(5, 'Minimum 5 digits')
    .max(5, 'Maximum 5 digits')
    .trim(),
  cvc: Yup.string()
    .required('CVC required')
    .min(3, 'Minimum 3 digits')
    .max(3, 'Maximum 3 digits')
    .trim(),
});

export const validator = {
  login: loginValidatorSchema,
  passwordReset: passwordResetValidatorSchema,
  signup: signupValidatorSchema,
  ad: adValidatorSchema,
  payment: paymentValidatorSchema,
  address: addressValidatorSchema,
};

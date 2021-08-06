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

export const validator = {
  login: loginValidatorSchema,
  passwordReset: passwordResetValidatorSchema,
  signup: signupValidatorSchema,
};

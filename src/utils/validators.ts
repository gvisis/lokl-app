import * as Yup from 'yup';
import i18n from 'i18next';

const t = i18n.t.bind(i18n);

const PASS_LENGTH = {
  min: 6,
  max: 50,
};
const MAX_CHARACTERS = 40;
const ADDRESS_LENGTHS = {
  min2: 2,
  min5: 5,
  min6: 6,
};
const ADS = {
  minTitle: 3,
};
const PAYMENTS_LENGTH = {
  Card: 16,
  Date: 5,
  Cvc: 3,
};

const loginValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .required(t('yup:email-required'))
    .email(t('yup:email-invalid-format'))
    .max(PASS_LENGTH.max, t('yup:pass-size-max', { max: PASS_LENGTH.max }))
    .trim(),
  password: Yup.string()
    .required(t('yup:pass-required'))
    .min(PASS_LENGTH.min, t('yup:pass-size-min', { min: PASS_LENGTH.min }))
    .max(PASS_LENGTH.max, t('yup:pass-size-max', { max: PASS_LENGTH.max }))
    .trim(),
});
const passwordResetValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .required(t('yup:email-required'))
    .email(t('yup:email-invalid-format'))
    .max(PASS_LENGTH.max, t('yup:pass-size-max', { max: PASS_LENGTH.max }))
    .trim(),
});

const signupValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .required(t('yup:email-required'))
    .email(t('yup:email-invalid-format'))
    .max(PASS_LENGTH.max, t('yup:pass-size-max', { max: PASS_LENGTH.max }))
    .trim(),
  password: Yup.string()
    .required(t('yup:pass-required'))
    .min(PASS_LENGTH.min, t('yup:pass-size-min', { min: PASS_LENGTH.min }))
    .max(PASS_LENGTH.max, t('yup:pass-size-max', { max: PASS_LENGTH.max }))
    .trim(),
  confirmPassword: Yup.string()
    .required(t('yup:pass-confirm'))
    .oneOf([Yup.ref('password')], t('yup:pass-match'))
    .min(PASS_LENGTH.min, t('yup:pass-size-min', { min: PASS_LENGTH.min }))
    .max(PASS_LENGTH.max, t('yup:pass-size-max', { max: PASS_LENGTH.max }))
    .trim(),
});

const adValidatorSchema = Yup.object().shape({
  // TODO: started braking the code with Promise rejection from regexp ??
  // description: Yup.string()
  //   .required('Description required')
  //   .min(5, 'Minimum characters ${min}')
  //   .max(300, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
  //   .trim(),
  title: Yup.string()
    .required(t('yup:adEnterTitle'))
    .min(ADS.minTitle, t('yup:adSizeMin', { min: ADS.minTitle }))
    .max(MAX_CHARACTERS, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
    .trim(),
  price: Yup.number()
    .required(t('yup:adPrice'))
    .typeError(t('yup:adDigits'))
    .positive(t('yup:adPositive'))
    .test(
      'maxDigits',
      t('pay-cardMax', { max: 6 }),
      number => String(number).length <= 6,
    ),
});
const addressValidatorSchema = Yup.object().shape({
  street: Yup.string()
    .required(t('yup:addressStreet'))
    .min(
      ADDRESS_LENGTHS.min5,
      t('yup:minCharacters', { min: ADDRESS_LENGTHS.min5 }),
    )
    .max(MAX_CHARACTERS, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
    .trim(),
  city: Yup.string()
    .required(t('yup:addressCity'))
    .min(
      ADDRESS_LENGTHS.min2,
      t('yup:minCharacters', { min: ADDRESS_LENGTHS.min2 }),
    )
    .max(MAX_CHARACTERS, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
    .trim(),
  name: Yup.string()
    .required(t('yup:addressName'))
    .min(
      ADDRESS_LENGTHS.min2,
      t('yup:minCharacters', { min: ADDRESS_LENGTHS.min2 }),
    )
    .max(MAX_CHARACTERS, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
    .trim(),
  phone: Yup.string()
    .required(t('yup:addressPhone'))
    .min(
      ADDRESS_LENGTHS.min6,
      t('yup:minCharacters', { min: ADDRESS_LENGTHS.min6 }),
    )
    .max(MAX_CHARACTERS, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
    .trim(),
  country: Yup.string()
    .required(t('yup:addressCountry'))
    .min(
      ADDRESS_LENGTHS.min2,
      t('yup:minCharacters', { min: ADDRESS_LENGTHS.min2 }),
    )
    .max(MAX_CHARACTERS, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
    .trim(),
  postCode: Yup.string()
    .required(t('yup:addressPostCode'))
    .min(
      ADDRESS_LENGTHS.min2,
      t('yup:minCharacters', { min: ADDRESS_LENGTHS.min2 }),
    )
    .max(MAX_CHARACTERS, t('yup:maxCharacters', { max: MAX_CHARACTERS }))
    .trim(),
});

const paymentValidatorSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required(t('yup:pay-cardNumber'))
    .min(
      PAYMENTS_LENGTH.Card,
      t('yup:pay-cardMin', { min: PAYMENTS_LENGTH.Card }),
    )
    .max(
      PAYMENTS_LENGTH.Card,
      t('yup:pay-cardMax', { max: PAYMENTS_LENGTH.Card }),
    )
    .trim(),
  expiryDate: Yup.string()
    .required(t('yup:pay-expDate'))
    .min(
      PAYMENTS_LENGTH.Date,
      t('yup:pay-cardMin', { min: PAYMENTS_LENGTH.Date }),
    )
    .max(
      PAYMENTS_LENGTH.Date,
      t('yup:pay-cardMax', { max: PAYMENTS_LENGTH.Date }),
    )
    .trim(),
  cvc: Yup.string()
    .required(t('yup:pay-cvc'))
    .min(
      PAYMENTS_LENGTH.Cvc,
      t('yup:pay-cardMin', { min: PAYMENTS_LENGTH.Cvc }),
    )
    .max(
      PAYMENTS_LENGTH.Cvc,
      t('yup:pay-cardMax', { max: PAYMENTS_LENGTH.Cvc }),
    )
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

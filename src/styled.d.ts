import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: '#FFAD1D';
      primary1: '#FFC668';
      primary2: '#FFDEA4';
      primary3: '#FEF8E0';
      secondary: '#DA6317';
      secondary1: '#E38751';
      secondary2: '#E6A986';
      secondary3: '#E3CBBC';
      secondaryBtn: '#00B896';
      tertiary: '#25C97C';
      tertiary1: '#2ECF80';
      tertiary2: '#23C77C';
      tertiary3: '#F0F9F5';
      background: '#FEF8E0';
      white: '#fff';
      white60: 'rgba(255, 255, 255, 0.7)';
      black: '#000';
      lightGrey: '#8c8c8c';
      red: '#FF1D1D';
      red1: '#FFE8E8';
      error: '#edfe00';
    };
    fonts: {
      size: {
        xs: 10;
        s: 12;
        m: 14;
        l: 16;
        xl: 18;
        xxl: 20;
        xxxl: 24;
      };
      family: {
        lato: string;
        latoLight: string;
        latoBold: string;
        nexaBold: string;
        nexaLight: string;
        benton: string;
        bentonLight: string;
        bentonBold: string;
        bentonMedium: string;
        bentonBook: string;
      };
    };
    width: number;
  }
}

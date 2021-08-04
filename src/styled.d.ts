import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary1: string;
      primary2: string;
      primary3: string;
      secondary: string;
      secondary1: string;
      secondary2: string;
      secondary3: string;
      secondaryBtn: string;
      tertiary: string;
      tertiary1: string;
      tertiary2: string;
      tertiary3: string;
      background: string;
      white: string;
      white60: string;
      black: string;
      grey: string;
      lightGrey: string;
      lightGrey1: string;
      lightGrey2: string;
      red: string;
      red1: string;
      error: string;
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

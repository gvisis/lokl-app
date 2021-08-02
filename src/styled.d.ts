import 'styled-components/native';

declare module 'styled-components/native' {
  export interface StyledProps {
    colors: {
      primary: string;
      primary60: string;
      primary80: string;
      secondary: string;
      secondaryBtn: string;
      background: string;
      white: string;
      white60: string;
      black: string;
      lightGrey: string;
      red: string;
      error: string;
    };
    fonts: {
      size: {
        xs: number;
        s: number;
        m: number;
        l: number;
        xl: number;
        xxl: number;
        xxxl: number;
      };
    };
  }
}

declare module 'rn-toggle-switch';
declare module 'react-native-vector-icons/dist/MaterialCommunityIcons';
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}
declare module 'react-native-redash/lib/module/v1';

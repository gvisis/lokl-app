import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import ToggleSwitch from 'rn-toggle-switch';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../state/actions';
import { locale } from '../../utils/locale';
import { LANG, THEME } from '../../utils/variables';

interface ToggleSwitcherProps {
  toggle: string;
}
export const ToggleSwitcher: React.FC<ToggleSwitcherProps> = ({ toggle }) => {
  const [switcherBool, setSwitchBool] = useState(false);
  const appTheme = useSelector(state => state.ui.appTheme);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSwitch = () => {
    if (toggle === THEME.SWITCH) {
      dispatch(
        actions.ui.setTheme(
          appTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
        ),
      );
    }
    if (toggle) {
      locale.changeLanguage(locale.language === LANG.EN ? LANG.LT : LANG.EN);
    }
    setSwitchBool(!switcherBool);
  };

  return (
    <ToggleSwitch
      text={{ on: '', off: '' }}
      color={{
        indicator: theme.colors.white,
        active: theme.colors.secondary,
        activeBorder: theme.colors.secondary,
        inactive: theme.colors.tertiary1,
        inactiveBorder: theme.colors.tertiary1,
      }}
      active={switcherBool}
      disabled={false}
      width={45}
      radius={10}
      onValueChange={handleSwitch}
    />
  );
};

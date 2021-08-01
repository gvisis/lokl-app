import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import ToggleSwitch from 'rn-toggle-switch';
import { useDispatch } from 'react-redux';

import { actions } from '../../state/actions';

export const ThemeSwitch = () => {
  const [themeSwitch, setThemeSwitch] = useState(true);
  const dispatch = useDispatch();

  // Theme switcher
  const handleThemeSwitch = () => {
    dispatch(actions.ui.setTheme(!themeSwitch));
    setThemeSwitch(!themeSwitch);
  };

  const theme = useContext(ThemeContext);
  return (
    <ToggleSwitch
      text={{
        on: 'Dark',
        off: 'Light',
        activeTextColor: theme.colors.white,
        inactiveTextColor: theme.colors.white,
      }}
      textStyle={{
        fontWeight: 'bold',
      }}
      color={{
        indicator: theme.colors.white,
        active: theme.colors.secondary,
        inactive: theme.colors.secondaryBtn,
        activeBorder: theme.colors.secondary,
        inactiveBorder: theme.colors.secondaryBtn,
      }}
      active={themeSwitch}
      disabled={false}
      width={35}
      radius={10}
      onValueChange={handleThemeSwitch}
    />
  );
};

import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components/native';
import ToggleSwitch from 'rn-toggle-switch';
import { useDispatch } from 'react-redux';

import { actions } from '../../state/actions';
import { locale } from '../../utils/locale';

export const ToggleSwitcher = ({ toggle }) => {
  const [switcherBool, setSwitchBool] = useState(true);
  const dispatch = useDispatch();
  const [toggleText, setToggleText] = useState({});

  const handleSwitch = () => {
    if (toggle === 'themeSwitch') {
      dispatch(actions.ui.setTheme(!switcherBool));
    }
    if (toggle === 'langSwitch') {
      locale.changeLanguage(locale.language === 'en' ? 'lt' : 'en');
    }
    setSwitchBool(!switcherBool);
  };

  useEffect(() => {
    if (toggle === 'themeSwitch') {
      setToggleText({
        onText: 'Dark',
        offText: 'Light',
      });
    }
    if (toggle === 'langSwitch') {
      setToggleText({
        onText: locale.language === 'en' ? 'En' : 'Lt',
        offText: locale.language !== 'en' ? 'En' : 'Lt',
      });
    }
  }, [toggle]);

  const theme = useContext(ThemeContext);
  return (
    <ToggleSwitch
      text={{
        on: toggleText.onText,
        off: toggleText.offText,
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
      active={switcherBool}
      disabled={false}
      width={35}
      radius={10}
      onValueChange={handleSwitch}
    />
  );
};

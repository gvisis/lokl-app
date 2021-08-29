import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components/native';
import ToggleSwitch from 'rn-toggle-switch';
import { useDispatch } from 'react-redux';

import { actions } from '../../state/actions';
import { locale } from '../../utils/locale';

type ToggleSwitcherProps = {
  toggle: string;
};

export const ToggleSwitcher: React.FC<ToggleSwitcherProps> = ({ toggle }) => {
  const [switcherBool, setSwitchBool] = useState(true);
  const dispatch = useDispatch();
  const [toggleText, setToggleText] = useState({ onText: '', offText: '' });
  const theme = useTheme();

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
        //! need to get previous info from state
        onText: 'Light',
        offText: 'Dark',
      });
    }
    if (toggle === 'langSwitch') {
      setToggleText({
        onText: locale.language === 'en' ? 'En' : 'Lt',
        offText: locale.language !== 'en' ? 'En' : 'Lt',
      });
    }
  }, [toggle]);

  return (
    <ToggleSwitch
      text={{
        on: toggleText.onText,
        off: toggleText.offText,
        activeTextColor: theme.colors.white,
        inactiveTextColor: theme.colors.white,
      }}
      color={{
        indicator: theme.colors.white,
        active: theme.colors.secondary,
        activeBorder: theme.colors.secondary,
        inactive: theme.colors.secondaryBtn,
        inactiveBorder: theme.colors.secondaryBtn,
      }}
      active={switcherBool}
      disabled={false}
      width={45}
      radius={10}
      onValueChange={handleSwitch}
    />
  );
};

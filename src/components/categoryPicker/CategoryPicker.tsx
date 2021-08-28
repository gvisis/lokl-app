import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components/native';

interface CategoryPicker {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategoryPicker: React.FC<CategoryPicker> = ({
  value,
  onValueChange,
}) => {
  const theme = useTheme();
  const categories = useSelector(state => state.app.categories);

  const categoryItems = categories.map(category => ({
    label: category.title,
    value: category.id,
  }));

  const categoryStyle = {
    iconContainer: {
      top: 5,
      paddingRight: 10,
    },
    inputAndroid: { color: theme.colors.secondary },
    viewContainer: {
      flex: 0.7,
      color: theme.colors.secondary,
    },
  };
  return (
    <RNPickerSelect
      placeholder={{
        label: 'Select Category',
        value: null,
      }}
      items={categoryItems}
      onValueChange={onValueChange}
      style={categoryStyle}
      value={value}
      Icon={() => <Icon name="menu-down" size={40} />}
    />
  );
};

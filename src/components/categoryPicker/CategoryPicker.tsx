import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

interface CategoryPicker {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategoryPicker: React.FC<CategoryPicker> = ({
  value,
  onValueChange,
}) => {
  const categories = useSelector(state => state.app.categories);

  const categoryItems = categories.map(category => ({
    label: category.title,
    value: category.id,
  }));
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

const categoryStyle = {
  iconContainer: {
    top: 5,
    paddingRight: 10,
  },
  viewContainer: {
    flex: 0.7,
    color: 'black',
  },
};

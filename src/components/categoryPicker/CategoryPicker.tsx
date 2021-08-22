import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

export const CategoryPicker: React.FC = (pickedCategory, setPickedCategory) => {
  const categories = useSelector(state => state.app.categories);

  return (
    <>
      <RNPickerSelect
        placeholder={{
          label: 'Select Category',
          value: null,
        }}
        items={categories.map(category => ({
          label: category.title,
          value: category.id,
        }))}
        onValueChange={value => {
          setPickedCategory(value);
        }}
        style={categoryStyle}
        value={pickedCategory}
        Icon={() => <Icon name="menu-down" size={40} />}
      />
    </>
  );
};

const categoryStyle = {
  iconContainer: {
    top: 5,
  },
  inputAndroid: { color: 'black' },
  viewContainer: {
    backgroundColor: '#f5f5f5',
    width: '40%',
  },
};

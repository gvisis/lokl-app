import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const CategoryPicker: React.FC = () => {
  const [subCategoryPicker, setSubCategoryPicker] = useState<string>(null);
  const [categoryPicker, setCategoryPicker] = useState<string>(null);

  return (
    <>
      <RNPickerSelect
        placeholder={{
          label: 'Category',
          value: null,
        }}
        items={[
          {
            label: 'Drinks',
            value: 1,
          },
          {
            label: 'Meat',
            value: 2,
          },
          {
            label: 'Vegetables',
            value: 3,
          },
        ]}
        onValueChange={value => {
          setCategoryPicker(value);
        }}
        style={{
          iconContainer: {
            top: 5,
          },
          inputAndroid: { color: 'black' },
          viewContainer: {
            width: '40%',
            backgroundColor: '#f5f5f5',
          },
        }}
        value={categoryPicker}
        Icon={() => <Icon name="menu-down" size={40} />}
      />
      <RNPickerSelect
        placeholder={{
          label: 'Subcategory',
          value: null,
        }}
        items={[
          {
            label: 'Sausages',
            value: 1,
          },
          {
            label: 'Dried meat',
            value: 2,
          },
          {
            label: 'Steaks',
            value: 2,
          },
        ]}
        onValueChange={value => {
          setSubCategoryPicker(value);
        }}
        style={{
          iconContainer: {
            top: 5,
          },
          inputAndroid: { color: 'black' },
          viewContainer: {
            width: '40%',
            backgroundColor: '#f5f5f5',
          },
        }}
        value={subCategoryPicker}
        Icon={() => <Icon name="menu-down" size={40} />}
      />
    </>
  );
};

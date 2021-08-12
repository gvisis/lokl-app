import React, { useState } from 'react';
import { Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export const DatePicker = () => {
  const [subCategoryPicker, setSubCategoryPicker] = useState<string>(null);
  const [categoryPicker, setCategoryPicker] = useState<string>(null);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState<boolean>(false);

  // Date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  //-=================
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

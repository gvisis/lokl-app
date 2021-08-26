import React, { useCallback, useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components/native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { launchImageLibrary } from 'react-native-image-picker';

import { CategoryPicker, Container, CustomBtn } from '../../components';
import { actions } from '../../state/actions';
import { validator } from '../../utils/validators';
import { ROUTES } from '../../routes/RouteNames';
import { getImageObject, guidGenerator } from '../../utils/functions';
import { AdsProps } from '../../state/app/AppInterfaces';

interface AddAdViewProps {
  onPress?: (event: GestureResponderEvent) => void;
}
export const AddAdView: React.FC<AddAdViewProps> = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<string>('date');
  const [tempImages, setTempImages] = useState([]);
  const [show, setShow] = useState<boolean>(false);
  const [pickedCategory, setPickedCategory] = useState<string>(null);

  const navigation = useNavigation();

  const handleAdSubmit = async (
    price: number,
    title: string,
    description: string,
  ): Promise<void> => {
    dispatch(
      actions.user.createNewAd(
        {
          id: guidGenerator(),
          title,
          category: pickedCategory,
          price,
          description,
          dateRequired: date.toString(),
          dateAdded: new Date().toString(),
        },
        tempImages,
      ),
    );
    navigation.goBack();
  };
  // ===== IMAGE PICKER =====
  const handleImagePicker = useCallback(() => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 800,
      maxHeight: 600,
    };
    launchImageLibrary(options, ({ errorMessage, assets }) => {
      if (assets) {
        setTempImages([...tempImages, getImageObject(assets)]);
      }
      if (errorMessage) {
        dispatch(actions.ui.setStatus('error', true, errorMessage));
      }
    });
  }, [tempImages]);
  // ===== END IMAGE PICKER =====

  // ======== DATE PICKER ========
  const showDatepicker = () => {
    showMode('date');
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };
  // ===== END DATE PICKER =====

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{
            price: '',
            description: '',
            title: '',
          }}
          enableReinitialize
          validationSchema={validator.ad}
          onSubmit={({
            price,
            title,
            description,
          }: {
            price: string;
            title: string;
            description: string;
          }) => handleAdSubmit(price, title, description)}>
          {({ errors, values, handleChange, handleSubmit, touched }) => (
            <AdContainer>
              {errors.title && touched && (
                <ErrorMessage>{errors.title}</ErrorMessage>
              )}
              <AdTitle
                onChangeText={handleChange('title')}
                value={values.title}
                placeholder={'Enter ad title'}
              />
              <AdHeader>
                {tempImages.length != 0 &&
                  tempImages.map(image => (
                    <AddedImage key={image.id} source={{ uri: image.url }} />
                  ))}
                {(tempImages === null || tempImages.length != 3) && (
                  <AddImage onPress={handleImagePicker}>
                    <Icon name={'image-plus'} size={30} />
                  </AddImage>
                )}
              </AdHeader>
              <AdHeaderBottom>
                <CategoryPicker
                  pickedCategory={pickedCategory}
                  setPickedCategory={setPickedCategory}
                />
              </AdHeaderBottom>

              <AdDescriptionWrap>
                {errors.description && touched && (
                  <ErrorMessage>{errors.description}</ErrorMessage>
                )}
                <AdDescription
                  placeholder="Describe what are you looking for.."
                  placeholderTextColor="green"
                  onChangeText={handleChange('description')}
                  multiline
                  value={values.description}
                />
                {errors.price && touched && (
                  <ErrorMessage>{errors.price}</ErrorMessage>
                )}
                <PriceInput
                  placeholderTextColor="green"
                  keyboardType="numeric"
                  onChangeText={handleChange('price')}
                  placeholder="Enter maximum price you willing to pay"
                  value={values.price}
                />
                <View>
                  <CustomBtn
                    center
                    onPress={showDatepicker}
                    label="Select date"
                  />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    format="DD-MM-YYYY"
                    display="calendar"
                    onChange={onChange}
                  />
                )}
                <Text>{date.toString()}</Text>
                <CustomBtn center label={'Create add'} onPress={handleSubmit} />
              </AdDescriptionWrap>
            </AdContainer>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const AdContainer = styled.View`
  flex: 1;
`;
const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  margin-bottom: 5px;
`;
const AdHeader = styled.View`
  /* padding: 10px; */
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: 1px;
`;

const AdTitle = styled.TextInput`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  width: 100%;
  border-bottom-width: 1px;
`;

const AdHeaderBottom = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  border-bottom-width: 1px;
`;

const addImageStyle = css`
  width: 100px;
  height: 100px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  background: ${({ theme }) => theme.colors.lightGrey2};
  border-color: ${({ theme }) => theme.colors.lightGrey1};
`;

const AddedImage = styled.Image`
  ${addImageStyle}
`;
const AddImage = styled.TouchableOpacity`
  ${addImageStyle}
`;

const AdDescriptionWrap = styled.View`
  flex: 1;
  border-bottom-width: 1px;
`;

const AdDescription = styled.TextInput`
  min-height: 100px;
  max-height: 200px;
  color: black;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  border-bottom-width: 1px;
  text-align-vertical: top;
`;

const PriceInput = styled.TextInput`
  color: black;
`;

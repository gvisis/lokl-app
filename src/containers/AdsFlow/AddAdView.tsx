import React, { useCallback, useState } from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';
import styled, { css, useTheme } from 'styled-components/native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { launchImageLibrary } from 'react-native-image-picker';

import {
  CategoryPicker,
  Container,
  CustomBtn,
  ProfileRow,
} from '../../components';
import { actions } from '../../state/actions';
import { validator } from '../../utils/validators';
import { getImageObject, guidGenerator } from '../../utils/functions';

interface AddAdViewProps {
  onPress?: (event: GestureResponderEvent) => void;
}
export const AddAdView: React.FC<AddAdViewProps> = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<string>('date');
  const [tempImages, setTempImages] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [pickedCategory, setPickedCategory] = useState<string>(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleAdSubmit = values => {
    const { title, description, price } = values;
    dispatch(
      actions.user.createNewAd(
        {
          id: guidGenerator(),
          title,
          category: pickedCategory,
          price,
          description,
          dateRequired: date,
          dateAdded: new Date(),
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
        setTempImages(tempImages => [...tempImages, getImageObject(assets)]);
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
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: string) => {
    setShowDatePicker(true);
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
          onSubmit={values => handleAdSubmit(values)}>
          {({ errors, values, handleChange, handleSubmit, touched }) => (
            <AdContainer>
              {errors.title && touched.title && (
                <ErrorMessage>{errors.title}</ErrorMessage>
              )}
              <ProfileRow
                onChangeText={handleChange('title')}
                text={values.title}
                editable
                placeholder={'What are you looking for?'}
              />
              {/* TITLE */}
              <AdHeader>
                {tempImages.length != 0 &&
                  tempImages.map(image => (
                    <AddedImage key={image.id} source={{ uri: image.url }} />
                  ))}
                {(tempImages === null || tempImages.length != 3) && (
                  <AddImage onPress={handleImagePicker}>
                    <AddImageText>Select example image</AddImageText>
                    <Icon name={'image-plus'} size={25} />
                  </AddImage>
                )}
              </AdHeader>
              {/* TITLE END */}
              {/* ERRORS TOP*/}
              {errors.price && (
                <AdRowWrap errorText>
                  {errors.category && touched.category && (
                    <ErrorMessage>Please select a category</ErrorMessage>
                  )}
                  {errors.price && touched.price && (
                    <ErrorMessage>{errors.price}</ErrorMessage>
                  )}
                </AdRowWrap>
              )}
              {/* ERRORS TOP END */}
              {/* CATEGORY PICKER */}
              <AdRowWrap>
                <CategoryPicker
                  value={pickedCategory}
                  onValueChange={setPickedCategory}
                />
                <PriceInput
                  placeholderTextColor={theme.colors.lightGrey1}
                  keyboardType="numeric"
                  onChangeText={handleChange('price')}
                  placeholder={'Enter max price'}
                  value={values.price}
                />
              </AdRowWrap>
              {/* CATEGORY PICKER END */}
              {/* DESCRIPTION */}
              <AdDescriptionWrap>
                {errors.description && touched.description && (
                  <ErrorMessage>{errors.description}</ErrorMessage>
                )}
                <ProfileRow
                  onChangeText={handleChange('description')}
                  text={values.description}
                  editable
                  placeholder="Describe what are you looking for.."
                  multiline
                />
              </AdDescriptionWrap>
              {/* DESCRIPTION END */}
              {/* DATE PICKER  */}
              <AdRowWrap>
                <ProfileRow
                  rowLeft={<CalendarIcon name={'calendar-outline'} />}
                  rowRight={<DateText>{date.toLocaleDateString()}</DateText>}
                  onPress={showDatepicker}
                  text={'I need it by (select): '}
                />
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    minimumDate={new Date()}
                    maximumDate={new Date(2030, 11, 31)}
                    is24Hour={true}
                    format="DD-MM-YYYY"
                    display="calendar"
                    onChange={onChange}
                  />
                )}
              </AdRowWrap>
              {/* DATE PICKER END */}
              <CustomBtn center label={'Create'} onPress={handleSubmit} />
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
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  margin: 0 10px;
  padding: 5px;
  align-self: center;
`;
const AdHeader = styled.View`
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGrey1}; ;
`;

const AdRowWrap = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ errorText }) =>
    errorText ? 'space-between' : 'center'};
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  border-bottom-width: 1px;
  background-color: ${({ theme, errorText }) =>
    !errorText ? theme.colors.lightGrey2 : 'transparent'};
`;

const CalendarIcon = styled(Icon)`
  font-size: ${({ theme }) => theme.fonts.size.xxl}px;
  color: ${({ theme }) => theme.colors.secondary};
`;
const DateText = styled.Text`
	background-color: ${({ theme }) => theme.colors.primary}
	padding: 10px 5px;
	border-radius: ${({ theme }) => theme.border.radius5}px;
	color: ${({ theme }) => theme.colors.primary3};
	font-family: ${({ theme }) => theme.fonts.family.benton};
	elevation: 1;
	`;
const PriceInput = styled.TextInput`
  flex: 0.3;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  color: ${({ theme }) => theme.colors.secondary};
  border-left-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  padding: 5px;
  text-align: center;
`;
const AdDescriptionWrap = styled.View`
  flex: 0.5;
  margin: 10px;
`;
// IMAGE PICKER
const addImageStyle = css`
  width: 100px;
  height: 100px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.lightGrey2};
  border-radius: 5px;
`;

const AddedImage = styled.Image`
  ${addImageStyle}
`;
const AddImage = styled.TouchableOpacity`
  ${addImageStyle}
  elevation: 2;
  justify-content: space-evenly;
`;

const AddImageText = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  color: ${({ theme }) => theme.colors.lightGrey};
  text-align: center;
`;
// IMAGE PICKER END

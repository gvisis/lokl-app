//!
//! Emuliatoriuj screen atrodo kitaip
//!

import React, { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components/native';
import { Formik } from 'formik';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import { Container, CustomBtn, DatePicker } from '../../components';
import { actions } from '../../state/actions';
import { validator } from '../../utils/validators';
import { pickImage } from '../../utils/functions';
import { api } from '../../api';
import { RootState } from '../../state/reducers';

interface UserAd {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: string;
  dateAdded: string;
  dateRequired: string;
  owner: {
    id: string;
    name: string;
    email: string;
    city: string;
  };
}
interface AddAdViewProps {
  onPress?: (event: GestureResponderEvent) => void;
}

//! All this code here temporary.
export const AddAdView: React.FC<AddAdViewProps> = () => {
  const dispatch = useDispatch();
  const [tempImages, setTempImages] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState<boolean>(false);

  const [userAd, setUserAd] = useState<UserAd>(null);
  const currentUser = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    setUserAd({ ...userAd, id: Math.floor(Math.random() * 999999).toString() });
    console.log('effect useradid', userAd);
  }, []);

  const handleAdSubmit = (price, description) => {
    dispatch(
      actions.user.createNewAd({
        ...userAd,
        title: 'naujas item',
        category: categoryPicker,
        price,
        description,
        subCategory: subCategoryPicker,
        dateRequired: date.toString(),
        dateAdded: new Date().toString(),
        owner: {
          id: api.getUserInfo().uid,
          name: currentUser.name,
          email: currentUser.email,
          city: currentUser.city,
        },
      }),
    );
    dispatch(actions.app.uploadAdImages(userAd.id, tempImages));
  };
  // ===== IMAGE PICKER =====
  //! not working
  // const handleImagePicker = () => {
  //   try {
  //     pickImage();
  //   } catch (e) {
  //     console.log(e);
  //     dispatch(actions.ui.setStatus('error', true, e.message));
  //   } finally {
  //     console.log('pickimage final', pickImage());
  //   }
  // };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 800,
      maxHeight: 600,
    };
    launchImageLibrary(options, ({ didCancel, errorMessage, assets }) => {
      if (didCancel) {
        dispatch(
          actions.ui.setStatus('error', true, 'User cancelled image picker'),
        );
      }
      if (assets) {
        try {
          const imageUrl = assets[0].uri;
          const imageId = assets[0].uri.split('temp_')[1].split('.jpg')[0];
          setTempImages([...tempImages, { url: imageUrl, id: imageId }]);
          dispatch(actions.ui.setStatus('success', true, 'Image uploaded'));
        } catch (e) {
          dispatch(actions.ui.setStatus('error', true, e.message));
        }
      }
      if (errorMessage) {
        dispatch(actions.ui.setStatus('error', true, errorMessage));
      }
    });
  };
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
        <AdContainer>
          <AdHeader>
            {tempImages.length !== 0 &&
              tempImages.map(image => (
                <AddedImage key={image.id} source={{ uri: image.url }} />
              ))}
            {tempImages.length != 3 && (
              <AddImage onPress={handleImagePicker}>
                <Icon name={'image-plus'} size={30} />
              </AddImage>
            )}
          </AdHeader>
          <AdHeaderBottom>
            {/* Render later from available category/subcategory lists */}
            <DatePicker />
          </AdHeaderBottom>

          <Formik
            initialValues={{
              price: '',
              description: '',
            }}
            enableReinitialize
            validationSchema={validator.ad}
            onSubmit={({ price, description }) =>
              handleAdSubmit(price, description)
            }>
            {({ errors, values, handleChange, handleSubmit, touched }) => (
              <AdDescriptionWrap>
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
            )}
          </Formik>
        </AdContainer>
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
  padding: 10px;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom-width: 1px;
`;

const AdHeaderBottom = styled.View`
  flex: 0.1;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
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

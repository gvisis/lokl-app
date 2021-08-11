//!
//! Stilius pasirinkimo kitoks emuliatoriuj
//!

import React, { useEffect, useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  Keyboard,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';

import { Container } from '../../components';
import { api } from '../../api';
import { actions } from '../../state/actions';
import { validator } from '../../utils/validators';

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
  const [price, setPrice] = useState(null);
  const [subCategoryPicker, setSubCategoryPicker] = useState<string>(null);
  const [categoryPicker, setCategoryPicker] = useState<string>(null);
  const [userAd, setUserAd] = useState<UserAd>(null);

  const options = {
    mediaType: 'photo',
    quality: 1,
    maxWidth: 800,
    maxHeight: 600,
  };
  // const uploadToStorage = async (uri: string, id: string) => {
  //   const newImageName = `adImage_${new Date().getTime()}`;
  //   const reference = await storage().ref(
  //     'images/ads/' + id + '/' + newImageName,
  //   );
  //   // path to existing file on filesystem

  //   const task = reference.putFile(uri);
  //   task.on('state_changed', taskSnapshot => {
  //     console.log(
  //       `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
  //     );
  //   });

  //   task.then(() => {
  //     console.log('Image uploaded to the bucket!');
  //   });
  // };

  const uploadImagesToStorage = tempImages => {
    if (tempImages.length != 0) {
      tempImages.map(async tempImage => {
        const newImageName = `adImg_${tempImage.id}`;
        const reference = await storage().ref(
          'images/ads/' + userAd.id + '/' + newImageName,
        );
        // path to existing file on filesystem

        const task = reference.putFile(tempImage.url);
        task.on('state_changed', taskSnapshot => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });

        task.then(() => {
          console.log('Image uploaded to the bucket!');
        });
      });
    }
  };

  useEffect(() => {
    setUserAd({ ...userAd, id: Math.floor(Math.random() * 999999).toString() });
    console.log('effect', userAd);
  }, []);
  useEffect(() => {
    console.log('userAd', userAd);
  }, [userAd]);

  const handleImagePicker = () => {
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
          console.log(e);
        }
      }
      if (errorMessage) {
        console.log(errorMessage);
      }
    });
  };

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
  //-=================array.forEach(element => {

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
            <RNPickerSelect
              placeholder={{
                label: 'Category',
                value: null,
                color: 'orange',
              }}
              items={[
                {
                  label: '1',
                  value: 1,
                  color: 'white',
                },
                {
                  label: '2',
                  value: 2,
                  color: 'white',
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
                color: 'orange',
              }}
              items={[
                {
                  label: '3',
                  value: 3,
                  color: 'white',
                },
                {
                  label: '4',
                  value: 4,
                  color: 'white',
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
                  backgroundColor: 'red',
                },
              }}
              value={subCategoryPicker}
              Icon={() => <Icon name="menu-down" size={40} />}
            />
          </AdHeaderBottom>

          <Formik
            initialValues={{
              price: '',
              description: '',
            }}
            enableReinitialize
            validationSchema={validator.ad}
            onSubmit={({ price, description }) => {
              setUserAd({
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
                  name: 'gvidas',
                  email: api.getUserInfo().email,
                  city: 'vilnius',
                },
              });
              uploadImagesToStorage(tempImages);
            }}>
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
                  <Button onPress={showDatepicker} title="Show date picker!" />
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
                <Button title={'add'} onPress={handleSubmit} />
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

const AdPrice = styled.Text`
  color: red;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
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

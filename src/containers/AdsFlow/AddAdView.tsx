import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';

import { Container } from '../../components';
import { api } from '../../api';
import { actions } from '../../state/actions';

export const AddAdView: React.FC = () => {
  const dispatch = useDispatch();
  const [imgUri, setImgUri] = React.useState([]);

  const options = {
    mediaType: 'photo',
    quality: 1,
    maxWidth: 800,
    maxHeight: 600,
  };

  const handleImagePicker = () => {
    launchImageLibrary(options, ({ didCancel, errorMessage, assets }) => {
      if (didCancel) {
        dispatch(
          actions.ui.setStatus('error', true, 'User cancelled image picker'),
        );
      }
      if (assets) {
        try {
          setImgUri(imgUri => [
            ...imgUri,
            {
              uri: assets[0].uri,
              id: assets[0].uri.split('temp_')[1].split('.jpg')[0],
              uploadedBy: api.getUserInfo().uid,
              advertId: Math.floor(Math.random() * 100000),
            },
          ]);
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

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <AdContainer>
          <AdHeader>
            {imgUri.length !== 0 &&
              imgUri.map(image => (
                <AddedImage key={image.id} source={{ uri: image.uri }} />
              ))}
            {imgUri.length != 3 && (
              <AddImage onPress={handleImagePicker}>
                <Icon name={'image-plus'} size={30} />
              </AddImage>
            )}
          </AdHeader>
          <AdHeaderBottom>
            <RNPickerSelect
              onValueChange={value => console.log(value)}
              items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
              ]}
            />
          </AdHeaderBottom>
          <AdDescriptionWrap>
            <AdDescription multiline />
          </AdDescriptionWrap>
        </AdContainer>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const AdContainer = styled.View`
  flex: 1;
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
  justify-content: space-between;
  align-items: center;
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
  height: 200px;
  color: black;
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  border-bottom-width: 2px;
  text-align-vertical: top;
`;

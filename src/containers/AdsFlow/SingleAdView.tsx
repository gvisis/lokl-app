import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { Container, ProfileRow } from '../../components';
import { getDateFromString } from '../../utils/functions';
import { useFunction } from '../../utils/hooks';

export const SingleAdView: React.FC = () => {
  const [messageSent, setMessageSent] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();

  const { item } = params;

  useEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [item.title]);

  const getImageObject = images => {
    const imgArray = [];
    for (const key in images) {
      imgArray.push({ id: key, url: images[key] });
    }
    return imgArray;
  };
  const images = item.images && getImageObject(item.images);
  const handleSend = useFunction(setMessageSent, true);

  return (
    <Container>
      <AdHeader
        dot={<InactiveDot />}
        activeDot={<ActiveDot />}
        loadMinimalLoader={<ActivityIndicator />}
        bounces
        loop>
        {images ? (
          images.map(image => (
            <AdImage key={image.id} source={{ uri: image.url }} />
          ))
        ) : (
          <AdImage source={{ uri: item.image }} />
        )}
      </AdHeader>
      <AdMidWrap showsVerticalScrollIndicator={false}>
        <TitleWrap>
          <AdStyledText>{item.title}</AdStyledText>
          <DateAdded>Added: {getDateFromString(item.dateAdded)}</DateAdded>
        </TitleWrap>
        <ProfileRow
          text={'I can pay up to:'}
          touchable
          rowRight={<AdPrice>€ {item.price}</AdPrice>}
        />

        <ProfileRow
          text={'Need it by:'}
          touchable
          rowRight={<AdPrice>{item.dateRequired}</AdPrice>}
        />
        <AdDescription>{item.description}</AdDescription>
        <AdFooterWrap>
          {!messageSent ? (
            <MessageToOwner>
              <ProfileRow
                multiline
                editable
                placeholder={'Send "owner" a message about this ad'}
              />
              <SendButton onPress={handleSend}>
                <StyledText>Send</StyledText>
              </SendButton>
            </MessageToOwner>
          ) : (
            <SentMessageBox>Message successfully sent to owner!</SentMessageBox>
          )}
        </AdFooterWrap>
      </AdMidWrap>
    </Container>
  );
};

const AdHeader = styled(Swiper).attrs({
  containerStyle: {
    flex: 0.5,
  },
})`
  background-color: ${({ theme }) => theme.colors.primary};
`;

const AdMidWrap = styled.ScrollView`
  flex: 1;
`;

// AD TITLE AND DATE START
const AdStyledText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.xxl}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  letter-spacing: 0.5px;
`;

const TitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 5px;
`;

const DateAdded = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  color: ${({ theme }) => theme.colors.primary};
`;
// AD TITLE AND DATE END

const AdPrice = styled(AdStyledText)`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  padding: 0px 10px 5px;
`;

const AdDescription = styled.Text`
  color: red;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  margin: 0 10px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  padding: 15px;
`;

// AD FOOTER START
const AdFooterWrap = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px 0;
  elevation: 1;
`;

const MessageToOwner = styled.View`
  align-items: center;
`;

const SendButton = styled.TouchableOpacity`
  border-radius: ${({ theme }) => theme.border.radius10}px;
  align-self: flex-end;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  padding: 10px 20px;
`;

const SentMessageBox = styled.Text`
  height: 80px;
  border-width: 1px;
  text-align: center;
  text-align-vertical: center;
  border-radius: ${({ theme }) => theme.border.radius5}px;
  border-color: ${({ theme }) => theme.colors.primary1};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  color: ${({ theme }) => theme.colors.primary3};
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  padding: 10px;
  margin: 15px;
`;

// AD FOOTER END

// SWIPER
const AdImage = styled.Image`
  flex: 1;
`;

const ActiveDot = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-left: 3px;
  margin-right: 3px;
`;

const InactiveDot = styled(ActiveDot)`
  background-color: ${({ theme }) => theme.colors.white};
`;
// SWIPER END

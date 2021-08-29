import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';

import { Container, ProfileRow } from '../../components';
import { getDateFromString, getImagesFromObject } from '../../utils/functions';
import { useFunction } from '../../utils/hooks';

export const SingleAdView: React.FC = () => {
  const [messageSent, setMessageSent] = useState(false);
  const { params } = useRoute();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { item } = params;

  useEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [item.title]);

  const images = item.images && getImagesFromObject(item);
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
          text={t('ads:payUpTo')}
          touchable
          rowRight={<AdPrice>€ {item.price}</AdPrice>}
        />

        <ProfileRow
          text={t('ads:needBy')}
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
                placeholder={t('ads:sendMessage')}
              />
              <SendButton onPress={handleSend}>
                <StyledText>{t('common:send')}</StyledText>
              </SendButton>
            </MessageToOwner>
          ) : (
            <SentMessageBox>{t('ads:messageSuccess')}</SentMessageBox>
          )}
        </AdFooterWrap>
      </AdMidWrap>
    </Container>
  );
};

const padding10 = { padding: '10px 0' };
const AdHeader = styled(Swiper).attrs({
  containerStyle: {
    flex: 0.5,
  },
})`
  background-color: ${({ theme }) => theme.colors.primary};
`;

const AdMidWrap = styled.ScrollView`
  flex: 1;
  padding: 0 10px;
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
  ${padding10};
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
`;

const AdDescription = styled.Text`
  color: red;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  margin: 0 10px;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
  ${padding10}
`;

// AD FOOTER START
const AdFooterWrap = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  ${padding10}
  elevation: 1;
  margin: 0 10px;
  border-radius: ${({ theme }) => theme.border.radius5}px;
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
  margin: 15px;
  ${padding10}
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

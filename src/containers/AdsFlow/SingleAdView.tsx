import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { css, useTheme } from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';

import { ProfileRow, ScreenLoader } from '../../components';
import {
  getDateFromString,
  getFormatedPrice,
  getImagesFromObject,
} from '../../utils/functions';
import { useFunction } from '../../utils/hooks';
import { firebaseDb } from '../../api/firebaseDb';
import { AdsProps } from '../../state/app/AppInterfaces';

export const SingleAdView: React.FC = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [adOwner, setAdOwner] = useState(null);
  const { params } = useRoute();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme();

  //TODO: bad navigation logic, needs to be fixed, as it is not working  properly from diferent navigators
  const { item } = params;

  const images = item.images && getImagesFromObject(item);
  const handleSend = useFunction(setMessageSent, true);

  useEffect(() => {
    navigation.setOptions({ title: item.title });
  }, [item.title]);

  useEffect(() => {
    const getAdOwner = async (item: AdsProps) => {
      const { ownerId } = item;
      const user = await firebaseDb.fetchAdOwnerDetails(ownerId);
      setAdOwner(user);
    };
    getAdOwner(item);
  }, []);

  return (
    <AdContainerWrapper>
      {!adOwner ? (
        <ScreenLoader size={50} color={theme.colors.secondary} />
      ) : (
        <>
          <AdHeader
            dot={<InactiveDot />}
            activeDot={<ActiveDot />}
            loadMinimalLoader={<ActivityIndicator />}
            bounces
            loop
          >
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
              <DateAdded>
                {t('ads:added')} {getDateFromString(item.dateAdded)}
              </DateAdded>
            </TitleWrap>
            <ProfileRow
              text={t('ads:payUpTo')}
              touchable
              textSize={theme.fonts.size.m}
              rowRight={<AdPrice>{getFormatedPrice(item.price)}</AdPrice>}
            />
            <ProfileRow
              text={t('ads:needBy')}
              touchable
              textSize={theme.fonts.size.m}
              rowRight={
                <AdPrice>{getDateFromString(item.dateRequired)}</AdPrice>
              }
            />
            <AdDescription>{item.description}</AdDescription>
            <AdFooterWrap>
              <OwnerDetails>
                <OwnerTitle>{t('ads:owner')}</OwnerTitle>
                <OwnerRow>
                  <OwnerDetailsText>{adOwner.username}</OwnerDetailsText>
                  <OwnerDetailsText>
                    {t('profile:phone')}: {adOwner.phone}
                  </OwnerDetailsText>
                </OwnerRow>
              </OwnerDetails>
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
        </>
      )}
    </AdContainerWrapper>
  );
};
const OwnerDetails = styled.View`
  margin: 10px 0;
`;

const OwnerTitle = styled.Text`
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
  letter-spacing: 1px;
  margin-bottom: 10px;
`;
const OwnerRow = styled.View``;

const OwnerDetailsText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  color: ${({ theme }) => theme.colors.secondary};
  margin: 10px 10px 0 0;
`;

const padding10 = { padding: '10px 0' };
const AdContainerWrapper = styled.View`
  flex: 1;
`;
const AdHeader = styled(Swiper).attrs({
  containerStyle: {
    flex: 0.5,
  },
})`
  background-color: ${({ theme }) => theme.colors.background};
  elevation: 1;
`;

const AdMidWrap = styled.ScrollView.attrs({ flex: 1 })`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 10px;
`;

const AdStyledText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.xxl}px;
  font-family: ${({ theme }) => theme.fonts.family.bentonMedium};
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
const AdPrice = styled(AdStyledText)`
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
`;

const borderStyle = css`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.lightGrey1};
`;

const AdDescription = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.family.benton};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  margin: 0 10px;
  ${borderStyle};
  padding: 15px 0;
`;

const AdFooterWrap = styled.View`
  flex: 1;
  margin: 0 10px;
  ${padding10}${borderStyle};
`;

const MessageToOwner = styled.View`
  align-items: center;
  ${borderStyle};
  padding-top: 10px;
`;

const SendButton = styled.TouchableOpacity`
  border-radius: ${({ theme }) => theme.border.radius10}px;
  align-self: flex-end;
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.s}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
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
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.family.nexaBold};
  margin: 15px;
  ${padding10}
`;

// SWIPER
const AdImage = styled.Image`
  flex: 1;
  resize-mode: cover;
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

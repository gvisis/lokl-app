import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { useFunction } from '../../utils/hooks';
import { actions } from '../../state/actions';
import { Container, CustomBtn, HomeHeader } from '../../components';

export const ProduceView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogout = useFunction(dispatch, actions.user.logout());

  return (
    <Container>
      <HomeHeader title={'Find your produce'} />
      {/* <Produce /> */}
      {/* <Sellers /> */}
      {/* <PopularItems /> */}
      {/* <Ads /> */}

      <ButtonWrap>
        <CustomBtn
          label={t('login:logout')}
          secondary
          center
          activeOpacity={0.5}
          onPress={handleLogout}
        />
      </ButtonWrap>
    </Container>
  );
};

const ButtonWrap = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

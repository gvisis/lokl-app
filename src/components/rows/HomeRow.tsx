import React from 'react';
import styled from 'styled-components/native';
// import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

interface RowProps {
  title: string;
}

export const HomeRow: React.FC<RowProps> = ({ title, children }) => {
  const { t } = useTranslation();

  return (
    <RowContainer>
      <TitleWrap>
        <RowTitle>{title}</RowTitle>
        {/* <TouchableOpacity onPress={() => console.warn(title)}>
          <MoreText>{t('home:viewMore')}</MoreText>
        </TouchableOpacity> */}
      </TitleWrap>
      <RowWrap>{children}</RowWrap>
    </RowContainer>
  );
};

const RowContainer = styled.View`
  width: 100%;
  flex: 1;
  margin-bottom: 10px;
  z-index: -1;
`;

const TitleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
`;

const RowTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
`;

const MoreText = styled.Text`
  color: ${({ theme }) => theme.colors.secondary2};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
`;

const RowWrap = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

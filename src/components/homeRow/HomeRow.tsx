import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface RowProps {
  title: string;
}

export const HomeRow: React.FC<RowProps> = ({ title, children }) => (
  <RowContainer>
    <TitleWrap>
      <RowTitle>{title}</RowTitle>
      <TouchableOpacity onPress={() => console.warn(title)}>
        <MoreText>View more</MoreText>
      </TouchableOpacity>
    </TitleWrap>
    <RowWrap>{children}</RowWrap>
  </RowContainer>
);

const RowContainer = styled.View`
  width: 100%;
  padding: 10px;
  flex: 1;
  margin-bottom: 10px;
`;

const TitleWrap = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-top-left-radius: ${({ theme }) => theme.border.radius10}px;
  border-top-right-radius: ${({ theme }) => theme.border.radius10}px;
`;

const RowTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
`;
const MoreText = styled.Text`
  color: ${({ theme }) => theme.colors.primary3};
  font-family: ${({ theme }) => theme.fonts.family.bentonLight};
`;
const RowWrap = styled.View`
  padding: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

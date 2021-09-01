import React from 'react';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';

interface EmptyViewProps {
  text?: string;
}

export const EmptyView: React.FC<EmptyViewProps> = ({ text }) => {
  const { t } = useTranslation();

  return <NoItemsText>{text ? text : t('common:noItems')}</NoItemsText>;
};

const NoItemsText = styled.Text`
  align-self: center;
  font-size: ${({ theme }) => theme.fonts.size.xl}px;
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  margin-top: 30px;
  text-align: center;
  padding: 30px;
  width: 80%;
  color: ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.border.radius25}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
`;

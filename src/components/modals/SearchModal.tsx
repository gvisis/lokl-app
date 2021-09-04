import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import styled, { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as _ from 'lodash';

import {
  getProductOwnerTitle,
  getSearchFilteredResults,
} from '../../utils/functions';
import { ROUTES } from '../../routes/RouteNames';

export const SearchModal: React.FC = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [focused, setFocused] = useState(false);

  const { allCompanies, allAppAds, allProducts } = useSelector(
    state => state.app,
  );
  const { t } = useTranslation();
  const theme = useTheme();
  const { navigate } = useNavigation();

  useEffect(
    useCallback(() => {
      const filteredResults = getSearchFilteredResults(
        allProducts,
        allCompanies,
        allAppAds,
        searchValue,
      );
      setSearchResults(filteredResults);
    }, [searchValue]),
    [allProducts, allCompanies, allAppAds, searchValue],
  );

  const handleSearchResultNavigate = useCallback(
    item => {
      handleSearchFocus();
      if (_.hasIn(item, 'website')) {
        navigate(ROUTES.SingleCompany, { companyItem: item });
      } else if (_.hasIn(item, 'amount')) {
        const productOwnerTitle: string = getProductOwnerTitle(
          allCompanies,
          item,
        );
        navigate(ROUTES.SingleProduct, {
          item,
          productOwnerTitle,
        });
      } else {
        navigate(ROUTES.SingleAdView, { item });
      }
    },
    [navigate, focused],
  );

  const handleChangeText = useCallback(
    text => {
      setSearchValue(text);
    },
    [searchValue],
  );
  const handleSearchFocus = useCallback(() => {
    setFocused(!focused);
  }, [focused]);

  return (
    <>
      <SearchRow isFocused={focused}>
        <SearchBar
          placeholder={t('home:searchBar')}
          placeholderTextColor={theme.colors.lightGrey1}
          onChangeText={handleChangeText}
          onPressIn={handleSearchFocus}
        />
        <IconWrap>
          <FilterSort name="magnify" size={30} color={theme.colors.tertiary} />
        </IconWrap>
      </SearchRow>
      {focused && (
        <Modal
          isVisible={focused}
          backdropColor={theme.colors.background}
          backdropOpacity={1}
          onBackButtonPress={handleSearchFocus}
        >
          <ModalClose onPress={handleSearchFocus}>
            <Icon name="close" size={30} color={theme.colors.secondary} />
          </ModalClose>
          <ModalContent>
            <SearchRow isFocused={focused}>
              <SearchBar
                placeholder={t('home:searchBar')}
                placeholderTextColor={theme.colors.lightGrey1}
                onChangeText={handleChangeText}
                autoFocus={focused}
              />
              <IconWrap>
                <FilterSort
                  name="magnify"
                  size={30}
                  color={theme.colors.tertiary}
                />
              </IconWrap>
            </SearchRow>
            {searchResults &&
              searchResults.map(result => (
                <TouchableOpacity
                  onPress={() => handleSearchResultNavigate(result)}
                  key={result.id}
                >
                  <SearchResult>{result.title}</SearchResult>
                </TouchableOpacity>
              ))}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

const SearchResult = styled.Text<{ height?: number }>`
  padding: 10px;
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.lightGrey2};
  font-size: ${({ theme }) => theme.fonts.size.m}px;
  color: ${({ theme }) => theme.colors.secondary};
  border-right-width: 3px;
  border-right-color: ${({ theme }) => theme.colors.secondary2};
  font-family: ${({ theme }) => theme.fonts.family.nexaLight};
  letter-spacing: 1px;
`;

const ModalContent = styled.ScrollView.attrs({ flex: 1 })`
  margin-top: 40px;
`;

const ModalClose = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const SearchRow = styled.TouchableOpacity<{ isFocused: boolean }>`
  width: 100%;
  padding: 5px;
  border-radius: ${({ theme }) => theme.border.radius5}px;
  flex-direction: row;
  margin-top: 20px;
  border-width: 1px;
  border-color: ${({ theme, isFocused }) =>
    isFocused ? theme.colors.secondary : theme.colors.lightGrey1};
`;

const SearchBar = styled.TextInput`
  flex: 3;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.size.l}px;
  font-family: ${({ theme }) => theme.fonts.family.benton};
  border-color: ${({ theme }) => theme.colors.tertiary2};
  letter-spacing: 1px;
  border-right-width: 1px;
`;

const FilterSort = styled(Icon)`
  color: ${({ theme }) => theme.colors.tertiary2};
`;

const IconWrap = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 0.6;
  margin: 5px;
`;

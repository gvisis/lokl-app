import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';

const StyledContainer = styled.View`
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;
export const InputContainer = ({ children, style }) => (
  <StyledContainer style={style}>{children}</StyledContainer>
);

InputContainer.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
};

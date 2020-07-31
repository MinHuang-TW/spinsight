import React from 'react';
import { colors } from '../util/theme';
import styled from 'styled-components';

const TopBar = ({ height }) => (
  <ColorBar height={height ? height : '0.5rem'}>
    {colors.map((color) => (
      <Block key={color} color={color} />
    ))}
  </ColorBar>
);

export default TopBar;

const ColorBar = styled.span`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: ${(props) => props.height};
`;

const Block = styled.span`
  background: ${(props) => props.color};
`;

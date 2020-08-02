import React from 'react';
import TopBar from './TopBar';
import styled from 'styled-components';

const Layout = ({ barHeight, width, margin, children }) => (
  <>
    <TopBar height={barHeight} />
    <Main width={width} margin={margin}>
      {children}
    </Main>
  </>
);

export default Layout;

const Main = styled.main`
  position: relative;
  margin: ${(props) => props.margin || 'auto'};
  width: ${(props) => props.width || '100%'};
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

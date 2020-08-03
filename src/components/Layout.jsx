import React from 'react';
import TopBar from './TopBar';
import styled from 'styled-components';

const Layout = ({ barHeight, width, margin, children }) => (
  <Window>
    <TopBar height={barHeight} />
    <Main width={width} margin={margin}>
      {children}
    </Main>
  </Window>
);

export default Layout;

const Window = styled.div`
  /* width: 100vw; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f1f1;
`;

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
  text-align: center;
  color: ${(props) => props.theme.secondary};
`;

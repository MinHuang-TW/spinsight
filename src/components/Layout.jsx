import React from 'react';
import TopBar from './TopBar';
import styled from 'styled-components';

const Layout = ({
  barHeight,
  width,
  maxWidth,
  margin,
  children,
  height,
  overflow = null,
}) => (
  <Window>
    <TopBar height={barHeight} />
    <Main
      width={width}
      maxWidth={maxWidth}
      margin={margin}
      height={height}
      overflow={overflow}
    >
      {children}
    </Main>
  </Window>
);

export default Layout;

const Window = styled.div`
  height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  background: #f0f1f1;
`;

const Main = styled.main`
  position: relative;
  margin: ${(props) => props.margin || 'auto'};
  width: ${(props) => props.width || '100%'};
  max-width: ${(props) => props.maxWidth || '548px'};
  height: ${(props) => props.height || '100%'};
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  color: ${(props) => props.theme.secondary};
  overflow-y: ${(props) => props.overflow && 'scroll'};
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

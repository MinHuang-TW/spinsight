import React from 'react';
import TopBar from './TopBar';
import styled from 'styled-components';

const Layout = ({ barHeight, children }) => {
  return (
    <>
      <TopBar height={barHeight} />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

const Main = styled.main`
  width: 100%;
  max-width: 600px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

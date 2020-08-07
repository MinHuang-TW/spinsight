import React from 'react';
import styled, { keyframes } from 'styled-components';

const Progress = ({ login, nobg }) => (
  <>
    {nobg ? (
      <ElementContainer>
        <Element>
          <div>
            <div>
              <div />
            </div>
            <div>
              <div />
            </div>
            <div>
              <div />
            </div>
            <div>
              <div />
            </div>
          </div>
        </Element>
      </ElementContainer>
    ) : (
      <Container login={login}>
        <ElementContainer>
          <Element>
            <div>
              <div>
                <div />
              </div>
              <div>
                <div />
              </div>
              <div>
                <div />
              </div>
              <div>
                <div />
              </div>
            </div>
          </Element>
        </ElementContainer>
      </Container>
    )}
  </>
);

export default Progress;

const Container = styled.section`
  position: absolute;
  width: 100vw;
  height: ${(props) =>
    props.login ? 'calc(100vh - 6.5rem)' : 'calc(100vh - 0.5rem)'};
  background: rgba(240, 241, 241, 0.8);
  --webkit-backdrop-filter: blur(1.5px);
  backdrop-filter: blur(1.5px);
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ElementContainer = styled.div`
  width: 40px;
  height: 40px;
  display: inline-block;
  overflow: hidden;
  background: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const spin = keyframes` {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`;

const Element = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.4);
  backface-visibility: hidden;
  transform-origin: 0 0;

  div {
    box-sizing: content-box;
  }

  > div > div {
    transform-origin: 50px 50px;
    animation: ${spin} 3.0303030303030303s linear infinite;
    opacity: 1;
  }
  > div > div > div {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 50px;
    height: 50px;
    border-radius: 50px 0 0 0;
    transform-origin: 50px 50px;
  }
  > div div:nth-child(1) {
    animation-duration: 0.7575757575757576s;
  }
  > div div:nth-child(1) > div {
    background: #d53d4e;
    transform: rotate(0deg);
  }
  > div div:nth-child(2) {
    animation-duration: 1.0101010101010102s;
  }
  > div div:nth-child(2) > div {
    background: #f2b632;
    transform: rotate(0deg);
  }
  > div div:nth-child(3) {
    animation-duration: 1.5151515151515151s;
  }
  > div div:nth-child(3) > div {
    background: #b6bf26;
    transform: rotate(0deg);
  }
  > div div:nth-child(4) {
    animation-duration: 3.0303030303030303s;
  }
  > div div:nth-child(4) > div {
    background: #457697;
    transform: rotate(0deg);
  }
`;

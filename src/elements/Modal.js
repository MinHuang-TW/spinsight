import styled, { css } from 'styled-components';

export default styled.div`
  position: absolute;
  width: 90%;
  max-width: 360px;
  background: white;
  padding-top: ${(props) => props.padding || '2.5rem'};
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top};
  z-index: 5;

  ${(props) =>
    props.long &&
    css`
      bottom: 0px;
      border-radius: '0.5rem 0.5rem 0 0';
      transform: translate(-50%, 0%);
    `}
`;

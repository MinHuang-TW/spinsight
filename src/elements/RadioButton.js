import styled from 'styled-components';

export default styled.button`
  width: ${(props) => props.size || '4rem'};
  height: ${(props) => props.size || '4rem'};
  border-radius: 50%;
  background: ${(props) => props.background || '#fff'};
  color: ${(props) => props.theme.secondary};
  font-size: 1rem;
  padding: 0px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &::after {
    content: '';
    width: 90%;
    height: 90%;
    border-radius: 50rem;
    box-sizing: border-box;
    border: 2px solid #9b9b9b;
    opacity: ${(props) => (props.border ? 0.3 : 0)};
    position: absolute;
  }
`;

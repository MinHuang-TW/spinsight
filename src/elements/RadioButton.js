import styled from 'styled-components';

export default styled.button`
  width: ${(props) => (props.size ? props.size : '4rem')};
  height: ${(props) => (props.size ? props.size : '4rem')};
  border-radius: 50rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background: ${(props) => (props.color ? props.color : '#fff')};
  color: ${(props) => props.theme.secondary};
  font-size: 1rem;
  padding: 0px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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

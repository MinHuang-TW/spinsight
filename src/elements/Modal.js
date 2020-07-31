import styled from 'styled-components';

export default styled.div`
  position: absolute;
  width: 90%;
  background: white;
  padding: ${(props) => props.padding};
  border-radius: ${(props) => (props.long ? '0.5rem 0.5rem 0 0' : '0.5rem')};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top};
  bottom: ${(props) => props.long && 0};
  z-index: 5;
`;

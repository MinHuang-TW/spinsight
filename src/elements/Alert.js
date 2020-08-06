import styled, { keyframes } from 'styled-components';

const showup = keyframes`
  0% { 
    height: 0px;
    opacity: 0;
  }
  100% { 
    height : 3rem; 
    opacity: 1;
  }
`;

export default styled.small`
  background: ${(props) => props.theme.appearance};
  color: white;
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
  position: absolute;
  top: 0;
  --webkit-animation: ${showup} 0.2s ease-in-out;
  animation: ${showup} 0.2s ease-in-out;
`;

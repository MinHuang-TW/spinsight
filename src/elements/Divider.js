import styled from 'styled-components';

export default styled.hr`
  margin: 0px;
  width: 100%;
  border-width: 0px;
  height: 1px;
  background: ${(props) => props.theme.secondary};
  opacity: 0.5;
  margin: 1rem auto;
`;

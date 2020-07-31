import styled from 'styled-components';

export default styled.h1`
  color: ${(props) => props.theme.secondary};
  font-size: 1.75rem;
  font-weight: 200;
  margin: 4rem auto 0;
  text-transform: capitalize;
`;

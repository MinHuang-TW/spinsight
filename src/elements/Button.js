import styled from 'styled-components';

export default styled.button`
  display: inline-block;
  background: ${(props) => props.theme.primary};
  width: ${(props) => props.fullWidth && '100%'};
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  box-shadow: none;
  border-radius: 5rem;
  padding: 0.75rem 4rem;
  margin: auto;
  margin-bottom: ${(props) => props.gutterBottom && '1rem'};
`;

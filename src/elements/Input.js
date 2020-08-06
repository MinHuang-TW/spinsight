import styled from 'styled-components';

export default styled.input`
  width: 100%;
  height: ${(props) => props.height && props.height};
  padding: 0.25rem 0.5rem;
  color: ${(props) => props.theme.secondary};
  font-size: 1rem;
  border: 0.5px solid #9f9f9f;
  box-sizing: border-box;
  --webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.secondary} !important;
  }

  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
`;

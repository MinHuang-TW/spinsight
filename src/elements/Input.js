import styled from 'styled-components';

export default styled.input`
  width: 100%;
  padding: 0.25rem 0.5rem;
  color: ${(props) => props.theme.secondary};
  background: white;
  font-size: 1rem;
  border: 0.5px solid #9f9f9f;
  box-sizing: border-box;

  &::placeholder,
  &::-webkit-input-placeholder {
    opacity: 0.3;
  }
  &:-ms-input-placeholder {
    opacity: 0.3;
  }
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.secondary} !important;
  }
`;

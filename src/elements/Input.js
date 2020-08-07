import styled from 'styled-components';

export default styled.input`
  height: ${(props) => props.height && props.height};
  color: ${(props) => props.theme.secondary};

  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.secondary} !important;
  }

  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
`;

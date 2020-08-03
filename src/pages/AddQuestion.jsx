import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import Button from '../elements/Button';
import styled from 'styled-components';

const AddQuestion = ({ name }) => {
  const [checked, setChecked] = useState(false);
  const [submited, setSubmited] = useState(false);

  const handleCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  const handleCancel = useCallback(({ target }) => {
    if (target.tagName !== 'SECTION') return;
    setSubmited(false);
  }, []);

  return (
    <Layout>
      <Popup category='OK' open={submited} handleCancel={handleCancel}>
        <h2 style={{ margin: '32px auto 48px' }}>
          You have submitted your question successfully.
        </h2>
      </Popup>

      <h1>
        {submited ? 'Good job' : 'Hello'}, {name} !
      </h1>

      <Container>
        <h2>What would you like to ask your colleagues ?</h2>
        <Main>
          <QuestionInput placeholder='Ask a Question...' />
          <Checkbox>
            <input type='checkbox' checked={checked} onChange={handleCheck} />
            <Checkmark />
            Delete the question after 1 day
          </Checkbox>
        </Main>
        <Button disabled>submit</Button>
      </Container>

      <Navbar />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  name: state.user.credentials.name,
});

export default connect(mapStateToProps)(AddQuestion);

const Container = styled.section`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  ${Button} {
    margin: 0px;
  }
`;

const Main = styled.div`
  width: 100%;
  height: 32.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  border: 0.5px solid #9f9f9f;
  color: ${(props) => props.theme.secondary};
  box-sizing: border-box;
  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.secondary} !important;
  }
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.secondary};
  &::after {
    content: '';
    position: absolute;
    display: block;
    left: 8px;
    top: 4px;
    width: 5px;
    height: 10px;
    border: solid ${(props) => props.theme.secondary};
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Checkbox = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 0.85rem;
  line-height: 24px;
  color: ${(props) => props.theme.secondary};
  margin-top: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ ${Checkmark} {
      background: ${(props) => props.theme.primary};
      border: 1px solid ${(props) => props.theme.primary};
    }
    &:checked ~ ${Checkmark}::after {
      border-color: white;
    }
  }
`;

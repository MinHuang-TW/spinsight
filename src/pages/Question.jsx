import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { postQuestion, clearErrors } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Popup from '../components/Popup';
import Progress from '../components/Progress';
import Button from '../elements/Button';
import styled from 'styled-components';

const Question = ({
  postQuestion,
  clearErrors,
  name,
  UI: { loading, errors },
}) => {
  const [category, setCategory] = useState('permanent');
  const [question, setQuestion] = useState('');
  const [submited, setSubmited] = useState(false);

  const handleCheck = useCallback(() => {
    category === 'permanent'
      ? setCategory('limited')
      : setCategory('permanent');
  }, [category]);

  const handleChange = useCallback(({ target: input }) => {
    setQuestion(input.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const newQuestion = { category, question };
      postQuestion(newQuestion);
      if (!errors && !loading) setSubmited(true);
    },
    [postQuestion, question, category, errors, loading]
  );

  const handleCancel = useCallback(({ target }) => {
    if (target.tagName !== 'SECTION') return;
    setSubmited(false);
  }, []);

  useEffect(() => {
    if (!submited) return;
    setCategory('permanent');
    setQuestion('');
    errors && clearErrors();

    const timer = setTimeout(() => setSubmited(false), 1600);
    return () => clearTimeout(timer);
  }, [submited, clearErrors, errors]);

  return (
    <Layout>
      {loading ? (
        <Progress bottom />
      ) : (
        <Popup category='OK' open={submited} handleCancel={handleCancel}>
          <Text>You have submitted your question successfully.</Text>
        </Popup>
      )}

      <Title>Hello, {name} !</Title>
      <Container>
        <h2>What would you like to ask your colleagues ?</h2>
        <Form onSubmit={handleSubmit}>
          <QuestionInput value={question} onChange={handleChange} />
          <Checkbox>
            <input
              type='checkbox'
              checked={category === 'limited'}
              onChange={handleCheck}
            />
            <Checkmark />
            Delete the question after 1 day
          </Checkbox>
        </Form>
        <Button
          type='submit'
          form='questionForm'
          disabled={loading || question.trim() === ''}
        >
          submit
        </Button>
      </Container>

      <Navbar />
    </Layout>
  );
};

Question.propTypes = {
  postQuestion: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state) => ({
  name: state.user.credentials.name,
  UI: state.UI,
});

const mapActionsToProps = {
  postQuestion,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(Question);

const Container = styled.section`
  width: 75%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  h2 {
    margin-bottom: 2.5rem;
  }
  ${Button} {
    margin: 3rem auto 0;
  }
`;

const Title = styled.h1`
  margin-top: 4rem;
`;

const Text = styled.h2`
  margin: 32px auto 48px;
`;

const Form = styled.form.attrs({
  id: 'questionForm',
})`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionInput = styled.textarea.attrs({
  form: 'questionForm',
  name: 'question',
  placeholder: 'Ask a Question...',
  autoFocus: true,
})`
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

  &:focus {
    border-color: ${(props) => props.theme.primary};
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

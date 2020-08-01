import React from 'react';
import Modal from '../elements/Modal';
import {
  appearance,
  belongings,
  character,
  life,
  limited,
  permanent,
  warning,
  OK,
} from '../images/category';
import styled from 'styled-components';

const Popup = ({ category, children, handleCancel }) => {
  const fetchIcon = (category) => {
    switch (category) {
      case 'appearance':
        return appearance;
      case 'belongings':
        return belongings;
      case 'character':
        return character;
      case 'life':
        return life;
      case 'limited':
        return limited;
      case 'permanent':
        return permanent;
      case 'OK':
        return OK;
      case 'warning':
        return warning;

      default:
        break;
    }
  };

  return (
    <Container onClick={handleCancel}>
      <Modal top='50%'>
        <Icon>
          <img src={fetchIcon(category)} alt='icon' />
        </Icon>
        {children}
      </Modal>
    </Container>
  );
};

export default Popup;

const Container = styled.section`
  width: 100%;
  height: calc(100vh - 0.5rem);
  background: rgba(240, 241, 241, 0.8);
  --webkit-backdrop-filter: blur(1.5px);
  backdrop-filter: blur(1.5px);
  position: absolute;
  z-index: 999;
`;

const Icon = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  position: relative;
  margin-top: -5rem;
  z-index: 10;
  img {
    width: 100%;
  }
`;

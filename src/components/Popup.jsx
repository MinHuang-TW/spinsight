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

const Popup = ({ category, children, handleCancel, open }) => {
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
    <Container open={open} onClick={handleCancel}>
      <PopupModal open={open}>
        <Icon>
          <img src={fetchIcon(category)} alt='icon' />
        </Icon>
        {children}
      </PopupModal>
    </Container>
  );
};

export default Popup;

const PopupModal = styled(Modal)`
  top: 50%;
  transform: translate(-50%, -50%);
  transform: ${(props) =>
    props.open
      ? 'translate(-50%, -50%) scale(1)'
      : 'translate(-50%, -50%) scale(0)'};
  transition: transform 0.2s ease-in-out;
`;

const Container = styled.section`
  position: absolute;
  width: 100%;
  height: calc(100vh - 0.5rem);
  background: rgba(240, 241, 241, 0.8);
  --webkit-backdrop-filter: blur(1.5px);
  backdrop-filter: blur(1.5px);
  transition: ${(props) => props.open || 'z-index 0.2s ease-in-out'};
  z-index: ${(props) => (props.open ? 999 : -999)};
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

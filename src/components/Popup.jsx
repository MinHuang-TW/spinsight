import React from 'react';
import Modal from '../elements/Modal';
import { fetchIcon } from '../util/functions';
import styled from 'styled-components';

const Popup = ({ category, children, handleCancel, open }) => (
  <Container open={open} onClick={handleCancel}>
    <PopupModal open={open} category={category}>
      {category && (
        <Icon>
          <img src={fetchIcon(category)} alt='icon' />
        </Icon>
      )}
      {children}
    </PopupModal>
  </Container>
);

export default Popup;

const PopupModal = styled(Modal)`
  top: 50%;
  padding: ${(props) => !props.category && '8.3rem 0'};

  /* transform: translate(-50%, -50%); */
  --webkit-transform: ${(props) =>
    props.open
      ? 'translate(-50%, -50%) scale(1)'
      : 'translate(-50%, -50%) scale(0)'};
  transform: ${(props) =>
    props.open
      ? 'translate(-50%, -50%) scale(1)'
      : 'translate(-50%, -50%) scale(0)'};

  transition: transform 0.2s ease-in-out;
  cursor: default;
`;

const Container = styled.section`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 0.5rem);
  background: rgba(240, 241, 241, 0.8);
  --webkit-backdrop-filter: blur(1.5px);
  backdrop-filter: blur(1.5px);

  transition: ${(props) => props.open || 'all 0.2s ease-in-out'};
  z-index: ${(props) => (props.open ? 999 : -999)};
  cursor: pointer;
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

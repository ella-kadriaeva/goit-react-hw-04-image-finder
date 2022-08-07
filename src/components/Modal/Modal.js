import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };
  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

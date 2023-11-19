import { Overlay } from './modal-styled';
import { ModalWindow } from './modal-styled';
import { useEffect } from 'react';

export const Modal = ({ onClick, largeImageUrl }) => {
  useEffect(() => {
    const escFunction = event => {
      if (event.key === 'Escape') {
        onClick();
      }
    };

    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [onClick]);

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return (
    <Overlay onClick={onOverlayClick}>
      <ModalWindow>
        <img src={largeImageUrl} alt="" />
      </ModalWindow>
    </Overlay>
  );
};

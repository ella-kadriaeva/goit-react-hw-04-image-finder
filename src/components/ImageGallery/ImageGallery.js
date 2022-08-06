import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images }) {
  const [largeImage, setLargeImage] = useState('');

  const openModal = () => largeImage => {
    setLargeImage(largeImage);
  };
  const forModalClose = () => {
    setLargeImage(null);
  };
  return (
    <>
      <ul className={css.imageGallery}>
        {images.map(({ webformatURL, id, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            onClickGalleryItem={openModal()}
            webformatURL={webformatURL}
            tags={tags}
            largeImage={largeImageURL}
          />
        ))}
      </ul>
      {largeImage && (
        <Modal onClick={openModal()} closeModal={() => forModalClose()}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
};

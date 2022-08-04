import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images }) {
  const [tags, setTags] = useState('');
  const [largeImage, setLargeImage] = useState('');

  const openModal = () => largeImage => {
    setLargeImage(largeImage);
    setTags(tags);
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
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
      {largeImage && (
        <Modal onClick={openModal()}>
          <img src={largeImage} alt={tags} />
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

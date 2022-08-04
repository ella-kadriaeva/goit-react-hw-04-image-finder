import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  largeImageURL,
  tags,
  webformatURL,
  onClickGalleryItem,
}) => (
  <li className={css.imageGalleryItem}>
    <img
      className={css.imageGalleryImage}
      onClick={() => onClickGalleryItem(largeImageURL, tags)}
      src={webformatURL}
      alt={tags}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  onClickGalleryItem: PropTypes.func,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;

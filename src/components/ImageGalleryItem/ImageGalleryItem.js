import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  largeImage,
  tags,
  webformatURL,
  onClickGalleryItem,
}) => (
  <li className={css.imageGalleryItem}>
    <img
      className={css.imageGalleryImage}
      onClick={() => onClickGalleryItem(largeImage)}
      src={webformatURL}
      alt={tags}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  onClickGalleryItem: PropTypes.func,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  largeImage: PropTypes.string,
};

export default ImageGalleryItem;

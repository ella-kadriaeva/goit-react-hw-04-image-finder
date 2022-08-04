import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import Modal from '../Modal/Modal';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
export default class ImageGallery extends Component {
  state = {
    modal: {
      largeImage: '',
      alt: '',
    },
  };

  openModal = (largeImage, alt) => {
    this.setState({ modal: { largeImage, alt } });
  };

  render() {
    const { images } = this.props;
    const {
      modal: { largeImage, alt },
    } = this.state;
    return (
      <>
        <ul className={css.imageGallery}>
          {images.map(({ webformatURL, id, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              onClickGalleryItem={this.openModal}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>
        {largeImage && (
          <Modal onClick={this.openModal}>
            <img src={largeImage} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
  }),
};

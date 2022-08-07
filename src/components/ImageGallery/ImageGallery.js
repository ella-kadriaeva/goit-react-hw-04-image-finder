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
  const closeModal = () => {
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
        <Modal closeModal={closeModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </>
  );
}
// export default function ImageGallery({ images }) {
//   const [modal, setModal] = useState({ largeImageURL: '', tags: '' });

//   const openModal = (largeImageURL, tags) => {
//     setModal({ largeImageURL, tags });
//   };
//   const closeModal = () => {
//     setModal({ largeImageURL: null, tags: '' });
//   };
//   return (
//     <>
//       <ul className={css.imageGallery}>
//         {images.map(({ webformatURL, id, tags, largeImageURL }) => (
//           <ImageGalleryItem
//             key={id}
//             onClickGalleryItem={openModal()}
//             webformatURL={webformatURL}
//             tags={tags}
//             largeImage={largeImageURL}
//           />
//         ))}
//       </ul>
//       {modal.largeImageURL && (
//         <Modal closeModal={closeModal}>
//           <img src={modal.largeImageURL} alt={modal.tags} />
//         </Modal>
//       )}
//     </>
//   );
// }

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

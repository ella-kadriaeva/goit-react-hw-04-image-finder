import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from '../ImageGallery/ImageGallery';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import imagesApi from '../services/fetchApi';
import Button from '../Button/Button';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');
    fetchGallery(searchQuery, page);
  }, [searchQuery, page]);

  const formSubmit = newQuery => {
    if (newQuery === searchQuery) {
      return;
    }
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    scrollPage();
  };

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  const fetchGallery = (searchQuery, page) => {
    setStatus('pending');
    imagesApi
      .fetchApi(searchQuery, page)
      .then(data => data.hits)
      .then(images => {
        if (images.length === 0) {
          toast.info('There are no images for your request.', {
            position: 'top-center',
          });
          setStatus('rejected');
          return;
        }
        setImages(prevImages => [...prevImages, ...images]);
        setStatus('resolved');
      })
      .catch(error => {
        setStatus('rejected');
        setError(error);
      });
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={formSubmit} />
      <ToastContainer position="top-right" autoClose={2000} rtl={false} />
      {status === 'idle' && (
        <div className={css.text}>
          What are we looking for? Please, enter a keyword in the search bar.
        </div>
      )}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>{error.message}</h1>}
      {status === 'resolved' && (
        <>
          <ImageGallery images={images} />
          <Button onLoadMoreClick={loadMore} />
        </>
      )}
    </div>
  );
}

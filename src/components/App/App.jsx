import React, { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import ImageGallery from '../ImageGallery/ImageGallery';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import imagesApi from '../services/fetchApi';

import Button from '../Button/Button';
export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: 'idle',
    error: '',
  };
  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (
      searchQuery &&
      (searchQuery !== prevState.searchQuery || page !== prevState.page)
    ) {
      this.fetchGallery();
    }
  }
  formSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      images: [],
    });
  };
  loadMore = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.scrollPage();
  };
  scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };
  fetchGallery = () => {
    const { searchQuery, page } = this.state;
    this.setState({ status: 'pending' });
    imagesApi
      .fetchApi(searchQuery, page)
      .then(data => data.hits)
      .then(images => {
        if (images.length === 0) {
          toast.info('There are no images for your request.', {
            position: 'top-center',
          });
          this.setState({ status: 'rejected' });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  render() {
    const { images, status, error } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.formSubmit} />
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
            <Button onLoadMoreClick={this.loadMore} />
          </>
        )}
      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  searchChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  searchSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.info('Please, enter a keyword in the search bar.', {
        position: 'top-center',
      });
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.searchSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>
              <FaSearch />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            name="search"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.searchChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};

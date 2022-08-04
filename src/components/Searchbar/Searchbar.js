import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const searchSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.info('Please, enter a keyword in the search bar.', {
        position: 'top-center',
      });
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={searchSubmit}>
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
          value={searchQuery}
          onChange={searchChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  searchQuery: PropTypes.string,
};

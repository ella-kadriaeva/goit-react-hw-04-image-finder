import css from './Button.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onLoadMoreClick }) => {
  return (
    <button type="button" onClick={onLoadMoreClick} className={css.button}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoadMoreClick: PropTypes.func,
};

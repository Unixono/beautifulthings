import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Button = props => {
  const {
    children,
    onClick,
    disabled,
    small,
  } = props;

  const _handleClick = () => {
    if (!disabled) onClick();
  };

  function _getStyle() {
    if (small) {
      if (disabled) return styles.smallDisabled;
      return styles.smallEnabled;
    } else {
      if (disabled) return styles.normalDisabled;
      return styles.normalEnabled;
    }
  }

  const style = _getStyle();

  return (
    <div className={style}>
      <button
        className={styles.button}
        disabled={disabled}
        onClick={_handleClick}
      >
        {children}
      </button>
    </div>
  );
}

Button.propTypes = {
  /**
   * The label or element the button will show.
   */
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,

  /**
   * The function to call when the button is clicked.
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Whether the button is disabled or not. Default value: false
   */
  disabled: PropTypes.bool,

  /**
   * Whether the button is a small one or not. Default value: false
   */
  small: PropTypes.bool,
};

export default Button;

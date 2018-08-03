import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const RadioButton = props => {
  const {
    label,
    selected,
    onClick,
  } = props;

  function _getRadioButton() {
    if (!selected) return <div className={styles.radioBorder} />;

    return (
      <div className={styles.radioBorder}>
        <div className={styles.selected} />
      </div>
    );
  }

  const radioButton = _getRadioButton();

  return (
    <label
      className={styles.container}
      onClick={onClick}
    >
      <div>
        {radioButton}
      </div>
      <div>
        {label}
      </div>
    </label>
  );
}

RadioButton.propTypes = {
  /**
   * The label the element will show.
   */
  label: PropTypes.string.isRequired,

  /**
   * Whenever the element is selected or not
   */
  selected: PropTypes.bool.isRequired,

  /**
   * The function to call when the element is clicked
   */
  onClick: PropTypes.func.isRequired,
};

export default RadioButton;

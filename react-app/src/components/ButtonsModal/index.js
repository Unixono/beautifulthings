import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from 'components/BaseModal';

import styles from './index.module.scss';

const ButtonsModal = props => {
  const {
    visible,
    message,
    primaryButton,
    secondaryButton,
  } = props;

  function _getButtons() {
    if (!secondaryButton) {
      return (
        <div className={styles.buttonsContainer}>
          <div>
            {primaryButton}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.buttonsContainer}>
          <div />
          <div>
            {primaryButton}
          </div>
          <div>
            {secondaryButton}
          </div>
          <div />
        </div>
      );
    }
  }

  const buttons = _getButtons();

  const modalBody = (
    <div className={styles.container}>
      <div>
        {message}
      </div>
      <div>
        {buttons}
      </div>
    </div>
  );

  return BaseModal({
    visible,
    children: modalBody,
  });

}

ButtonsModal.propTypes = {
  /**
   * Whenever the modal is visible or not
   */
  visible: PropTypes.bool.isRequired,

  /**
   * The message that the modal will show
   */
  message: PropTypes.string.isRequired,

  /**
   * The primary button (a Button) that the element will show
   */
  primaryButton: PropTypes.element.isRequired,

  /**
   * The (optional) secondary button (a Button) that the element will show
   */
  secondaryButton: PropTypes.element,
};

export default ButtonsModal;

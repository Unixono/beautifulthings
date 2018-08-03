import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from 'components/BaseModal';
import Button from 'components/Button';

import styles from './index.module.scss';

const ErrorModal = props => {
  const {
    message,
    onClose,
  } = props;

  const closeModalButton = Button({
    children: "Close this message",
    onClick: onClose,
    small: true,
  });

  const modalContent = (
    <div className={styles.container}>
      <div>
        {message}
      </div>
      <div className={styles.buttonContainer}>
        {closeModalButton}
      </div>
    </div>
  );

  return BaseModal({
    visible: true,
    children: modalContent,
  });
}

ErrorModal.propTypes = {
  /**
   * The message that the modal will show
   */
  message: PropTypes.string.isRequired,

  /**
   * The function to call when the close button is tapped
   */
  onClose: PropTypes.func.isRequired,
};

export default ErrorModal;

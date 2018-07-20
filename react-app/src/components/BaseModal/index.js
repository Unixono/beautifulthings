import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default class BaseModal extends PureComponent {
  static propTypes = {
    /**
     * Whenever the modal is visible or not
     */
    visible: PropTypes.bool.isRequired,

    /**
     * Whenever the modal is displayed on the left or if
     * is displayed as a floating modal (default behaviour)
     */
    leftModal: PropTypes.bool,

    /**
     * The element to use as the modal content
     */
    children: PropTypes.element.isRequired
  };

  static defaultProps = { leftModal: false }

  render() {
    if (!this.props.visible) return null;

    const modalStyle = this.props.leftModal ? styles.leftModal : styles.floattingModal;

    return (
      <div>
        <div className={styles.opacityLayer} />
        <div className={modalStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

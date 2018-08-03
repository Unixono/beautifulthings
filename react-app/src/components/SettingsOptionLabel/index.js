import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const SettingsOptionLabel = props => {
  const {
    icon,
    text,
    onClick,
  } = props;

  const _handleClick = () => {
    if (onClick) onClick();
  }

  function _getIconStyle() {
    switch (icon) {
      case SettingsOptionLabel.NOTIFICATION:
        return styles.notifications;
      case SettingsOptionLabel.SIGNOUT:
        return styles.signOut;
      default:
        return null;
    }
  }

  const iconStyle = _getIconStyle();

  return (
    <div
      className={styles.container}
      onClick={_handleClick}
    >
      <div className={iconStyle} />
      <div>
        {text}
      </div>
    </div>
  );
}

SettingsOptionLabel.NOTIFICATION = 'notification';
SettingsOptionLabel.SIGNOUT = 'signOut';

SettingsOptionLabel.propTypes = {
  /**
   * The icon to display next to the label text
   */
  icon: PropTypes.oneOf([
    SettingsOptionLabel.NOTIFICATION,
    SettingsOptionLabel.SIGNOUT,
  ]).isRequired,

  /**
   * The label text
   */
  text: PropTypes.string.isRequired,

  /**
   * An optional function to call when element is tapped
   */
  onClick: PropTypes.func,
};

export default SettingsOptionLabel;

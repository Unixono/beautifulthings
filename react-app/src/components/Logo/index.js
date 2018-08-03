import React from 'react';
import PropTypes from 'prop-types';

import AppLogo from './AppLogo.svg';
import AppLogoWhite from './AppLogoWhite.svg';
import styles from './index.module.scss';

const Logo = props => {
  const imageSource = (props && props.white) ? AppLogoWhite : AppLogo;

  return (
    <img
      className={styles.logo}
      src={imageSource}
      alt=""
    />
  );
}

Logo.propTypes = {
  /**
   * Whether the logo is the white one (default: false)
   */
  white: PropTypes.bool,
};

export default Logo;

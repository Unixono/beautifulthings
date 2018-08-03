import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'components/Logo';
import styles from './index.module.scss';

const Header = props => {
  const {
    left,
    right,
    whiteLogo,
  } = props;

  const logo = Logo({ white: whiteLogo });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {left}
      </div>
      <div className={styles.center}>
        {logo}
      </div>
      <div className={styles.right}>
        {right}
      </div>
    </div>
  );
}

Header.propTypes = {
  /**
   * The element (an ActionIcon) that this element will show in the left.
   */
  left: PropTypes.element,

  /**
   * The element (an ActionIcon) that this element will show in the right.
   */
  right: PropTypes.element,

  /**
   * Whether the logo to display is the white one (default: false).
   */
  whiteLogo: PropTypes.bool,
};

Header.defaultProps = {
  left: null,
  right: null,
  whiteLogo: false,
}

export default Header;

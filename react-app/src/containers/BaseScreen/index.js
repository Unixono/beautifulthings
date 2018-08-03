import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const BaseScreen = props => {
  const {
    header,
    main,
    footer,
  } = props;

  return (
    <div className={styles.container}>
      <div>
        {header}
      </div>
      <div className={styles.main}>
        {main}
      </div>
      <div>
        {footer}
      </div>
    </div>
  );
}

BaseScreen.propTypes = {
  /**
   * The element to use as a header (expect a Header).
   */
  header: PropTypes.element.isRequired,

  /**
   * The element with the main content of the screen.
   */
  main: PropTypes.element.isRequired,

  /**
   * The element to use as a footer.
   */
  footer: PropTypes.element,
};

BaseScreen.defaultProps = {
  footer: null,
};

export default BaseScreen;

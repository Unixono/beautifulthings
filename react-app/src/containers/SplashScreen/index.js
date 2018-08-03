import React from 'react';
import PropTypes from 'prop-types';

import api from 'api';

import styles from './index.module.scss';

export default class SplashScreen extends React.PureComponent {
  static propTypes = {
    onSignedIn: PropTypes.func.isRequired,
    onNotSignedIn: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { onSignedIn, onNotSignedIn } = this.props;

    api.initSavedAccount()
      .then(success => success ? onSignedIn() : onNotSignedIn());
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.topSpace} />
        <div className={styles.appLogo} />
        <div className={styles.unixonoLogo} />
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ActionIcon from 'components/ActionIcon';
import BaseModal from 'components/BaseModal';
import Logo from 'components/Logo';
import SettingsOptionLabel from 'components/SettingsOptionLabel';

import styles from './index.module.scss';

export default class SettingsModal extends PureComponent {
  static propTypes = {
    /**
     * Whenever the modal is visible or not
     */
    visible: PropTypes.bool.isRequired,

    /**
     * The username to display
     */
    username: PropTypes.string.isRequired,

    /**
     * Whenever the notifications are set to daily or not
     */
    daily: PropTypes.bool.isRequired,

    /**
     * The function to call when hide icon is tapped
     */
    onHide: PropTypes.func.isRequired,

    /**
     * The function to call when logout option is tapped
     */
    onSignOut: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { isDaily: this.props.daily }
  }

  _toggleNotifications = () => this.setState({ isDaily: !this.state.isDaily });

  _getTopElement() {
    return (
      <div className={styles.top}>
        <div className={styles.hideContainer}>
          <ActionIcon
            icon={ActionIcon.BACK}
            onClick={this.props.onHide}
          />
        </div>
        <div>
          <Logo size="small" />
          {this.props.username}
        </div>
      </div>
    );
  }

  _getBottomElement() {
    return (
      <div className={styles.bottom}>
        <Logo size="big" />
      </div>
    );
  }

  _getMiddleElement() {
    return (
      <div className={styles.middle}>
        <SettingsOptionLabel
          icon={SettingsOptionLabel.NOTIFICATION}
          text="Notifications">
          <div>
            <label>
              <input
                type="radio"
                checked={this.state.isDaily}
                onChange={this._toggleNotifications}
              />
              Daily
            </label>
            <label>
              <input
                type="radio"
                checked={!this.state.isDaily}
                onChange={this._toggleNotifications}
              />
              Weekly
            </label>
          </div>
        </SettingsOptionLabel>
        <SettingsOptionLabel
          icon={SettingsOptionLabel.SIGNOUT}
          text="Sign out"
          onClick={this.props.onSignOut}
        />
      </div>
    );
  }

  isDaily() {
    return this.state.isDaily;
  }

  render() {
    const top = this._getTopElement();
    const middle = this._getMiddleElement();
    const bottom = this._getBottomElement();

    return (
      <BaseModal
        visible={this.props.visible}
        leftModal={true}
      >
        <div className={styles.container}>
          {top}
          {middle}
          {bottom}
        </div>
      </BaseModal>
    );
  }
}

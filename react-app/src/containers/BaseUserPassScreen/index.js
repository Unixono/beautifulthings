import React from 'react';
import PropTypes from 'prop-types';

import InputText from 'components/InputText';
import Logo from 'components/Logo';

import styles from './index.module.scss';

export default class BaseUserPassScreen extends React.PureComponent {
  static propTypes = {
    /**
     * The error message to shown if username input value is not valid
     */
    usernameError: PropTypes.string,

    /**
     * The error message to shown if password input value is not valid
     */
    passwordError: PropTypes.string,

    /**
     * The function to call when the username input changes
     */
    onUsernameChange: PropTypes.func.isRequired,

    /**
     * The function to call when the password input changes
     */
    onPasswordChange: PropTypes.func.isRequired,

    /**
     * The function to call when enter is pressed within password input.
     */
    onPasswordEnter: PropTypes.func,

    /**
     * The elements to be shown below the password input.
     */
    children: PropTypes.element.isRequired,
  }

  componentDidMount() {
    this._usernameInput.focus();
  }

  _setUsernameInputRef = element => this._usernameInput = element;
  _setPasswordInputRef = element => this._passwordInput = element;

  _handleUsernameEnter = () => this._passwordInput.focus();
  _handlePasswordEnter = () => {
    const { onPasswordEnter } = this.props;

    if (onPasswordEnter) onPasswordEnter();
  }

  _getUsernameInput() {
    const { onUsernameChange, usernameError } = this.props;

    return (
      <InputText
        type={InputText.TEXT}
        label="Username"
        errorMessage={usernameError}
        onChange={onUsernameChange}
        onEnter={this._handleUsernameEnter}
        ref={this._setUsernameInputRef}
      />
    );
  }

  _getPasswordInput() {
    const { onPasswordChange, passwordError } = this.props;

    return (
      <InputText
        type={InputText.PASSWORD}
        label="Password"
        errorMessage={passwordError}
        onChange={onPasswordChange}
        onEnter={this._handlePasswordEnter}
        ref={this._setPasswordInputRef}
      />
    );
  }

  render() {
    const logo = Logo();
    const usernameInput = this._getUsernameInput();
    const passwordInput = this._getPasswordInput();

    return (
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.logoContainer}>
            {logo}
          </div>
          <div className={styles.space} />
          <div className={styles.formContainer}>
            <div className={styles.usernameInputContainer}>
              {usernameInput}
            </div>
            <div>
              {passwordInput}
            </div>
            <div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

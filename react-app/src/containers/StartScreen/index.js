import React from 'react';
import PropTypes from 'prop-types';

import Account from 'account';
import api from 'api';

import { showErrorModal } from 'utils/errorModal';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import BaseUserPassScreen from 'containers/BaseUserPassScreen';
import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';

import styles from './index.module.scss';

export default class StartScreen extends React.PureComponent {
  static propTypes = {
    onSuccessfulySignIn: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    isModalVisible: false,
  };

  _closeApp = () => navigator.app.exitApp();

  componentWillMount() {
    document.addEventListener("backbutton", this._closeApp);
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._closeApp);
  }

  _validateForm() {
    const { username, password } = this.state;

    return username.length && password.length;
  }

  _handleUsernameChange = username => {
    const valid = Account.validateUsername(username);

    if (valid) {
      this.setState({
        username,
        usernameError: '',
      });
    } else {
      this.setState({
        username: '',
        usernameError: 'Username is too short',
      });
    }
  }

  _handlePasswordChange = password => {
    const valid = Account.validatePassword(password);

    if (valid) {
      this.setState({
        password,
        passwordError: '',
      });
    } else {
      this.setState({
        password: '',
        passwordError: 'Password is too short',
      });
    }
  }

  _handlePasswordEnter = () => {
    const validForm = this._validateForm();

    if (validForm) this._signIn();
  }

  _toggleModalVisibility = () => this.setState({ isModalVisible: !this.state.isModalVisible });

  _handleSignUp = () => this.props.onSignUp();
  _handleSignIn = () => this._signIn();

  async _signIn() {
    const { username, password } = this.state;

    showLoadingModal('Signing in...');
    try {
      const keyPair = await Account.generateKeyPair(username, password);

      api.initAccount(username, keyPair);
      const success = await api.signIn();

      if (success) this.props.onSuccessfulySignIn();
      else this._toggleModalVisibility();
    } catch (error) {
      showErrorModal('Cannot connect to the server...');
    } finally {
      hideLoadingModal();
    }
  }

  _getSignInButton() {
    const validFormDate = this._validateForm();

    return Button({
      disabled: !validFormDate,
      onClick: this._handleSignIn,
      children: "Sign in",
    });
  }

  _getSignUpButton() {
    return Button({
      onClick: this._handleSignUp,
      children: "Sign up",
    });
  }

  _getWrongUsernameOrPasswordModal() {
    const closeModalButton = Button({
      children: "Try again",
      onClick: this._toggleModalVisibility,
      small: true,
    });

    return ButtonsModal({
      visible: this.state.isModalVisible,
      message: "Your username or password is incorrect",
      primaryButton: closeModalButton,
    });
  }

  render() {
    const { usernameError, passwordError } = this.state;
    const signInButton = this._getSignInButton();
    const signUpButton = this._getSignUpButton();
    const wrongUsernameOrPasswordModal = this._getWrongUsernameOrPasswordModal();

    return (
      <div>
        {wrongUsernameOrPasswordModal}
        <BaseUserPassScreen
          usernameError={usernameError}
          passwordError={passwordError}
          onUsernameChange={this._handleUsernameChange}
          onPasswordChange={this._handlePasswordChange}
          onPasswordEnter={this._handlePasswordEnter}
        >
          <div className={styles.container}>
            <div>
              {signInButton}
            </div>
            <div className={styles.createAccountLabelContainer}>
              - Create your account -
            </div>
            <div>
              {signUpButton}
            </div>
          </div>
        </BaseUserPassScreen>
      </div>
    );
  }
}

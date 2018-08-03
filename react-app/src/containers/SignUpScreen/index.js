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

export default class SignUpScreen extends React.PureComponent {
  static propTypes = {
    onSuccessfulySignUp: PropTypes.func.isRequired,
    onSignIn: PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    isSignedUpModalVisible: false,
    isTryAnotherModalVisible: false,
  };

  componentWillMount() {
    document.addEventListener("backbutton", this._handleSignIn);
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._handleSignIn);
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

    if (validForm) this._signUp();
  }

  _showSuccessfulySignedUpModal = () => this.setState({ isSignedUpModalVisible: true });
  _toggleTryAnotherModalVisibility = () => this.setState({ isTryAnotherModalVisible: !this.state.isTryAnotherModalVisible });

  _handleSignUp = () => this._signUp();
  _handleSignIn = () => this.props.onSignIn();

  async _signUp() {
    const { username, password } = this.state;

    showLoadingModal('Signing up...');
    try {
      const keyPair = await Account.generateKeyPair(username, password);

      api.initAccount(username, keyPair);
      const success = await api.signUp();

      if (success) this._showSuccessfulySignedUpModal();
      else this._toggleTryAnotherModalVisibility();
    } catch (error) {
      showErrorModal('Cannot connect to the server...');
    } finally {
      hideLoadingModal();
    }
  }

  _getSignUpButton() {
    const validFormDate = this._validateForm();

    return Button({
      disabled: !validFormDate,
      onClick: this._handleSignUp,
      children: "Sign up",
    });
  }

  _getSignedUpModal() {
    const signInButton = Button({
      children: "Sign in",
      onClick: this._handleSignIn,
      small: true,
    });

    return ButtonsModal({
      visible: this.state.isSignedUpModalVisible,
      message: "Successful registration",
      primaryButton: signInButton,
    });
  }

  _getTryAnotherModal() {
    const closeModalButton = Button({
      children: "Try another",
      onClick: this._toggleTryAnotherModalVisibility,
      small: true,
    });

    return ButtonsModal({
      visible: this.state.isTryAnotherModalVisible,
      message: "Username already exists",
      primaryButton: closeModalButton,
    });
  }

  render() {
    const { usernameError, passwordError } = this.state;
    const signUpButton = this._getSignUpButton();
    const signedUpModal = this._getSignedUpModal();
    const tryAnotherModal = this._getTryAnotherModal();

    return (
      <div>
        {signedUpModal}
        {tryAnotherModal}
        <BaseUserPassScreen
          usernameError={usernameError}
          passwordError={passwordError}
          onUsernameChange={this._handleUsernameChange}
          onPasswordChange={this._handlePasswordChange}
          onPasswordEnter={this._handlePasswordEnter}
        >
          <div className={styles.container}>
            <div>
              {signUpButton}
            </div>
            <div
              className={styles.signInLabelContainer}
              onClick={this._handleSignIn}
            >
              or sign in
            </div>
          </div>
        </BaseUserPassScreen>
      </div>
    );
  }
}

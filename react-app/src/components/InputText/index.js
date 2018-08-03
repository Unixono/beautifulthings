import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default class InputText extends React.PureComponent {
  static TEXT = 'text';
  static PASSWORD = 'password';

  static propTypes = {
    /**
     * The type of the input. Possible values: 'text' or 'password'.
     */
    type: PropTypes.oneOf([
      InputText.TEXT,
      InputText.PASSWORD
    ]).isRequired,

    /**
     * The label the input will display.
     */
    label: PropTypes.string,

    /**
     * The placeholder text the input will display.
     */
    placeholder: PropTypes.string,

    /**
     * The error message the input will display.
     */
    errorMessage: PropTypes.string,

    /**
     * The function to call when the input value changes.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * The function to call when enter is pressed.
     */
    onEnter: PropTypes.func,
  };

  state = {
    isPasswordVisible: false,
  };

  _setInputRef = element => this._input = element;

  _handleChange = event => {
    const value = event.target.value;

    this.props.onChange(value);
  }

  _handleKeyDown = event => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter' && this.props.onEnter) this.props.onEnter();
  }

  _togglePasswordVisibility = () => this.setState({ isPasswordVisible: !this.state.isPasswordVisible });

  _getLabel() {
    const { label } = this.props;

    if (!label) return null;

    return (
      <span>
        {label}
      </span>
    );
  }

  _getInputIcon = () => {
    if (this.props.type === InputText.TEXT) return null;

    const style = this.state.isPasswordVisible ? styles.hidePassword : styles.showPassword;

    return (
      <div
        className={style}
        onClick={this._togglePasswordVisibility}
      />
    );
  }

  _getInput() {
    const { type, placeholder } = this.props;
    const TEXT = InputText.TEXT;

    const inputType = (type === TEXT || this.state.isPasswordVisible) ? TEXT : InputText.PASSWORD;
    const inputStyle = type === TEXT ? styles.text : styles.password;
    const inputPlaceholder = placeholder || '';

    return (
      <input
        className={inputStyle}
        type={inputType}
        placeholder={inputPlaceholder}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        ref={this._setInputRef}
      />
    );
  }

  _getErrorMessage() {
    const { errorMessage } = this.props;

    if (!errorMessage) return null;

    return (
      <span>
        {errorMessage}
      </span>
    );
  }

  focus() {
    this._input.focus();
  }

  render() {
    const label = this._getLabel();
    const input = this._getInput();
    const icon = this._getInputIcon();
    const errorMessage = this._getErrorMessage();

    return (
      <div className={styles.container}>
        <div className={styles.labelContainer}>
          {label}
        </div>
        <div className={styles.inputContainer}>
          {input}
          {icon}
        </div>
        <div className={styles.errorMessageContainer}>
          {errorMessage}
        </div>
      </div>
    );
  }
}

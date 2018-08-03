import React from 'react';
import PropTypes from 'prop-types';

import { showErrorModal } from 'utils/errorModal';

import ActionIcon from 'components/ActionIcon';
import BaseScreen from 'containers/BaseScreen';
import Button from 'components/Button';
import DatePicker from 'components/DatePicker';
import Header from 'components/Header';
import TextArea from 'components/TextArea';

import styles from './index.module.scss';

export default class EditScreen extends React.PureComponent {
  static propTypes = {
    /**
     * The date to show
     */
    date: PropTypes.string.isRequired,

    /**
     * The text to show
     */
    text: PropTypes.string.isRequired,

    /**
     * The function to call when back button is tapped
     */
    onBack: PropTypes.func.isRequired,

    /**
     * The function to call when save button is tapped
     */
    onSave: PropTypes.func.isRequired,
  };

  componentWillMount() {
    document.addEventListener("backbutton", this._handleBack);
  }

  componentDidMount() {
    this._textArea.focus();
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._handleBack);
  }

  _setDatePickerRef = element => this._datePicker = element;
  _setTextAreaRef = element => this._textArea = element;

  _handleBack = () => {
    const text = this._textArea.getText();
    const date = this._datePicker.getDate();

    this.props.onBack(date, text);
  }

  _handleSave = () => {
    const text = this._textArea.getText();
    const date = this._datePicker.getDate();

    if (!text.length) {
      showErrorModal('Entry cannot be empty');
      return;
    }

    this.props.onSave(date, text);
  }

  _getHeader() {
    const backIcon = ActionIcon({
      icon: ActionIcon.BACK,
      onClick: this._handleBack,
    });

    const applyIcon = ActionIcon({
      icon: ActionIcon.APPLY,
      onClick: this._handleSave,
    });

    const header = Header({
      left: backIcon,
      right: applyIcon,
      whiteLogo: true,
    });

    return (
      <div className={styles.headerBackground}>
        {header}
      </div>
    );
  }

  _getDatePicker() {
    return <DatePicker
      date={this.props.date}
      ref={this._setDatePickerRef}
    />;
  }

  _getTextArea() {
    return <TextArea
      text={this.props.text}
      ref={this._setTextAreaRef}
    />;
  }

  _getApplyButton() {
    const buttonImage = <div className={styles.applyButton} />;

    const button = Button({
      children: buttonImage,
      onClick: this._handleSave,
    });

    return button;
  }

  _getMainContent() {
    const datePicker = this._getDatePicker();
    const textArea = this._getTextArea();
    const applyButton = this._getApplyButton();

    return (
      <div className={styles.main}>
        <div className={styles.datePickerContainer}>
          {datePicker}
        </div>
        <div className={styles.textAreaContainer}>
          {textArea}
        </div>
        <div className={styles.buttonContainer}>
          {applyButton}
        </div>
      </div>
    );
  }

  render() {
    const header = this._getHeader();
    const main = this._getMainContent();

    return BaseScreen({
      header: header,
      main: main,
    });
  }
}

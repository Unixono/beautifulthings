import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

export default class TextArea extends React.PureComponent {
  static MAX_LENGTH = 240;

  static propTypes = {
    /**
     * The initial text that the element will have.
     */
    text: PropTypes.string.isRequired,
  };

  state = {
    currentText: this.props.text,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.setState({ currentText: nextProps.text });
    }
  }

  _setTextAreaRef = element => this._textArea = element;

  _getTextArea() {
    return (
      <textarea
        className={styles.textArea}
        value={this.state.currentText}
        onChange={this._handleChange}
        ref={this._setTextAreaRef}
      />
    );
  }

  _getCharCount() {
    const currentCount = this.state.currentText.length;

    return `${currentCount}/${TextArea.MAX_LENGTH}`;
  }

  _handleChange = event => {
    const newText = event.target.value;

    if (newText.length <= TextArea.MAX_LENGTH) this.setState({ currentText: newText });
  }

  focus() {
    this._textArea.focus();
  }

  getText() {
    return this.state.currentText;
  }

  render() {
    const textArea = this._getTextArea();
    const charCount = this._getCharCount();

    return (
      <div>
        <label className={styles.labelContainer}>
          What?
        </label>
        <div className={styles.textAreaContainer}>
          {textArea}
        </div>
        <div className={styles.charCounterContainer}>
          {charCount}
        </div>
      </div>
    );
  }
}

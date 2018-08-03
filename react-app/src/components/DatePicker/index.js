import React from 'react';
import PropTypes from 'prop-types';

import { isDateStringValid, getCurrentDateString } from 'utils/date';

import styles from './index.module.scss';

export default class DatePicker extends React.PureComponent {
  static propTypes = {
    /**
     * The initial date to show
     */
    date: PropTypes.string.isRequired,
  };

  state = {
    datePicked: this.props.date,
  };

  _handleChange = event => {
    const newDatePicked = event.target.value;
    const isNewDatePickedValid = isDateStringValid(newDatePicked);

    if (isNewDatePickedValid) this.setState({ datePicked: newDatePicked });
  }

  _getInput() {
    const maxDate = getCurrentDateString();

    return (
      <input
        className={styles.input}
        type="date"
        max={maxDate}
        value={this.state.datePicked}
        onChange={this._handleChange}
      />
    );
  }

  getDate() {
    return this.state.datePicked;
  }

  render() {
    const input = this._getInput();

    return (
      <div>
        <label className={styles.labelContainer}>
          When?
        </label>
        <div className={styles.inputContainer}>
          {input}
        </div>
      </div>
    );
  }
}

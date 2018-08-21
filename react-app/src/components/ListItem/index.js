import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import moment from 'moment';

import ActionIcon from 'components/ActionIcon';
import Button from 'components/Button';

import styles from './index.module.scss';
const _classNames = classNames.bind(styles);

export default class ListItem extends React.PureComponent {
  static propTypes = {
    /**
     * The date of the entry
     */
    date: PropTypes.string.isRequired,

    /**
     * The text of the entry
     */
    text: PropTypes.string.isRequired,

    /**
     * The function to call when edit button is tapped
     */
    onEdit: PropTypes.func.isRequired,

    /**
     * The function to call when delete button is tapped
     */
    onDelete: PropTypes.func.isRequired,
  };

  state = {
    expanded: false,
  };

  _handleEdit = () => this.props.onEdit(this.props.date);
  _handleDelete = () => this.props.onDelete(this.props.date);

  _toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

  _getFormattedDateString() {
    const formattedDateString = moment(this.props.date).format('MMM D, YYYY');

    return formattedDateString;
  }

  _renderActionIcon() {
    const icon = this.state.expanded ? ActionIcon.COLLAPSE : ActionIcon.EXPAND;

    return <ActionIcon
      icon={icon}
      onClick={this._toggleExpanded}
    />;
  }

  _renderEditButton() {
    return (
      <Button onClick={this._handleEdit} small>
        Edit
      </Button>
    );
  }

  _renderDeleteButton() {
    return (
      <Button onClick={this._handleDelete} small>
        Delete
      </Button>
    );
  }

  render() {
    const { date, text } = this.props;
    const { expanded } = this.state;

    const formatedDatted = this._getFormattedDateString(date);
    const textPreviewStyle = _classNames('textPreview', { expanded });
    const dividerStyle = _classNames('divider', { expanded });
    const fullTextStyle = _classNames('fullText', { expanded });
    const buttonsContainerStyle = _classNames('buttonsContainer', { expanded });

    const icon = this._renderActionIcon();
    const editButton = this._renderEditButton();
    const deleteButton = this._renderDeleteButton();

    return (
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div>
            <div className={styles.date}>
              {formatedDatted}
            </div>
            <div className={textPreviewStyle}>
              {text}
            </div>
          </div>
          <div>
            {icon}
          </div>
        </div>
        <div className={dividerStyle} />
        <div className={fullTextStyle}>
          {text}
        </div>
        <div className={buttonsContainerStyle}>
          <div>
            {deleteButton}
          </div>
          <div>
            {editButton}
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import ActionIcon from 'components/ActionIcon';
import Button from 'components/Button';

import styles from './index.module.scss';

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

  _getActionIcon() {
    const icon = this.state.expanded ? ActionIcon.COLLAPSE : ActionIcon.EXPAND;

    return ActionIcon({
      icon: icon,
      onClick: this._toggleExpanded,
    });
  }

  _getTextPreview() {
    if (this.state.expanded) return null;

    return this.props.text;
  }

  _getDivider() {
    if (!this.state.expanded) return null;

    return <div className={styles.divider} />;
  }

  _getFullText() {
    if (!this.state.expanded) return null;

    return this.props.text;
  }

  _getEditButton() {
    return Button({
      children: "Edit",
      onClick: this._handleEdit,
      small: true,
    });
  }

  _getDeleteButton() {
    return Button({
      children: "Delete",
      onClick: this._handleDelete,
      small: true,
    });
  }

  _getButtonsContainer() {
    if (!this.state.expanded) return null;

    const editButton = this._getEditButton();
    const deleteButton = this._getDeleteButton();

    return (
      <div className={styles.buttonsContainer}>
        <div>
          {deleteButton}
        </div>
        <div>
          {editButton}
        </div>
      </div>
    );
  }

  render() {
    const date = this._getFormattedDateString();
    const icon = this._getActionIcon();
    const textPreview = this._getTextPreview();
    const divider = this._getDivider();
    const fullText = this._getFullText();
    const buttonsContainer = this._getButtonsContainer();

    return (
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.datePreviewContainer}>
            <div className={styles.dateContainer}>
              {date}
            </div>
            <div className={styles.previewContainer}>
              {textPreview}
            </div>
          </div>
          <div>
            {icon}
          </div>
        </div>
        <div>
          {divider}
        </div>
        <div className={styles.fullTextContainer}>
          {fullText}
        </div>
        <div>
          {buttonsContainer}
        </div>
      </div>
    );
  }
}

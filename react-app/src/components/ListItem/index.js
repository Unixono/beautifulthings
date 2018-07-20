import React from 'react';
import PropTypes from 'prop-types';

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

  state = { expanded: false };

  _handleEdit = () => this.props.onEdit(this.props.date);
  _handleDelete = () => this.props.onDelete(this.props.date);

  _toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

  _getActionIcon() {
    const icon = this.state.expanded ? ActionIcon.COLLAPSE : ActionIcon.EXPAND;

    return <ActionIcon
      icon={icon}
      onClick={this._toggleExpanded}
    />;
  }

  _getEditButton() {
    return <Button onClick={this._handleEdit}>Edit</Button>;
  }

  _getDeleteButton() {
    return <Button onClick={this._handleDelete}>Delete</Button>;
  }

  render() {
    const icon = this._getActionIcon();
    const editButton = this.state.expanded ? this._getEditButton() : null;
    const deleteButton = this.state.expanded ? this._getDeleteButton() : null;

    const textStyle = this.state.expanded ? styles.expanded : styles.collapsed;

    return (
      <div className={styles.container}>
        <div className={styles.entry}>
          <div>
            {this.props.date}
          </div>
          <div className={textStyle}>
            {this.props.text}
          </div>
          <div className={styles.buttonsContainer}>
            {editButton}
            {deleteButton}
          </div>
        </div>
        <div>
          {icon}
        </div>
      </div>
    );
  }
}

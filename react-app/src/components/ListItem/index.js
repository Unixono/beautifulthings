import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
import classNames from 'classnames/bind';

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

  state = { expanded: false };

  _handleEdit = () => this.props.onEdit(this.props.date);
  _handleDelete = () => this.props.onDelete(this.props.date);

  _toggleExpanded = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { date, text } = this.props;
    const { expanded } = this.state;

    const textPreviewStyle = _classNames('textPreview', { expanded });
    const dividerStyle = _classNames('divider', { expanded });
    const fullTextStyle = _classNames('fullText', { expanded });
    const buttonsContainerStyle = _classNames('buttonsContainer', { expanded });

    const icon = this.state.expanded ? ActionIcon.COLLAPSE : ActionIcon.EXPAND;

    // iOS does not recognize date with format "2018-11-23", but "2018/11/23".
    const entryDate = date.replace(/-/g, '/') + ' 00:00:00';

    return (
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div>
            <div className={styles.date}>
              <FormattedDate
                year="numeric"
                month="short"
                day="numeric"
                value={new Date(entryDate)}
              />
            </div>
            <div className={textPreviewStyle}>
              {text}
            </div>
          </div>
          <ActionIcon
            icon={icon}
            onClick={this._toggleExpanded}
          />
        </div>
        <div className={dividerStyle} />
        <div className={fullTextStyle}>
          {text}
        </div>
        <div className={buttonsContainerStyle}>
          <Button onClick={this._handleDelete} small>
            <FormattedMessage id="Delete" />
          </Button>
          <Button onClick={this._handleEdit} small>
            <FormattedMessage id="Edit" />
          </Button>
        </div>
      </div>
    );
  }
}

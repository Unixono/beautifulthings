import React from 'react';
import PropTypes from 'prop-types';

import ActionIcon from 'components/ActionIcon';
import BaseScreen from 'containers/BaseScreen';
import Button from 'components/Button';
import Header from 'components/Header';
import ListItem from 'components/ListItem';
import Welcome from 'components/Welcome';

import styles from './index.module.scss';

export default class ListScreen extends React.PureComponent {
  static propTypes = {
    /**
     * The set of entries to draw in the list
     */
    entries: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,

    /**
     * The function to call when add button is tapped
     */
    onAdd: PropTypes.func.isRequired,

    /**
     * The function to call when edit button is tapped over an entry
     */
    onEdit: PropTypes.func.isRequired,

    /**
     * The function to call when remove button is tapped over an entry
     */
    onRemove: PropTypes.func.isRequired,

    /**
     * The function to call when setting icon is tapped
     */
    onSettings: PropTypes.func.isRequired,
  };

  _closeApp = () => navigator.app.exitApp();

  componentWillMount() {
    document.addEventListener("backbutton", this._closeApp);
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._closeApp);
  }

  _handleEdit = entryDate => this.props.onEdit(entryDate);
  _handleDelete = entryDate => this.props.onRemove(entryDate);

  _getHeader() {
    const settingsIcon = ActionIcon({
      icon: ActionIcon.SETTINGS,
      onClick: this.props.onSettings,
    });

    const header = Header({ left: settingsIcon });

    return (
      <div className={styles.headerBackground}>
        {header}
      </div>
    );
  }

  _getList() {
    const list = this.props.entries.map((entry, index) => <ListItem
      key={index}
      date={entry.date}
      text={entry.text}
      onEdit={this._handleEdit}
      onDelete={this._handleDelete}
    />);

    return (
      <div className={styles.listContainer}>
        {list}
      </div>
    );
  }

  _getFooter() {
    const buttonImage = <div className={styles.buttonImage} />;

    const addButton = Button({
      children: buttonImage,
      onClick: this.props.onAdd,
      small: true,
    });

    return (
      <div className={styles.footerContainer}>
        {addButton}
      </div>
    );
  }

  render() {
    const header = this._getHeader();
    const main = this.props.entries.length ? this._getList() : Welcome();
    const footer = this._getFooter();

    return BaseScreen({
      header,
      main,
      footer,
    });
  }
}

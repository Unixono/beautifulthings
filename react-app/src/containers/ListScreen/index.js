import React from 'react';
import PropTypes from 'prop-types';

import ActionIcon from 'components/ActionIcon';
import BaseScreen from 'containers/BaseScreen';
import Button from 'components/Button';
import Header from 'components/Header';
import ListItem from 'components/ListItem';
import Welcome from 'components/Welcome';

export default class ListScreen extends React.PureComponent {
  static propTypes = {
    /**
     * The set of entries to draw in the list
     */
    entries: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),

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
  }

  static defaultProps = { entries: [] }

  constructor(props) {
    super(props);

    this.state = { items: props.entries }
  }

  _handleSettingsClick = () => this.props.onSettings();

  _handleEditClick = entryDate => this.props.onEdit(entryDate);
  _handleDeleteClick = entryDate => this.props.onRemove(entryDate);

  _getHeader() {
    const settingsIcon = <ActionIcon
      icon={ActionIcon.SETTINGS}
      onClick={this._handleSettingsClick}
    />;

    return <Header left={settingsIcon} />;
  }

  _getItemsList() {
    const list = this.state.items.map((entry, index) => <ListItem
      key={index}
      date={entry.date}
      text={entry.text}
      onEdit={this._handleEdit}
      onDelete={this._handleDelete}
    />);

    return <div>{list}</div>;
  }

  render() {
    const header = this._getHeader();
    const content = this.state.items.length > 0 ? this._getItemsList() : <Welcome />;
    const footer = <Button onClick={this.props.onAdd}>Add</Button>;

    return <BaseScreen
      header={header}
      main={content}
      footer={footer}
    />;
  }

}

import React from 'react';
import PropTypes from 'prop-types';

import ListScreen from 'containers/ListScreen';

export default class ListScreenWrapper extends React.PureComponent {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = { entries: null }
  }

  componentWillMount() { /* TODO: Request entries */ }

  _handleRemove = entryDate => { /* TODO: Show spinner, remove entry, update states and re-render */ }
  _handleEdit = entryDate => this.props.onEdit(entryDate);
  _handleSetting = () => { /* TODO: Show settings modal */ }

  render() {
    return <ListScreen
      entries={this.state.entries || []}
      onAdd={this.props.onAdd}
      onEdit={this._handleEdit}
      onRemove={this._handleRemove}
      onSettings={this._handleSettings}
    />;
  }
}

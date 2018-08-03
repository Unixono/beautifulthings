import React from 'react';
import PropTypes from 'prop-types';

import api from 'api';

import { getCurrentDateString } from 'utils/date';
import { createEntry } from 'utils/entry';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';
import { setNotifications } from 'notifications';

import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';
import ListScreen from 'containers/ListScreen';
import SettingsModal from 'components/SettingsModal';

export default class ListScreenWrapper extends React.PureComponent {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
  }

  state = {
    entries: [],
    entryToDelete: null,
    isSettingsModalVisible: false,
  };

  async componentWillMount() {
    const currentDate = getCurrentDateString();

    showLoadingModal('Loading...');
    try {
      const entries = await api.getEntries('2018-01-01', currentDate);
      if (entries.length) this.setState({ entries });
    } catch (error) { /* TODO: TBD */ }
    hideLoadingModal();
  }

  _openSettingsModal = () => this.setState({ isSettingsModalVisible: true });

  _closeSettingsModal = isDaily => {
    setNotifications(isDaily);
    this.setState({ isSettingsModalVisible: false });
  }

  _handleSignOut = () => {
    api.signOut()
      .then(this.props.onSignOut)
  }

  _setEntryToDelete = entryDate => this.setState({ entryToDelete: entryDate });
  _unsetEntryToDelete = () => this.setState({ entryToDelete: null });

  _removeEntry = async () => {
    const { entries, entryToDelete } = this.state;
    const emptyEntry = createEntry(entryToDelete, '');

    showLoadingModal('Loading...');
    try {
      const success = await api.addEntry(emptyEntry);

      if (success) {
        const remainingEntries = entries.filter(entry => entry.date !== entryToDelete);

        this.setState({
          entries: remainingEntries,
          entryToDelete: null,
        });
      } else {
        /* TODO: TBD */
      }
    } catch (error) {
      /* TODO: TBD */
    } finally {
      hideLoadingModal();
    }
  }

  _getSettingsModal() {
    // TODO: Get current notifications configuration of the account

    return <SettingsModal
      visible={this.state.isSettingsModalVisible}
      username={api.username}
      daily={true}
      onHide={this._closeSettingsModal}
      onSignOut={this._handleSignOut}
    />
  }

  _getDeleteModal() {
    const deleteButton = Button({
      children: "Yes",
      onClick: this._removeEntry,
      small: true,
    });

    const cancelButton = Button({
      children: "No",
      onClick: this._unsetEntryToDelete,
      small: true,
    });

    return ButtonsModal({
      visible: this.state.entryToDelete,
      message: "Are you sure you want to delete?",
      primaryButton: deleteButton,
      secondaryButton: cancelButton,
    });
  }

  _getListScreen() {
    const { onAdd, onEdit } = this.props;

    return ListScreen({
      entries: this.state.entries || [],
      onAdd: onAdd,
      onEdit: onEdit,
      onRemove: this._setEntryToDelete,
      onSettings: this._openSettingsModal,
    });
  }

  render() {
    const settingsModal = this._getSettingsModal();
    const deleteModal = this._getDeleteModal();
    const listScreen = this._getListScreen();

    return (
      <div>
        {settingsModal}
        {deleteModal}
        {listScreen}
      </div>
    );
  }
}

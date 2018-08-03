import React from 'react';
import PropTypes from 'prop-types';

import api from 'api';

import { getCurrentDateString } from 'utils/date';
import { createEntry } from 'utils/entry';
import { showErrorModal } from 'utils/errorModal';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';
import { setNotifications, isDailyScheduled } from 'notifications';

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
    isDaily: true,
  };

  async componentWillMount() {
    const currentDate = getCurrentDateString();

    showLoadingModal('Loading...');
    try {
      const isDaily = await isDailyScheduled();
      const entries = await api.getEntries('2018-01-01', currentDate);

      if (entries.length) {
        this.setState({
          isDaily,
          entries,
        });
      } else {
        this.setState({ isDaily });
      }
    } catch (error) {
      showErrorModal('Cannot get the entries...');
    } finally {
      hideLoadingModal();
    }
  }

  _setSettingsModalRef = element => this._settingsModal = element;

  _openSettingsModal = () => this._settingsModal.show(this.state.isDaily);
  _closeSettingsModal = isDaily => {
    setNotifications(isDaily);
    this.setState({ isDaily });
  }

  _handleSignOut = async () => {
    await api.signOut();
    this.props.onSignOut();
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
        showErrorModal('Cannot delete the entry...');
      }
    } catch (error) {
      showErrorModal('Cannot delete the entry...');
    } finally {
      hideLoadingModal();
    }
  }

  _getSettingsModal() {
    return <SettingsModal
      username={api.username}
      onHide={this._closeSettingsModal}
      onSignOut={this._handleSignOut}
      ref={this._setSettingsModalRef}
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

    return <ListScreen
      entries={this.state.entries || []}
      onAdd={onAdd}
      onEdit={onEdit}
      onRemove={this._setEntryToDelete}
      onSettings={this._openSettingsModal}
    />;
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

import React from 'react';
import PropTypes from 'prop-types';

import api from 'api';

import { getCurrentDateString } from 'utils/date';
import { createEntry } from 'utils/entry';
import { showErrorModal } from 'utils/errorModal';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';
import EditScreen from 'containers/EditScreen';

export default class EditScreenWrapper extends React.PureComponent {
  static propTypes = {
    match: PropTypes.any.isRequired,
    onBack: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = {
    date: this.props.match.params.date || getCurrentDateString(),
    text: '',
    unsavedChangesModalVisible: false,
  };

  async componentWillMount() {
    const dateToEdit = this.props.match.params.date;

    if (!dateToEdit) return;

    showLoadingModal('Loading...');
    try {
      const entries = await api.getEntries(dateToEdit, dateToEdit);
      const entryText = entries[0].text;
      this.setState({ text: entryText });
    } catch (error) {
      showErrorModal('Cannot get the entry text...');
    } finally {
      hideLoadingModal();
    }
  }

  _handleBack = (entryDate, entryText) => {
    const { date, text } = this.state;

    if (date !== entryDate || text !== entryText) this._showUnsavedChangesModal();
    else this.props.onBack();
  }

  _handleSave = async (date, text) => {
    const entry = createEntry(date, text);

    showLoadingModal('Saving...');
    try {
      const success = await api.addEntry(entry);

      if (success) this.props.onSave();
      else showErrorModal('Cannot be saved...');
    } catch (error) {
      showErrorModal('Cannot be saved...');
    } finally {
      hideLoadingModal();
    }
  }

  _showUnsavedChangesModal = () => this.setState({ unsavedChangesModalVisible: true });
  _hideUnsavedChangesModal = () => this.setState({ unsavedChangesModalVisible: false });

  _getUnsavedChangesModal() {
    const doNotLeaveButton = Button({
      children: "No",
      onClick: this._hideUnsavedChangesModal,
      small: true,
    });

    const leaveButton = Button({
      children: "Yes",
      onClick: this.props.onBack,
      small: true,
    });

    return ButtonsModal({
      visible: this.state.unsavedChangesModalVisible,
      message: "Do you want to discard changes?",
      primaryButton: doNotLeaveButton,
      secondaryButton: leaveButton,
    });
  }

  render() {
    const { date, text } = this.state;
    const unsavedChangesModal = this._getUnsavedChangesModal();

    return (
      <div>
        {unsavedChangesModal}
        <EditScreen
          date={date}
          text={text}
          onBack={this._handleBack}
          onSave={this._handleSave}
        />
      </div>
    );
  }
}

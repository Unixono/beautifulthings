import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { editEntryAsync } from 'actions/entriesByDate';

import { changeHash, SCREENS_HASHES } from 'AppRouter';
import { showAlertModal } from 'utils/alertModal';
import { showLoadingModal, hideLoadingModal } from 'utils/spinner';

import Button from 'components/Button';
import ButtonsModal from 'components/ButtonsModal';
import EditScreen from 'components/EditScreen';

class EditScreenContainer extends React.PureComponent {
  static propTypes = {
    /**
     * React Router match prop
     */
    match: PropTypes.shape({
      params: PropTypes.shape({
        date: PropTypes.string,
      })
    }).isRequired,

    /**
     * Key pair object that contains the text of each entry by date
     */
    entriesByDate: PropTypes.shape({
      date: PropTypes.string,
      text: PropTypes.string,
    }).isRequired,

    /**
     * Redux dispatch function
     */
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._initialDate = props.match.params.date;
    this._initialText = props.entriesByDate[this._initialDate] || "";

    this.state = {
      discardChangesModalVisible: false,
    }
  }

  componentDidMount() {
    document.addEventListener("backbutton", this._onBack);
  }

  componentWillUnmount() {
    document.removeEventListener("backbutton", this._onBack);
  }

  _toggleDiscardCangesModalVisibility = () => {
    this.setState({ discardChangesModalVisible: !this.state.discardChangesModalVisible });
  }

  _goBack = () => changeHash(SCREENS_HASHES.list);

  _onBack = (date, text) => {
    if (date === this._initialDate && text === this._initialText) this._goBack();
    else this._toggleDiscardCangesModalVisibility();
  }

  _onSave = async (date, text) => {
    if (!text) {
      showAlertModal("Text entry cannot be empty");
      return;
    }

    try {
      showLoadingModal("Saving");
      const edited = await editEntryAsync(date, text)(this.props.dispatch);

      if (edited) this._goBack();
      else showAlertModal("Cannot save the entry");
    } catch (error) {
      showAlertModal("Cannot connect to the server");
    } finally {
      hideLoadingModal();
    }
  }

  render() {
    const discardChangesBtn = (
      <Button onClick={this._goBack} small>
        <FormattedMessage id="Yes" />
      </Button>);

    const avoidDiscardChangesBtn = (
      <Button onClick={this._toggleDiscardCangesModalVisibility} small>
        <FormattedMessage id="No" />
      </Button>
    );

    return (
      <div>
        <ButtonsModal
          visible={this.state.discardChangesModalVisible}
          message="Discard changes?"
          primaryButton={discardChangesBtn}
          secondaryButton={avoidDiscardChangesBtn}
        />
        <EditScreen
          date={this._initialDate}
          text={this._initialText}
          onBack={this._onBack}
          onSave={this._onSave}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  entriesByDate: state.entriesByDate,
});

export default connect(mapStateToProps)(EditScreenContainer);

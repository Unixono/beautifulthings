import ReactDOM from 'react-dom';

import ErrorModal from 'components/ErrorModal';

const container = document.getElementById('error');

function showErrorModal(message = 'Error...') {
  const modal = ErrorModal({
    message,
    onClose: hideErrorModal,
  });

  ReactDOM.render(modal, container);
}

function hideErrorModal() {
  ReactDOM.unmountComponentAtNode(container);
}

export { showErrorModal }

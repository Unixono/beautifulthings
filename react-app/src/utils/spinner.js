import ReactDOM from 'react-dom';

import LoadingModal from 'components/LoadingModal';

const container = document.getElementById('spinner');

function showLoadingModal(message = 'Loading...') {
  const modal = LoadingModal({
    visible: true,
    message,
  });

  ReactDOM.render(modal, container);
}

function hideLoadingModal() {
  ReactDOM.unmountComponentAtNode(container);
}

export { showLoadingModal, hideLoadingModal }

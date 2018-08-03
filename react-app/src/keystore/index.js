let _storage = null;

function init() {
  return new Promise((resolve, reject) => {
    const onSuccess = () => resolve();
    const onError = error => reject(error);

    _storage = new window.cordova.plugins.SecureStorage(
      onSuccess,
      onError,
      'BeautifulThings'
    );
  });
}

function set(key, value) {
  return new Promise((resolve, reject) => {
    const onSuccess = () => resolve();
    const onError = error => reject(error);

    _storage.set(
      onSuccess,
      onError,
      key,
      value
    );
  });
}

function get(key) {
  return new Promise((resolve, reject) => {
    const onSuccess = value => resolve(value);
    const onError = error => reject(error);

    _storage.get(
      onSuccess,
      onError,
      key
    );
  });
}

function clear() {
  return new Promise((resolve, reject) => {
    const onSuccess = () => resolve();
    const onError = error => reject(error);

    _storage.clear(
      onSuccess,
      onError
    );
  });
}

export { init, set, get, clear }

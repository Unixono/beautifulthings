import Account from 'account';
import { createEntry } from 'utils/entry';

const _HOST = 'http://localhost/';

class ErrorCannotGetEntries extends Error {}

class Api {
  initAccount(username, keyPair) {
    this._account = new Account(username, keyPair);
  }

  _getUrl(path) {
    let url = `${_HOST}${path}`;
    if (this._token) url += `?token=${this._token}`;

    return url;
  }

  async _get(path) {
    const url = this._getUrl(path);

    return fetch(url);
  }

  async _post(path, body) {
    const url = this._getUrl(path);

    const options = {
      method: 'POST',
      body
    }

    return fetch(url, options);
  }

  async signUp() {
    const data = this._account.toString();
    const response = await this._post('signup', data);

    return response.ok;
  }

  async signIn() {
    const data = this._account.toString();
    const response = await this._post('signin', data);

    if (!response.ok) return false;

    const receivedJson = await response.json();
    const encryptedToken = receivedJson.EncryptedToken;
    this._token = this._account.decrypt(encryptedToken);

    return true;
  }

  async addEntry(entry) {
    const cipherText = this._account.encrypt(entry.text);
    const data = JSON.stringify({
      Date: entry.date,
      Ct: cipherText,
    });

    const response = await this._post('things', data);

    return response.ok;
  }

  async getEntries(from, to) {
    const response = await this._get(`things/${from}/${to}`);

    if (!response.ok) throw new ErrorCannotGetEntries();

    const encryptedEntries = await response.json();
    if (!encryptedEntries) return [];

    const decryptedEntries = [];
    encryptedEntries.forEach(entry => {
      const decryptedText = this._account.decrypt(entry.Content);

      if (decryptedText.length) decryptedEntries.push(createEntry(entry.Date, decryptedText));
    });

    return decryptedEntries;
  }
}

const api = new Api();

export default api;
export { ErrorCannotGetEntries }

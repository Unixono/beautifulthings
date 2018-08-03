import Account from 'account';
import * as keystore from 'keystore';
import { createEntry } from 'utils/entry';
import { setNotifications, clearNotifications } from 'notifications';

const _HOST = 'https://server.beautifulthings.app/';

class ErrorCannotGetEntries extends Error {}

class Api {
  constructor() {
    this._username = null;
    this._token = null;
  }

  initAccount(username, keyPair) {
    this._username = username;
    this._account = new Account(username, keyPair);
  }

  get username() {
    return this._username;
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

    await this._saveAccountData();

    await setNotifications();

    return true;
  }

  async signOut() {
    await this._clearAccountSavedData();

    await clearNotifications();
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

  _decryptReceivedEntry = entry => createEntry(entry.Date, this._account.decrypt(entry.Content));

  async getEntries(from, to) {
    const response = await this._get(`things/${from}/${to}`);

    if (!response.ok) throw new ErrorCannotGetEntries();

    const encryptedEntries = await response.json();
    if (!encryptedEntries) return [];

    const decryptedEntries = encryptedEntries.map(this._decryptReceivedEntry);

    return decryptedEntries;
  }

  async _saveAccountData() {
    try {
      const serializedAccount = this._account.serialize();

      await keystore.init();
      await keystore.set('token', this._token);
      await keystore.set('account', serializedAccount);
    } catch (error) {
      /* Nothing here. If the account data cannot be saved, the app works normally without this feature */
    }
  }

  async _clearAccountSavedData() {
    try {
      await keystore.init();
      await keystore.clear();
    } catch (error) {
      /* Nothing here. If the account data cannot be deleted, the app works normally without this feature */
    }
  }

  async initSavedAccount() {
    let savedAccountSuccessfulyInitialized = false;

    try {
      await keystore.init();
      const savedToken = await keystore.get('token');
      const serializedSavedAccount = await keystore.get('account');

      const deserializedSavedAccount = JSON.parse(serializedSavedAccount);

      const savedAccountUsername = deserializedSavedAccount.username;
      const savedAccountKeyPair = {
        publicKey: Uint8Array.from(deserializedSavedAccount.publicKey),
        secretKey: Uint8Array.from(deserializedSavedAccount.secretKey),
      };

      this._token = savedToken;
      this.initAccount(savedAccountUsername, savedAccountKeyPair);

      savedAccountSuccessfulyInitialized = true;
    } catch (error) {
      /* Nothing here. If the account data cannot be loaded, the app works normally and user must signin */
    }

    return savedAccountSuccessfulyInitialized;
  }
}

const api = new Api();

export default api;
export { ErrorCannotGetEntries }

import scrypt from 'scrypt-async';
import nacl from 'tweetnacl';
import sha256 from 'fast-sha256';
import blake from 'blakejs';
import { getTzOffset, getTzFromOffset } from 'utils/timezone';

nacl.util = require('tweetnacl-util');

class ErrorAuthenticationFail extends Error {}

class Account {
  static validateUsername(username) {
    return username.length > 0;
  }

  static validatePassword(password) {
    return password.length > 6;
  }

  static generateKeyPair(username, password) {
    return new Promise(resolve => {
      const hashedPassword = sha256(nacl.util.decodeUTF8(password));
      const salt = sha256(nacl.util.decodeUTF8(username));
      const options = {
        N: 1 << 16,
        r: 8,
        p: 1,
        dkLen: 32,
        interruptStep: 10,
        encoding: 'binary'
      };

      const callback = (derivedKey) => {
        resolve(nacl.box.keyPair.fromSecretKey(derivedKey));
      }

      scrypt(hashedPassword, salt, options, callback);
    });
  }

  constructor(username, keyPair) {
    this._username = username;
    this._pk = keyPair.publicKey;
    this._sk = keyPair.secretKey;
    this._offset = getTzOffset();
    this._tz = getTzFromOffset(this._offset);
  }

  toString() {
    const pkAsArray = Array.from(this._pk);
    return JSON.stringify({
      Username: this._username,
      Pk: pkAsArray,
      Tz: this._tz,
      Offset: this._offset
    });
  }

  serialize() {
    const publicKey = Array.from(this._pk);
    const secretKey = Array.from(this._sk);

    return JSON.stringify({
      username: this._username,
      publicKey,
      secretKey,
    });
  }

  _generateNonce(publicKeyA, publicKeyB) {
    const nonceComputeLength = 32;
    const nonceExpectedLength = 24;
    let state = blake.blake2bInit(nonceComputeLength, null);
    blake.blake2bUpdate(state, publicKeyA);
    blake.blake2bUpdate(state, publicKeyB);
    return blake.blake2bFinal(state).subarray(0, nonceExpectedLength);
  }

  encrypt(plainText) {
    const messageToEncrypt = nacl.util.decodeUTF8(plainText);
    const ephemeralKeyPair = nacl.box.keyPair();
    const nonce = this._generateNonce(ephemeralKeyPair.publicKey, this._pk);
    const cipherText
      = nacl.box(messageToEncrypt, nonce, this._pk, ephemeralKeyPair.secretKey);

    const output = new Uint8Array(nacl.box.publicKeyLength + cipherText.length);
    output.set(ephemeralKeyPair.publicKey);
    output.set(cipherText, nacl.box.publicKeyLength);

    return nacl.util.encodeBase64(output);
  }

  decrypt(cipherText) {
    const input = nacl.util.decodeBase64(cipherText);
    const originalEphemeralPublicKey = input.subarray(0, nacl.box.publicKeyLength);

    const nonce = this._generateNonce(originalEphemeralPublicKey, this._pk);
    const encryptedMessage = input.subarray(nacl.box.publicKeyLength);
    const decryptedMessage
      = nacl.box.open(encryptedMessage, nonce, originalEphemeralPublicKey, this._sk);

    if (decryptedMessage === null) throw new ErrorAuthenticationFail();

    return nacl.util.encodeUTF8(decryptedMessage);
  }
}

export default Account;
export { ErrorAuthenticationFail }

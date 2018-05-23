import * as api from './mock-api.js';

afterEach(() => api.clearDatabase());

describe('initializes database with one user logged-in with one entry', () => {
  beforeEach(() => api.initializeMockDatabase({
    usersById: {
      'user-id-1': {
        username: 'username',
        password: 'password'
      }
    },
    entriesById: {
      'entry-id-1': {
        date: '2018-01-01',
        text: 'Original text'
      }
    },
    entriesByUser: {
      'user-id-1': ['entry-id-1']
    },
    entriesByUserByDate: {
      'user-id-1-2018-01-01': 'entry-id-1'
    },
    preferencesByUser: {
      'user-id-1': {
        notification: 'weekly'
      }
    }
  }));

  test('signups successfully with an unexisting username', async () => {
    expect.assertions(2);
    await expect(api.signUp('unexistingUsername', 'unexistingPassword', 0))
      .resolves.toBeNull();
    expect(api.getDatabase().usersById['user-id-2'].username).toBe('unexistingUsername');
  });

  test('signups unsuccessfully with an existing username', async () => {
    expect.assertions(1);
    await expect(api.signUp('username', 'password', 0))
      .rejects.toBeInstanceOf(api.ErrorUsernameAlreadyExists);
  });

  test('signins successfully with an existing username and password', async () => {
    expect.assertions(1);
    await api.signIn('username', 'password', 0)
      .then(token => expect(typeof token).toBe('string'));
  });

  test('signins unsuccessfully with unexisting username', async () => {
    expect.assertions(1);
    await expect(api.signIn('unexistingUsername', 'unexistingPassword', 0))
      .rejects.toBeInstanceOf(api.ErrorInvalidUsernameOrPassword);
  });

  test('signins unsuccessfully with wrong password', async () => {
    expect.assertions(1);
    await expect(api.signIn('username', 'invalidPassword', 0))
      .rejects.toBeInstanceOf(api.ErrorInvalidUsernameOrPassword);
  });

  test('sets successfully a new entry', async () => {
    expect.assertions(2);
    await expect(api.set('token', new Date().toISOString().slice(0, 10), 'New message', 0))
      .resolves.toBeNull();
    expect(api.getDatabase().entriesById['entry-id-2'].text).toBe('New message');
  });

  test('sets successfully an existing entry', async () => {
    expect.assertions(2);
    await expect(api.set('token', '2018-01-01', 'New text', 0)).resolves.toBeNull();
    expect(api.getDatabase().entriesById['entry-id-1'].text).toBe('New text');
  });

  test('enumerates successfully existing entries', async () => {
    expect.assertions(2);
    await api.enumerate('token', '1900-01-01', '2050-01-01', 0)
      .then(result => expect(result.entries.length).toBe(1));
      await api.enumerate('token', '1900-01-01', '1900-01-01', 0)
      .then(result => expect(result.entries.length).toBe(0));
  });

  test('sets successfully an existing user preference', async () => {
    expect.assertions(2);
    await expect(api.setPref('token', 'notification', 'monthly', 0)).resolves.toBeNull();
    expect(api.getDatabase().preferencesByUser['user-id-1'].notification).toBe('monthly');
  });

  test('gets successfully user preferences', async () => {
    expect.assertions(1);
    await api.getPref('token', 0)
      .then(response => expect(response)
        .toEqual(api.getDatabase().preferencesByUser['user-id-1']));
  });
});

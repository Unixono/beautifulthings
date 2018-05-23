const DEFAULT_DELAY_MS = 1000;

let db = {
  usersById: {
    'user-id-1': {
      username: 'demouser',
      password: 'demopass'
    }
  },
  entriesById: {},
  entriesByUser: {
    'user-id-1': []
  },
  entriesByUserByDate: {},
  preferencesByUser: {
    'user-id-1': {
      notification: 'weekly'
    }
  }
}

export function initializeMockDatabase(mockDb) {
  db = mockDb;
}

export function clearDatabase() {
  db = {
    usersById:            {},
    entriesById:          {},
    entriesByUser:        {},
    entriesByUserByDate:  {},
    preferencesByUser:    {}
  }
}

export function getDatabase() {
  return db;
}

function _wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function _getUserIdByToken(token) {
  return 'user-id-1';
}

function _getEntriesByUserId(userId) {
  return db.entriesByUser[userId].map(entryId => db.entriesById[entryId]);
}

function _getNextUserIdKey() {
  return `user-id-${(Object.keys(db.usersById).length + 1)}`;
}

function _getNextEntryIdKey() {
  return `entry-id-${(Object.keys(db.entriesById).length + 1)}`;
}

function _getEntryKeyByUserIdByDate(userId, date) {
  return `${userId}-${date}`;
}

export async function signUp(username, password, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  for (let userId in db.usersById) {
    if (db.usersById[userId].username === username) {
      throw new ErrorUsernameAlreadyExists();
    }
  }

  const newUserId = _getNextUserIdKey();
  db.usersById[newUserId] = {
    username,
    password
  }
  db.entriesByUser[newUserId] = [];
  db.preferencesByUser[newUserId] = {
    notification: 'weekly'
  }

  return null;
}

export async function signIn(username, password, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  for (let userId in db.usersById) {
    let userData = db.usersById[userId];
    if (userData.username === username && userData.password === password) {
      return Math.random().toString(36).substr(2);
    }
  }

  throw new ErrorInvalidUsernameOrPassword();
}

export async function set(token, date, text, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);

  const entryIdForUserAtDate = db.entriesByUserByDate[_getEntryKeyByUserIdByDate(userId, date)];
  if (entryIdForUserAtDate !== undefined) {
    db.entriesById[entryIdForUserAtDate].text = text;
  } else {
    const newEntryId = _getNextEntryIdKey();
    db.entriesById[newEntryId] = {
      date,
      text
    }
    db.entriesByUser[userId].push(newEntryId);
    db.entriesByUserByDate[_getEntryKeyByUserIdByDate(userId, date)] = newEntryId;
  }

  return null;
}

export async function enumerate(token, from, to, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);

  const entries = _getEntriesByUserId(userId)
    .filter(entry => new Date(from) <= new Date(entry.date) && new Date(entry.date) <= new Date(to));

  return { entries };
}

export async function setPref(token, key, value, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);

  db.preferencesByUser[userId][key] = value;
  return null;
}

export async function getPref(token, delay = DEFAULT_DELAY_MS) {
  await _wait(delay);
  const userId = _getUserIdByToken(token);

  return db.preferencesByUser[userId];
}

export class ErrorUsernameAlreadyExists extends Error {}
export class ErrorInvalidUsernameOrPassword extends Error {}

const DAILY_NOTIFICATION_ID = 1;
const WEEKLY_NOTIFICATION_ID = 2;

const SUNDAY_WEEKDAY = 7;

function _showAddScreen() {
  window.location.hash = '/add';
}

function setNotifications(daily = true) {
  const notification = {
    id: DAILY_NOTIFICATION_ID,
    title: 'BeautifulThingsApp',
    text: 'What\'s your beautiful thing today?',
    icon: 'res://icon',
    vibrate: true,
    foreground: true,
    trigger: {
      every: {
        hour: 22,
        minute: 0,
      },
    }
  }

  if (!daily) {
    notification.id = WEEKLY_NOTIFICATION_ID;
    notification.trigger.every.weekday = SUNDAY_WEEKDAY;
  }

  return new Promise(resolve => {
    const callback = () => {
      window.cordova.plugins.notification.local.on('click', _showAddScreen);
      resolve();
    }

    clearNotifications()
      .then(() => window.cordova.plugins.notification.local.schedule(notification, callback));
  });
}

function clearNotifications() {
  return new Promise(resolve => {
    const callback = () => resolve();

    window.cordova.plugins.notification.local.cancelAll(callback);
  });
}

function isDailyScheduled() {
  return new Promise(resolve => {
    const callback = isScheduled => resolve(isScheduled);

    window.cordova.plugins.notification.local.isScheduled(DAILY_NOTIFICATION_ID, callback);
  });
}

export { setNotifications, clearNotifications, isDailyScheduled }

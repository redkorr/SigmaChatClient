async function checkClientIsVisible() {
  const windowClients = await clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  for (var i = 0; i < windowClients.length; i++) {
    if (windowClients[i].visibilityState === 'visible') {
      return true;
    }
  }

  return false;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('push', function (event) {
  event.waitUntil(
    checkClientIsVisible().then((isVisible) => {
      if (isVisible) return;

      if (event && event.data) {
        const data = event.data.json();
        return self.registration.showNotification(data.title, {
          body: data.body,
          icon: data.icon || null,
          badge: data.icon || null
        });
      }
    }));
});

self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification.tag);
  // Android doesn't close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == '/' && 'focus' in client)
            return client.focus();
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

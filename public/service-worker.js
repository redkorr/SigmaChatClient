async function checkClientIsVisible() {
  const windowClients = await clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  for (var i = 0; i < windowClients.length; i++) {
    if (windowClients[i].visibilityState === "visible") {
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
          icon: data.icon || null
        });
      }
    }));
});

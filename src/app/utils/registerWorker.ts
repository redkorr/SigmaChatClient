export const registerNotificationWorker = async () => {
    Notification.requestPermission().then((result) => {
        console.log(result + 'grubo');
    });

    if ('serviceWorker' in navigator) {
        const serviceWorkerRegistration = await navigator.serviceWorker.register('/service-worker.js')

        const res = await fetch('api/web-push/key');
        const response = await res.json();

        const pushSubscription = await serviceWorkerRegistration.pushManager
            .subscribe({
                applicationServerKey: response.publicKey,
                userVisibleOnly: true,
            });

        fetch('api/web-push/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pushSubscription),
        });
    }
}

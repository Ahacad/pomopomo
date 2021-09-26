export function notify(title: string, options?: NotificationOptions) {
  if (!("Notification" in window)) {
    console.warn("Notification not supported in this browser");
  } else if (Notification.permission === "granted") {
    let notification = new Notification(title, options);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        let notification = new Notification(title, options);
      }
    });
  }
}

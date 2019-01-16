importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
 self.addEventListener('push', function(event) {
     var myNotif = event.data.json();
    console.log(myNotif);
    const promiseChain = self.registration.showNotification(myNotif.notification.title, myNotif.notification);
     event.waitUntil(promiseChain);
});
 self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
    //   clients.openWindow('http://www.google.com');
      notification.close();
    }
  }); 
this.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.js',
          '/index.html',
          '/page hors connexion.html',
          '/mobile2.jpg',
          '/ordinateur.png',
          '/tablettes.jpg',
          '/icon1.png',
          '/icon-192x192.png',
          '/icon-256x256.png',
          '/icon-384x384.png',
          '/icon-512x512.png',
          '/bootstrap-5.1.3-dist/js/bootstrap.bundle.min.js',
          '/bootstrap-5.1.3-dist/css/bootstrap.min.css',
          '/icons-1.7.2/font/bootstrap-icons.css'
          
            
        ]);
      })
    );
  });
 
 this.addEventListener('fetch', function(event) {
  console.log("Fetching ..." + event.request.url);
  event.respondWith(cacheOrNetwork(event.request).catch(() => fallbackVersPageHorsLigne()));
});


function cacheOrNetwork(request) {
return fromCache(request).catch(() => fetch(request));
};

function fromCache(request) {
return caches.open('v1').then(function (cache) {
  return cache.match(request).then(function (matching) {
    return matching || Promise.reject('no-match');
  });
});
}

function fallbackVersPageHorsLigne() {
return caches.match("/page hors connexion.html");
}


// self.addEventListener('push', function (e) {
//   console.log("push recu: " + e);
//   envoyerNotification();
// });


// function envoyerNotification() {
//   if (Notification.permission === 'granted') {
//       var options = {
//           body: 'Ma première notification',
//           requireInteraction: true
//       };

//       self.registration.showNotification('Hello', options);
//   } else {
//       console.log("aucune notification car non permis");
//   }
// } 



// var button = document.getElementById("notifications");
// button.addEventListener('click', function(e) {
//     Notification.requestPermission().then(function(result) {
//         if(result === 'granted') {
//             randomNotification();
//         }
//     });
// });



  // this.addEventListener('fetch', function(event) {

  //   console.log("Fetching ..." + event.request.url);

  //   event.respondWith(caches.match(event.request).then(function(response) {
      
  //     if (response !== undefined) {
  //       return response;
  //     } else {

  //       console.log("Fetching from fetch ..." + event.request.url);

  //       return fetch(event.request);
  //     }
  //   }));
  // });
  
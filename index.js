if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('sw.js').then(
        (registration) => {
            console.log('Service worker registration succeeded:', registration)
        },
      /*catch*/(error) => {
            console.log('Service worker registration failed:', error)
        }
    )
} else {
    console.log('Service workers are not supported.')
}


function meNotifier() {
    Notification.requestPermission().then(function (result) {
        console.log("permission donnée");
    });
}

function envoyerNotificationThreadUtilisateur() {
    if (Notification.permission === 'granted') {
        var options = {
            body: 'Ma première notification depuis index.js',
            requireInteraction: true
        };

        const notification = new Notification('Hello depuis index.js', options);
    } else {
        console.log("aucune notification car non permis");
    }
}




// lancer toast au demarage de mon API
Toasty();



// Initialize deferredPrompt for use later to show browser install prompt.

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile

  e.preventDefault();
  
  // Stash the event so it can be triggered later.

  deferredPrompt = e;

  // Update UI notify the user they can install the PWA

  showInstallPromotion();

  // Optionally, send analytics event that PWA install promo was shown.

  console.log(`'beforeinstallprompt' event was fired.`);

  // const installAppButton = document.getElementById('installAppButton');

  // if (installAppButton) {
  //   installAppButton.addEventListener('click', function () {

      deferredPrompt.prompt();

    // })
  // }
});

var option = {
  animation: true,
  delay: 4000
};
function Toasty() {
  var toastHTMLElement = document.getElementById("EpicToast");
  var toastElement = new bootstrap.Toast(toastHTMLElement, option);
  toastElement.show();
}


// installAppButton .addEventListener('click', async () => {
//   // Hide the app provided install promotion
//   hideInstallPromotion();
//   // Show the install prompt
//   deferredPrompt.prompt();
//   // Wait for the user to respond to the prompt
//   const { outcome } = await deferredPrompt.userChoice;
//   // Optionally, send analytics event with outcome of user choice
//   console.log(`User response to the install prompt: ${outcome}`);
//   // We've used the prompt, and can't use it again, throw it away
//   deferredPrompt = null;
// });
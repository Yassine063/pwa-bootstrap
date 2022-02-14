"use strict";

const notificationButton = document.getElementById("enableNotifications");
let swRegistration = null;

initializeApp();

function initializeApp() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push is supported");

    //Register the service worker
    navigator.serviceWorker
      .register("../../sw.js")
      .then(swReg => {
        console.log("Service Worker is registered", swReg);

        swRegistration = swReg;
        initializeUi();
      })
      .catch(error => {
        console.error("Service Worker Error", error);
      });
  } else {
    console.warn("Push messaging is not supported");
    notificationButton.textContent = "Push Not Supported";
  }
}

function initializeUi() {
  notificationButton.addEventListener("click", () => {
    displayNotification();
  });
}

function displayNotification() {
  if (window.Notification && Notification.permission === "granted") {
    notification();
  }
  // If the user hasn't told if he wants to be notified or not
  // Note: because of Chrome, we are not sure the permission property
  // is set, therefore it's unsafe to check for the "default" value.
  else if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(status => {
      if (status === "granted") {
        notification();
      } else {
        alert("You denied or dismissed permissions to notifications.");
      }
    });
  } else {
    // If the user refuses to get notified
    alert(
      "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
    );
  }
}

function notification() {
  const options = {
    body: "Testing Our Notification",
    icon: "./bell.png"
  };
  swRegistration.showNotification("PWA Notification!", options);
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
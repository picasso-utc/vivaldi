// // CODELAB: Add event listener for beforeinstallprompt event
// window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// // CODELAB: Add code to save event & show the install button.
// deferredInstallPrompt = evt;
// installButton.removeAttribute('hidden');

// // CODELAB: Add code show install prompt & hide the install button.
// deferredInstallPrompt.prompt();
// // Hide the install button, it can't be called twice.
// evt.srcElement.setAttribute('hidden', true);


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  installButton.removeAttribute('hidden');

    // CODELAB: Add code show install prompt & hide the install button.
    deferredPrompt.prompt();
    // Hide the install button, it can't be called twice.
    // evt.srcElement.setAttribute('hidden', true);
});
// window.addEventListener('load', () => {
//     //select the button with ID pwaAppInstallBtn
//     const pwaAppInstallBtn = document.getElementById("installApp");
//     pwaAppInstallBtn.addEventListener('click', async () => {
//         if (deferredPrompt !== null) {
//             deferredPrompt.prompt();
//             const { outcome } = await deferredPrompt.userChoice;
//             if (outcome === 'accepted') {
//                 deferredPrompt = null;
//             }
//         } else {
//             console.log("deferred prompt is null [Website cannot be installed]")
//         }
//     });
// })

$('#openOptions').click(function(){
    $('#options').removeClass('off');
})

$('#closeOptions').click(function(){
    $('#options').addClass('off');
})
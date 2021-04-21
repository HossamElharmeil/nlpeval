import { checkForUrl } from './js/urlChecker'
import { handleSubmit } from './js/formHandler'

import './styles/resets.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/base.scss'

window.checkForUrl = checkForUrl
window.handleSubmit = handleSubmit

document.getElementById('back').addEventListener("click", () => {
    document.getElementById('results-div').classList.remove('active')
    document.getElementById('form').classList.remove('hidden')
})

if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
 }
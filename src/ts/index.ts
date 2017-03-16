import '../scss/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.css';


navigator.serviceWorker.register('/service-worker.js').then(reg => {
  console.log('◕‿◕', reg);
}, err => {
  console.log('ಠ_ಠ', err);
});

$(document).ready(() => {
	console.log('Document ready');
})

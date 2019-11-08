const $ = require('jquery');
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const {getBusinesses, getOwners} = require('./api.js');
console.log("in index");

$('.carousel').carousel({
    interval: 4000
});


getBusinesses().then((businesses) => {
  businesses.forEach(({id, name, address}) => {
    console.log(`id#${id} - ${name} - ${address}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


getOwners().then((owners) => {
  owners.forEach(({id, businessId, firstName, lastName}) => {
    console.log(`id#${id} - ${businessId} - ${firstName} - ${lastName}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

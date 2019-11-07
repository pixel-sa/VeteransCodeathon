/**
 * require style imports
 */
const {getBusinesses, getOwners} = require('./api.js');

console.log("in index");

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

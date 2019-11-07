/**
 * require style imports
 */
const {getRestaurants} = require('./api.js');

getRestaurants().then((restaurants) => {
  console.log('Here are all the movies:');
  restaurants.forEach(({id, first_name, last_name, email}) => {
    console.log(`id#${id} - ${first_name} - ${last_name} - ${email}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

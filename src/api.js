module.exports = {
  getRestaurants: () => {
    return fetch('/api/restaurants')
      .then(response => response.json());
  }
};

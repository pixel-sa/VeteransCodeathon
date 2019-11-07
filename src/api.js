module.exports = {
  getBusinesses: () => {
    return fetch('/api/business')
      .then(response => response.json());
  },

  getOwners: () => {
    return fetch('/api/owner')
      .then(response => response.json());
  }
};

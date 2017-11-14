const urls = {
  searchRepos: (query, sort, order, page = 1) =>
    `/search/repositories?q=${query}&sort=${sort}&order=${order}&page=${page}`
};

class Api {
  constructor({ baseUrl, dependencies: { request } }) {
    this.baseUrl = baseUrl;
    this.request = request;
  }

  fetch(endpoint) {
    return this.request(this.baseUrl + endpoint).then(response =>
      response.json()
    );
  }

  searchRepos({ query, sort, order, page }) {
    return this.fetch(urls.searchRepos(query, sort, order, page)).then(
      response => {
        if (response.message) {
          return Promise.reject(new Error(response.message));
        }

        return response;
      }
    );
  }
}

export default Api;

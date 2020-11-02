const apiKey = 'k8KXkjFFeIwVZO3zcAquho4xP0cZXuTqQJuPlBVA';

const handleSubmit = function () {
  $('form').on('submit', event => {
    event.preventDefault();
    const searchTerm = $('.js-search-term').val();
    const maxResults = $('.js-max-results').val();
    buildUrl(searchTerm, maxResults);
  });
};

const buildUrl = function (searchTerm, maxResults) {
  searchTerm = searchTerm.join('%2C%20');
  console.log(searchTerm);
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${maxResults}&api_key=${apiKey}`;
  getResults(url);
};

const getResults = function (url) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

const displayResults = function (responseJson) {
  console.log(responseJson);
  $('ul').empty();
  for(let i=0; i<responseJson.data.length; i++){
    $('ul').append(`${i+1}
    <a href=${responseJson.data[i].url}>${responseJson.data[i].name}<li>
    </li></a>`);
    $('ul').removeClass('hidden');
  }
};

const main = function () {
  handleSubmit();
};

$(main)
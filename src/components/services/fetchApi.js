const BASE_URL = 'https://pixabay.com/api/';
const searchParams = new URLSearchParams({
  key: '28892188-479e66a0f895169366b55aa9c',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});
function fetchApi(search, page) {
  const url = `${BASE_URL}?q=${search}&${searchParams}&page=${page}`;
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`There are no images for your request`));
  });
}
const api = { fetchApi };
export default api;

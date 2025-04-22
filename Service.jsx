const API_URL = 'https://openlibrary.org/search.json';

export const FetchBooks = async (InputValue) => {
    return fetch(`${API_URL}?q=${encodeURIComponent(InputValue)}`)
    .then(response => response.json()) 
    .then (data => data.docs)
    .catch (error => {
    console.error('Error fetching books:', error);
    return [];
  });
};


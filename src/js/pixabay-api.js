
export function searchImage(query) {
    const BASE_URL = 'https://pixabay.com/api/';

    const params = new URLSearchParams({
        key: '44028683-118753c7a8296875ea6775d6e',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '9',
    });

    const url = `${BASE_URL}?${params}`;

    return fetch(url)
          .then(response => response.json());
}
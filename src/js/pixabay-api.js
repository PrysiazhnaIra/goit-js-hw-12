import axios from "axios";

export async function searchImage(query) {
    const BASE_URL = 'https://pixabay.com/api/';

    const params = new URLSearchParams({
        key: '44028683-118753c7a8296875ea6775d6e',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '15',
    });

    const url = `${BASE_URL}?${params}`;

    return await axios.get(url);
}
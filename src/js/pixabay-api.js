import axios from "axios";

export async function searchImage(query, page = 1, perPage) {
    const BASE_URL = 'https://pixabay.com/api/';

    const params = new URLSearchParams({
        key: '44028683-118753c7a8296875ea6775d6e',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
    });

    const url = `${BASE_URL}?${params}`;

    return await axios.get(url);
}
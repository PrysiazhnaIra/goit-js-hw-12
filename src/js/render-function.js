function imageTemplate(image){
    return `
    <div class="gallery_block">
    <a href="${image.largeImageURL}">
    <img src="${image.webformatURL}" alt="${image.tags}" class="picture"></a>
    <ul class="property_list">
    <li class="property_elem">Likes <span class="span_property">${image.likes}</span></li>
    <li class="property_elem">Views <span class="span_property">${image.views}</span></li>
    <li class="property_elem">Comments <span class="span_property">${image.comments}</span></li>
    <li class="property_elem">Downloads <span class="span_property">${image.downloads}</span></li>
    </ul>
    </div>`;
    
}

export function imagesTemplate(arr) {
    return arr.map(imageTemplate).join('');
}
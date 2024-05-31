import {searchImage} from './js/pixabay-api.js';
import {imagesTemplate} from './js/render-function.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

var lightbox = new SimpleLightbox('.gallery_block a', {captionsData: "alt", captionDelay: 250});

const myForm = document.querySelector(".form");
const imagesList = document.querySelector('.images_container');

const spinner = document.querySelector(".loader");
const showMore = document.querySelector(".btn_more_block");

let currentSearchQuery = '';
let page = 1;
let perPage = 15;

async function fetchImages(query, page) {
    if(!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'You should input something',
            position: 'topCenter',
        });

        showMore.hidden = true;

    } else {
        spinner.hidden = false;

        try {
            let data = await searchImage(query, page, perPage);

            if(data.data.hits.length != 0) {
                const markup = imagesTemplate(data.data.hits);
                
                imagesList.insertAdjacentHTML('beforeend', markup);
                lightbox.refresh();

                page +=1;

                showMore.hidden = false;

                let totalHits = data.data.totalHits;

                const totalPages = Math.ceil(totalHits / perPage);
            
                if (page >= totalPages) {
                    showMore.hidden = true;
                    return iziToast.info({
                      position: "topCenter",
                      message: "We're sorry, but you've reached the end of search results."
                    });
                  }

            } else {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topCenter',
                });

                showMore.hidden = true;
            }
        } catch(error) {
                iziToast.error({
                    title: 'Error',
                    message: 'Failed to fetch data. Please try again later!',
                    position: 'topCenter',
                });
        } finally {
                spinner.hidden = true;
        }
    }  
}

function resetGallery() {
    imagesList.innerHTML = "";
    page = 1;
    currentSearchQuery = "";
}

myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    resetGallery();
    const query = event.target.elements.query.value.trim();

    currentSearchQuery = query;

    fetchImages(query, page);
});

showMore.addEventListener('click', (event) => {
    event.preventDefault();
    const query = myForm.elements.query.value.trim();

    if(query === currentSearchQuery) {
        page += 1;        
    } else {
        resetGallery();
        currentSearchQuery = query;  
    }

    fetchImages(query, page);
  });





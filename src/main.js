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

myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    imagesList.innerHTML = "";
    const query = event.target.elements.query.value.trim();

    if(!query) {
        iziToast.warning({
            title: 'Warning',
            message: 'You should input something',
            position: 'topCenter',
        });

    } else {
        spinner.hidden = false;

        searchImage(query)
            .then(data => {

                if(data.hits.length != 0) {
                    const markup = imagesTemplate(data.hits);
                    imagesList.innerHTML = markup;
                    
                    lightbox.refresh();

                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: 'topCenter',
                    });
                }
                
            })
            .catch(err => {
                iziToast.error({
                    title: 'Error',
                    message: 'Failed to fetch data. Please try again later!',
                    position: 'topCenter',
                });
            })
            .finally(() => {
                spinner.hidden = true;
            })
    }    
});







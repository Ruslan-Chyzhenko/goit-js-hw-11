import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const form = document.querySelector('.search-form');

async function searchImages(query) {
    showLoader();

    const API_KEY = '42262858-7b31826aafbc45fb5436f2ee9';
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('An error occurred while making the request.');
        }

        const data = await response.json();

        if (data.hits.length === 0) {
            toastError('Sorry, there are no images matching your search query. Please try again!');
        } else {
            displayImages(data.hits);
            resetForm();
        }
    } catch (error) {
        console.error('Error:', error.message);
        toastError(`Error fetching images: ${error}`);
    } finally {
        hideLoader();
    }
}

function displayImages(images) {
    gallery.innerHTML = '';

    const imageCards = images.map(image => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <a href="${image.largeImageURL}">
                <img src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}">
            </a>
            <div class="overlay">
                <div class="details">
                    <p>Likes: ${image.likes}</p>
                    <p>Views: ${image.views}</p>
                    <p>Comments: ${image.comments}</p>
                    <p>Downloads: ${image.downloads}</p>
                </div>
            </div>
        `;

        return card;
    });

    imageCards.forEach(card => {
        gallery.appendChild(card);
    });

    lightbox.refresh();
}

function toastError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        backgroundColor: '#EF4040',
        progressBarColor: '#FFE0AC',
        icon: 'icon-close',
        position: 'topRight',
        displayMode: 'replace',
        closeOnEscape: true,
        pauseOnHover: false,
        maxWidth: 432,
        messageSize: '16px',
        messageLineHeight: '24px',
    });
}

function showLoader() {
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
}

function resetForm() {
    form.reset();
}

function initializeSearch() {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const queryInput = event.target.elements.query.value.trim();

        if (queryInput === '') {
            toastError('Please enter a search query.');
            return;
        }

        try {
            await searchImages(queryInput);
        } catch (error) {
            console.error('Error:', error.message);
            toastError(`Error searching images: ${error}`);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});
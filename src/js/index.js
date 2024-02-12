import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Function to make an HTTP request to the Pixabay API
async function searchImages(query) {
    const API_KEY = '42262858-7b31826aafbc45fb5436f2ee9';
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('An error occurred while making the request.');
        }

        const data = await response.json();

        if (data.hits.length === 0) {
            // Show message about no results using the iziToast library
            toastError('Sorry, there are no images matching your search query. Please try again!');
        } else {
            // Process the received data and display the images in your web application
            displayImages(data.hits);
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Handling error while making the request
        // You can also show an error message using the iziToast library
        toastError(`Error fetching images: ${error}`);
    }
}

// Function to display images in your web application
function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    for (let i = 0; i < Math.min(images.length, 15); i++) {
        const card = createImageCard(images[i]);
        gallery.appendChild(card);
    }

    // Initialize SimpleLightbox after adding new images
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

// Function to create HTML markup for image card
function createImageCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const details = document.createElement('div');
    details.classList.add('details');
    details.innerHTML = `
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
    `;

    overlay.appendChild(details);
    card.appendChild(img);
    card.appendChild(overlay);

    card.addEventListener('click', () => openModal(image.largeImageURL, image.tags));

    return card;
}

// Function to open modal with large image
function openModal(largeImageUrl, altText) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${largeImageUrl}" alt="${altText}">
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal when close button is clicked
    const closeModalButton = modal.querySelector('.close-modal');
    closeModalButton.addEventListener('click', () => {
        closeModal(modal);
    });

    // Close modal when 'Esc' key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal(modal);
        }
    });
}

// Function to close modal
function closeModal(modal) {
    document.body.removeChild(modal);
}

// Function to show error message using iziToast library
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

// Function to initialize search functionality
function initializeSearch() {
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const queryInput = event.target.elements.query.value.trim();

        if (queryInput === '') {
            toastError('Please enter a search query.');
            return;
        }

        searchImages(queryInput);
    });
}

// Initialize search functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});
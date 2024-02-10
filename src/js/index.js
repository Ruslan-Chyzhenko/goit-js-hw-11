// Described in the documentation
import iziToast from "izitoast";
// Additional import for styles
import "izitoast/dist/css/iziToast.min.css";

// Described in the documentation
import SimpleLightbox from "simplelightbox";
// Additional import for styles
import "simplelightbox/dist/simple-lightbox.min.css";

// Function to perform the search (example)
async function performSearch(query) {
    // Your search logic here
    // Call the function to make an HTTP request to the Pixabay API
    try {
        await searchImages(query);
    } catch (error) {
        console.error('Error performing search:', error.message);
    }
}

// Function to make an HTTP request to the Pixabay API
async function searchImages(query) {
    // Variable with the API key for the Pixabay API
    const API_KEY = '42262858-7b31826aafbc45fb5436f2ee9'; // Declare API_KEY at the beginning of the function

    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('An error occurred while making the request.');
        }

        const data = await response.json();

        if (data.hits.length === 0) {
            // Show message about no results using the iziToast library
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
        } else {
            // Process the received data and display the images in your web application
            displayImages(data.hits);
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Handling error while making the request
        // You can also show an error message using the iziToast library
        throw error; // Pass the error up for handling above
    }
}

// Function to display images in your web application
function displayImages(images) {
    // Get reference to the gallery element
    const gallery = document.getElementById('gallery');
    
    // Clear the gallery before displaying new images
    gallery.innerHTML = '';

    // Iterate through the images and create card for each image
    images.forEach(image => {
        const card = createImageCard(image);
        gallery.appendChild(card);
    });
    
    // Call refresh method of SimpleLightbox after adding new images
    simpleLightbox.refresh();
}

// Function to create HTML markup for image card
function createImageCard(image) {
    // Create elements for the card
    const card = document.createElement('div');
    card.classList.add('card');

    // Create image element
    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    // Create overlay for displaying image details
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    // Create details for the image
    const details = document.createElement('div');
    details.classList.add('details');
    details.innerHTML = `
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
    `;

    // Append image and details to the card
    overlay.appendChild(details);
    card.appendChild(img);
    card.appendChild(overlay);

    // Add event listener to open modal on click
    card.addEventListener('click', () => openModal(image.largeImageURL, image.tags));

    return card;
}

// Function to open modal with large image
function openModal(largeImageUrl, altText) {
    // Create modal markup
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${largeImageUrl}" alt="${altText}">
        </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);

    // Close modal when close button is clicked
    const closeModalButton = modal.querySelector('.close-modal');
    closeModalButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Get references to form elements
const form = document.querySelector('.search-form');
const queryInput = document.querySelector('.image-query');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    // Prevent default form behavior
    event.preventDefault();

    // Get the value entered by the user
    const query = queryInput.value.trim();

    // Check if the search field is empty
    if (query === '') {
        // Show error message using iziToast library
        iziToast.show({
            title: 'Error',
            message: 'Please enter a search query.',
            backgroundColor: '#ff0000', // Set red background color for error message
            timeout: 5000 // Set the time (in milliseconds) for which the message will be visible (in this case - 5 seconds)
        });
        return; // Exit the function if the search field is empty
    }

    // Call the function to perform the search (your own logic)
    performSearch(query);
});

// Initialize SimpleLightbox
const simpleLightbox = new SimpleLightbox('.gallery a');
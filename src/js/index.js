// Described in the documentation
import iziToast from "izitoast";
// Additional import for styles
import "izitoast/dist/css/iziToast.min.css";

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
    // Your logic for displaying images
    console.log(images); // Example: outputting received images to the console
}
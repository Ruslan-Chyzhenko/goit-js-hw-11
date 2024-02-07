// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо посилання на елементи форми
const form = document.querySelector('.search-form');
const queryInput = document.querySelector('.image-query');

// Додаємо обробник події відправки форми
form.addEventListener('submit', function(event) {
    // Зупиняємо типову поведінку форми
    event.preventDefault();

    // Отримуємо значення, введене користувачем
    const query = queryInput.value.trim();

    // Перевірка, чи не є поле пошуку порожнім
    if (query === '') {
        // Показуємо повідомлення про помилку, використовуючи бібліотеку iziToast
        iziToast.show({
            title: 'Помилка',
            message: 'Будь ласка, введіть пошуковий запит.',
            backgroundColor: '#ff0000', // Задаємо червоний колір фону для повідомлення про помилку
            timeout: 5000 // Задаємо час (у мілісекундах), протягом якого повідомлення буде видимим (у цьому випадку - 5 секунд)
        });
        return; // Виходимо з функції, якщо поле пошуку порожнє
    }

    // Викликаємо функцію для виконання пошуку (ваша власна логіка)
    performSearch(query);
});

// Функція для виконання пошуку (приклад)
function performSearch(query) {
    // Ваша логіка пошуку тут
    // Наприклад, виконання HTTP-запиту із цим пошуковим рядком
    // Можна використовувати fetch або інші методи для виконання запитів
    // Наприклад:
    fetch(`https://example.com/search?query=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сталася помилка при виконанні запиту.');
            }
            return response.json();
        })
        .then(data => {
            // Обробка отриманих даних
            console.log(data);
        })
        .catch(error => {
            console.error('Помилка:', error.message);
        });
}

// Змінна з ключем доступу до API Pixabay
const API_KEY = '42262858-7b31826aafbc45fb5436f2ee9';

// Функція для виконання HTTP-запиту до API Pixabay
async function searchImages(query) {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Сталася помилка при виконанні запиту.');
        }

        const data = await response.json();

        if (data.hits.length === 0) {
            // Показати повідомлення про відсутність результатів за допомогою бібліотеки iziToast
            iziToast.error({
                title: 'Помилка',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
        } else {
            // Обробити отримані дані та відобразити зображення у вашому веб-додатку
            displayImages(data.hits);
        }
    } catch (error) {
        console.error('Помилка:', error.message);
        // Обробка помилки під час виконання запиту
        // Можна також показати повідомлення про помилку за допомогою бібліотеки iziToast
    }
}

// Функція для відображення зображень у вашому веб-додатку
function displayImages(images) {
    // Ваша логіка відображення зображень
}
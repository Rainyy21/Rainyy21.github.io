const container = document.getElementById('book-container');

function displayBooks() {
    // 1. Pull data from LocalStorage (or a fetch call to your JSON file)
    const books = JSON.parse(localStorage.getItem('myBooks')) || [];
    
    // 2. Clear current display
    container.innerHTML = '';

    // 3. Loop through data and create cards
    books.forEach(book => {
        const card = `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p>By: ${book.author}</p>
                <span class="badge">${book.status}</span>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Function to add a new book
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const newBook = { title, author, status: "Unread" };

    // Get old list, add new book, save back to LocalStorage
    const books = JSON.parse(localStorage.getItem('myBooks')) || [];
    books.push(newBook);
    localStorage.setItem('myBooks', JSON.stringify(books));

    displayBooks(); // Refresh the list
}

// Initial load
displayBooks();

const container = document.getElementById('book-container');

function displayBooks() {
    const container = document.getElementById('book-container');
    if (!container) return;
    
    // Get locally added items
    const allItems = JSON.parse(localStorage.getItem('myBooks')) || [];
    
    container.innerHTML = '';

    allItems.forEach((book, index) => {
        const card = `
            <div class="card">
                <button type="button" class="delete_button" onclick="deleteBook(${index})" title="Delete entry">🗑️</button>
                <div class="content">
                    <span class="badge ${book.type === 'Book' ? 'book-badge' : 'show-badge'}">${book.type}</span>
                    <h3>${book.title}</h3>
                    <p><strong>${book.type === 'Book' ? 'Author' : 'Network'}:</strong> ${book.author}</p>
                    <p class="genre-list">${book.genre} ${book.year ? `(${book.year})` : ''}</p>
                    <span class="badge" style="background: var(--muted)">${book.status || 'Unread'}</span>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Function to delete a book
function deleteBook(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        let books = JSON.parse(localStorage.getItem('myBooks')) || [];
        books.splice(index, 1);
        localStorage.setItem('myBooks', JSON.stringify(books));
        displayBooks();
    }
}

// Function to add a new book
function addBook(event) {
    if (event) event.preventDefault(); // Prevent page reload

    const title = document.getElementById('title').value;
    const type = document.getElementById('type').value;
    const author = document.getElementById('extra_info').value;
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;

    const newBook = { 
        title, 
        type, 
        author, 
        genre, 
        year, 
        status: "Unread" 
    };

    // Get old list, add new book, save back to LocalStorage
    const books = JSON.parse(localStorage.getItem('myBooks')) || [];
    books.push(newBook);
    localStorage.setItem('myBooks', JSON.stringify(books));

    // Reset form and close modal
    document.getElementById('addMediaForm').reset();
    document.getElementById('formModal').close();

    displayBooks(); // Refresh the list
}

// Attach event listener to the form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('addMediaForm');
    if (form) {
        form.addEventListener('submit', addBook);
    }
    displayBooks(); // Initial load
});

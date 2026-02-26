const container = document.getElementById('book-container');

function displayBooks() {
    const container = document.getElementById('book-container');
    if (!container) return;
    
    const allItems = JSON.parse(localStorage.getItem('myBooks')) || [];
    container.innerHTML = '';

    allItems.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <button type="button" class="delete_button" onclick="event.stopPropagation(); deleteBook(${index})" title="Delete entry">🗑️</button>
            <div class="content">
                <span class="badge ${book.type === 'Book' ? 'book-badge' : 'show-badge'}">${book.type}</span>
                <h3>${book.title}</h3>
                <p><strong>${book.type === 'Book' ? 'Author' : 'Network'}:</strong> ${book.author}</p>
                <p class="genre-list">${book.genre} ${book.year ? `(${book.year})` : ''}</p>
                <div style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
                    <span class="badge" style="background: ${getStatusColor(book.status)}">${book.status || 'Unread'}</span>
                    <button onclick="event.stopPropagation(); toggleStatus(${index})" class="status-btn">Change</button>
                </div>
            </div>
        `;
        // Make the whole card clickable for editing
        card.onclick = () => openEditModal(index);
        container.appendChild(card);
    });
}

function getStatusColor(status) {
    switch (status) {
        case 'Completed': return 'var(--sage)';
        case 'In Progress': return 'var(--amber)';
        default: return 'var(--muted)';
    }
}

function openEditModal(index) {
    const books = JSON.parse(localStorage.getItem('myBooks')) || [];
    const book = books[index];
    
    document.getElementById('modalTitle').innerText = "Edit Entry";
    document.getElementById('editIndex').value = index;
    document.getElementById('title').value = book.title;
    document.getElementById('type').value = book.type;
    document.getElementById('extra_info').value = book.author;
    document.getElementById('genre').value = book.genre;
    document.getElementById('year').value = book.year || '';
    document.getElementById('status').value = book.status || 'Unread';
    
    document.getElementById('formModal').showModal();
}

function toggleStatus(index) {
    let books = JSON.parse(localStorage.getItem('myBooks')) || [];
    const statuses = ['Unread', 'In Progress', 'Completed'];
    let currentIdx = statuses.indexOf(books[index].status || 'Unread');
    if (currentIdx === -1) currentIdx = 0;
    books[index].status = statuses[(currentIdx + 1) % statuses.length];
    localStorage.setItem('myBooks', JSON.stringify(books));
    displayBooks();
}

function deleteBook(index) {
    if (confirm('Are you sure you want to delete this entry?')) {
        let books = JSON.parse(localStorage.getItem('myBooks')) || [];
        books.splice(index, 1);
        localStorage.setItem('myBooks', JSON.stringify(books));
        displayBooks();
    }
}

function addBook(event) {
    if (event) event.preventDefault();

    const editIndex = parseInt(document.getElementById('editIndex').value);
    const newBook = { 
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        author: document.getElementById('extra_info').value,
        genre: document.getElementById('genre').value,
        year: document.getElementById('year').value,
        status: document.getElementById('status').value
    };

    let books = JSON.parse(localStorage.getItem('myBooks')) || [];

    if (editIndex > -1) {
        // Update existing
        books[editIndex] = newBook;
    } else {
        // Add new
        books.push(newBook);
    }

    localStorage.setItem('myBooks', JSON.stringify(books));
    document.getElementById('addMediaForm').reset();
    document.getElementById('editIndex').value = "-1";
    document.getElementById('formModal').close();
    displayBooks();
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('addMediaForm');
    if (form) form.addEventListener('submit', addBook);
    
    const openBtns = document.querySelectorAll(".open-form-btn");
    openBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById('addMediaForm').reset();
            document.getElementById('editIndex').value = "-1";
            document.getElementById('modalTitle').innerText = "Log a book/show";
            document.getElementById('formModal').showModal();
        });
    });

    displayBooks();
});

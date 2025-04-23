const listContainer = document.getElementById('bookList');
const searchInput = document.getElementById('authorSearch');

async function fetchBooks(author = '') {
  const res = await fetch(`http://localhost:5000/api/books?author=${author}`);
  const books = await res.json();
  listContainer.innerHTML = books.map(book => `
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5>${book.title}</h5>
          <p>${book.author}</p>
          <p>$${book.price}</p>
        </div>
      </div>
    </div>
  `).join('');
}

searchInput?.addEventListener('input', e => fetchBooks(e.target.value));
fetchBooks();

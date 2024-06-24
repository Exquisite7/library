const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'read' : 'not read yet'}`;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
}

function displayLibrary() {
  const libraryDiv = document.getElementById('library');
  libraryDiv.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    const info = document.createElement('p');
    info.textContent = book.info();
    bookDiv.appendChild(info);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayLibrary();
    });
    bookDiv.appendChild(removeButton);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Read Status';
    toggleButton.classList.add('toggle-read');
    toggleButton.addEventListener('click', () => {
      book.toggleReadStatus();
      displayLibrary();
    });
    bookDiv.appendChild(toggleButton);

    libraryDiv.appendChild(bookDiv);
  });
}

const newBookButton = document.getElementById('newBook');
const formContainer = document.getElementById('formContainer');
const addBookButton = document.getElementById('addBook');
const closeDialogButton = document.getElementById('closeDialog');

newBookButton.addEventListener('click', () => {
    formContainer.showModal();
});

addBookButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    
    addBookToLibrary(title, author, pages, read);
    
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    formContainer.close();
});

closeDialogButton.addEventListener('click', () => {
  formContainer.close();
});


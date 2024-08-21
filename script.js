const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages}, ${
    this.read ? "read" : "not read yet"
  }`;
};

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayLibrary();
}

function displayLibrary() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const info = document.createElement("p");
    info.textContent = book.info();
    bookDiv.appendChild(info);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    removeButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      displayLibrary();
    });
    bookDiv.appendChild(removeButton);

    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Read Status";
    toggleButton.classList.add("toggle-read");
    toggleButton.addEventListener("click", () => {
      book.toggleReadStatus();
      displayLibrary();
    });
    bookDiv.appendChild(toggleButton);

    libraryDiv.appendChild(bookDiv);
  });
}

function validateForm(event) {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();

  let isValid = true;

  const titleError = document.getElementById("titleError");
  const authorError = document.getElementById("authorError");
  const pagesError = document.getElementById("pagesError");

  if (title.length === 0) {
    titleError.style.display = "inline";
    isValid = false;
  } else {
    titleError.style.display = "none";
  }

  if (author.length === 0) {
    authorError.style.display = "inline";
    isValid = false;
  } else {
    authorError.style.display = "none";
  }

  if (pages.length === 0) {
    pagesError.style.display = "inline";
    isValid = false;
  } else {
    pagesError.style.display = "none";
  }

  if (!isValid) {
    event.preventDefault();
  } else {
    addBookToLibrary(title, author, pages, read);
    resetForm();
    formContainer.close();
  }
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;

  document.getElementById("titleError").style.display = "none";
  document.getElementById("authorError").style.display = "none";
  document.getElementById("pagesError").style.display = "none";
}

const newBookButton = document.getElementById("newBook");
const formContainer = document.getElementById("formContainer");
const addBookButton = document.getElementById("addBook");
const closeDialogButton = document.getElementById("closeDialog");
const bookForm = document.getElementById("bookForm");

newBookButton.addEventListener("click", () => {
  formContainer.showModal();
});

bookForm.addEventListener("submit", (event) => {
  validateForm(event);
});

closeDialogButton.addEventListener("click", () => {
  formContainer.close();
});

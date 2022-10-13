const main = document.querySelector("main");
const library = [];

function updateDisplay() {
  main.innerHTML = "";
  library.forEach(book => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h2 class="title">${book.title}</h2>
      <p class="author">${book.author}</p>
      <p class="page-count">${book.pageCount}</p>
      <p class="read-status">${book.readStatus}</p>`;

    main.appendChild(card);
  });
}

function addBook(title, author, pageCount, readStatus) {
  library.push(new Book(title, author, pageCount, readStatus));
}

function Book(title, author, pageCount, readStatus) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
}

Book.prototype.toggleRead = function () {
  this.readStatus = !this.readStatus;
}

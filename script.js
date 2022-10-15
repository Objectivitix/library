const modalOpen = document.querySelector(".modal-open");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");
const main = document.querySelector("main");
const library = [];

modalOpen.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);
modalOverlay.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("open");
  modalOverlay.classList.toggle("open");
}

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

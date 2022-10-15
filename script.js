const main = document.querySelector("main");
const library = [];

const modalOpen = document.querySelector(".modal-open");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal-overlay");

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
    card.classList.add("card");
    card.classList.toggle("read", book.readStatus);

    card.innerHTML = `
      <h2 class="title">${book.title}</h2>
      <p class="author">by ${book.author}</p>
      <p class="page-count">${book.pageCount} pages</p>
      <button class="read-status">${book.readStatus ? "✔️ Read" : "Mark as read"}</button>
      <button class="remove">Remove</button>`;

    card.querySelector(".read-status").addEventListener("click", evt => {
      book.toggleRead();
      evt.target.textContent = book.readStatus ? "✔️ Read" : "Mark as read";
      card.classList.toggle("read");
    });

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

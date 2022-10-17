const main = document.querySelector("main");
const library = [];

/* MODAL */

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

/* FORM */

const form = document.querySelector(".modal > form");
const formInputs = Array.from(form.elements);
const submitButton = form.querySelector("button");

modalClose.addEventListener("click", clearForm);

formInputs.forEach(inp => inp.addEventListener(
  "keydown", evt => evt.target.classList.remove("invalid")));

submitButton.addEventListener("click", processSubmission);

function processSubmission() {
  if (form.checkValidity()) {
    addBookfromForm();
    toggleModal();
    clearForm();
    return;
  }

  formInputs.forEach(inp =>
    inp.classList.toggle("invalid", !inp.validity.valid));
}

function addBookfromForm() {
  addBook(
    form.querySelector("#title").value,
    form.querySelector("#author").value,
    Number(form.querySelector("#page-count").value),
    form.querySelector("#read-status").checked,
  );
  updateDisplay();
}

function clearForm() {
  formInputs.forEach(inp => {
    inp.value = "";
    inp.classList.remove("invalid");
  });
}

/* CORE */

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

    card.querySelector(".remove").addEventListener("click", () => {
      library.splice(library.indexOf(book), 1);
      card.remove();
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

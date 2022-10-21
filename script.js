const main = document.querySelector("main");
const library = [];

if (localStorage.getItem("library")) {
  setupFromStorage();
  updateDisplay();
}

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
modalOverlay.addEventListener("click", clearForm);

formInputs.forEach(inp => inp.addEventListener(
  "keydown", evt => evt.target.classList.remove("invalid")));

submitButton.addEventListener("click", () => formInputs.forEach(
  inp => inp.classList.toggle("invalid", !inp.validity.valid)));

form.addEventListener("submit", evt => {
  addBookfromForm();
  toggleModal();
  clearForm();
  evt.preventDefault();
});

function addBookfromForm() {
  addBook(
    form.querySelector("#title").value,
    form.querySelector("#author").value,
    Number(form.querySelector("#page-count").value),
    form.querySelector("#read-status").checked,
  );
  updateDisplay();
  updateStorage();
}

function clearForm() {
  form.reset();
  formInputs.forEach(inp => inp.classList.remove("invalid"));
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
      updateStorage();
    });

    card.querySelector(".remove").addEventListener("click", () => {
      library.splice(library.indexOf(book), 1);
      card.remove();
      updateStorage();
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

/* STORAGE */

function updateStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function setupFromStorage() {
  JSON.parse(localStorage.getItem("library"))
    .forEach(obj => addBook(...Object.values(obj)));
}

/* SVGs */

const icons = document.querySelectorAll("div[data-icon]");

icons.forEach(icon => {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("xmlns", svgNS);
  svg.setAttribute("viewBox", "0 0 24 24");

  const use = document.createElementNS(svgNS, "use");
  use.setAttribute("href", `#${icon.dataset.icon}-icon`);
  svg.appendChild(use);

  icon.replaceWith(svg);
});

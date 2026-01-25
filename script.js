const myLibrary = [];


function Book(title, author, length, status) {
    this.id = crypto.randomUUID;
    this.title = title;
    this.author = author;
    this.pages = length;
    
    if (status) {
        this.status = "Finished reading";
    } else {
        this.status = "Not read yet";
    }

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.length}, ${status}`
    };
}

Book.prototype.toggleRead = function() {
    if (this.status === "finished reading") {
        this.status = "not read yet";
    } else {
        this.status = "finished reading";
    }
}

function addDialogToLibrary(title, author, length, status) {
    const book = new Book(title, author, length, status);

    myLibrary.push(book);
}


function displayBooks() {
    
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {

        // Adding book card for each book
        const newBook = document.createElement("div");
        newBook.classList.add("book-card");

        newBook.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.status}</p>
        `;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("data-index", index);
        removeBtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            displayBooks();
        })


        // Toggle Button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Change Status";
        toggleBtn.setAttribute("data-index", index);
        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        })

        newBook.appendChild(toggleBtn);
        newBook.appendChild(removeBtn);
        libraryContainer.appendChild(newBook);
    });
}

const libraryContainer = document.querySelector(".library-container");
const showButton = document.querySelector(".showButton");
const addDialog = document.getElementById("addDialog");
const submitBtn = document.getElementById("submitBtn");
const bookForm = document.getElementById("addNewBook"); 

showButton.addEventListener("click", () => {
    addDialog.showModal();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("status").checked;

    addDialogToLibrary(title, author, pages, isRead);
    
    displayBooks();

    addDialog.close();
    bookForm.reset();
});
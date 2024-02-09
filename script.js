const myLibrary = [];
const bookContainer = document.querySelector('.bookContainer');

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

function addBookToLibrary() {   // add book object to array myLibrary
    let myTitle = prompt(`Name of the book?`);
    let myAuthor = prompt(`Name of the author?`);
    let myPages = prompt(`Number of pages in the book?`);

    let bookObj = new Book(myTitle, myAuthor, myPages)  //Create new Book object
    myLibrary.push(bookObj);  //push book object on to library array
}

function listBooksOnPage() {   // create .bookCard html element and append it on page
    for (const book of myLibrary) {
        const newCard = document.createElement('div');
        newCard.classList.add('bookCard');
        newCard.innerHTML = `<div class="bookName">${book.title}</div> <div class="bookAuthor">${book.author}</div> <div class="bookPages">${book.pages}</div> <div class="unread"></div>`;
        bookContainer.appendChild(newCard);
    }
}



// addBookToLibrary(); 
// listBooksOnPage();
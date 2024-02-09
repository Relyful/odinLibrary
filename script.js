const myLibrary = [];
const bookContainer = document.querySelector('.bookContainer');
const newBookButt = document.querySelector('#newBookButt');
const dialog = document.querySelector('dialog');
const dialogButt = document.querySelector('dialog button');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(myTitle, myAuthor, myPages, myRead) {   // add book object to array myLibrary    
    let bookObj = new Book(myTitle, myAuthor, myPages, myRead)  //Create new Book object
    myLibrary.push(bookObj);  //push book object on to library array
    clearContainer();
    listBooksOnPage();
}

function listBooksOnPage() {   // create .bookCard html element and append it on page
    for (const book of myLibrary) {
        const newCard = document.createElement('div');
        newCard.classList.add('bookCard');
        newCard.innerHTML = `<div class="rowType">Title:</div><div class="bookName">${book.title}</div> 
        <div class="rowType">Author:</div><div class="bookAuthor">${book.author}</div> 
        <div class="rowType">Pages:</div><div class="bookPages">${book.pages}</div> 
        <div class="rowType">Read:</div><div class="bokRead">${book.read}</div>`;
        bookContainer.appendChild(newCard);
    }
}

function clearContainer() {
    bookContainer.innerHTML = ' ';
};

newBookButt.addEventListener("click", () => {    //New Book button event listener
    dialog.showModal();
});

dialogButt.addEventListener('click', () => {
    let bokName = document.querySelector('dialog input#bokName').value;
    let bokAuthor = document.querySelector('dialog input#bokAuthor').value;
    let bokPages = document.querySelector('dialog input#bokPages').value;
    let bokRead = 'No';
    if(document.querySelector('dialog input#bokRead').checked) {
        bokRead = 'Yes';
    }

    addBookToLibrary(bokName, bokAuthor, bokPages, bokRead);
});

const myLibrary = [{title: "Harry Potter", author: "Rowling", pages: "1337", read: 'No'}, 
{title: "Lord of the Rings", author: "J.R.R. Tolkien", pages: "800", read: 'No'},
{title: "World of Warcraft", author: "Hazikostas", pages: "350", read: 'Yes'}];
const bookContainer = document.querySelector('.bookContainer');
const newBookButt = document.querySelector('#newBookButt');
const newBookForm = document.querySelector(['#newBook']);
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

function listBooksOnPage() {  
    let x = 0; // create .bookCard html element and append it on page
    for (const book of myLibrary) {
        const newCard = document.createElement('div');
        newCard.classList.add('bookCard');
        newCard.dataset.index = `${x++}`;
        newCard.innerHTML = `<div class="bookInfo"><div class="rowType">Title:</div><div class="bookName">${book.title}</div> 
        <div class="rowType">Author:</div><div class="bookAuthor">${book.author}</div> 
        <div class="rowType">Pages:</div><div class="bookPages">${book.pages}</div> 
        <div class="rowType">Read:</div><div class="bokRead">${book.read}</div></div>
        <div class='buttonContainer'><button class="deleteBook" type="button">Remove Book</button>
        <button class="changeRead" type="button">Read / Not</button></div>`;
        bookContainer.appendChild(newCard);        
    }

    const deleteBookButt = document.querySelectorAll('.deleteBook');
    deleteBookButt.forEach((element) => element.addEventListener('click', e => {
        deleteBook(e.target.parentNode.dataset.index);
    }));

    const changeReadButt = document.querySelectorAll('.changeRead');
    changeReadButt.forEach(elem => elem.addEventListener('click', (e) => {
        changeRead(e.target.parentNode.parentNode.dataset.index);
    }));
}

function clearContainer() {
    bookContainer.innerHTML = ' ';
};

function deleteBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    clearContainer();
    listBooksOnPage();
}

function changeRead(bookIndex) {
    let current = myLibrary[bookIndex].read;
    if(current === 'No') {
        myLibrary[bookIndex].read = 'Yes';
    }
    else {
        myLibrary[bookIndex].read = 'No';
    }

    clearContainer();
    listBooksOnPage();
}

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
    newBookForm.reset();
});



listBooksOnPage();
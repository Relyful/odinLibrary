const myLibrary = [];
const bookContainer = document.querySelector('.bookContainer');
const newBookButt = document.querySelector('#newBookButt');
const newBookForm = document.querySelector('#newBook');
const dialog = document.querySelector('dialog');
const dialogButt = document.querySelector('dialog button');
const dialogCloseButt = document.querySelector('dialog .closeDialog');


class Book {    
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeRead() {        
        if(this.read === 'Yes') {
            this.read = 'No';
        }
        else {
            this.read = 'Yes';
        }
    }
}

const library = new class {
    deleteBook(bookIndex) {
        console.log(bookIndex);
        console.log(myLibrary[bookIndex]);
        myLibrary.splice(bookIndex, 1);
        clearContainer();
        listBooksOnPage();
    }
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
        library.deleteBook(e.target.parentNode.parentNode.dataset.index);
    }));

    const changeReadButt = document.querySelectorAll('.changeRead');
    changeReadButt.forEach(elem => elem.addEventListener('click', (e) => {
        let currentIndex = e.target.parentNode.parentNode.dataset.index;
        myLibrary[currentIndex].changeRead();
        clearContainer();
        listBooksOnPage();
    }));
}

function clearContainer() {
    bookContainer.innerHTML = ' ';
};

// function deleteBook(bookIndex) {
//     console.log(bookIndex);
//     console.log(myLibrary[bookIndex]);
//     myLibrary.splice(bookIndex, 1);
//     clearContainer();
//     listBooksOnPage();
// }


newBookButt.addEventListener("click", () => {    //New Book button event listener
    dialog.showModal();
});

dialogCloseButt.addEventListener('click', () => {
    dialog.close('kek');
})

newBookForm.addEventListener('submit', () => {
    let bokName = document.querySelector('dialog input#bokName').value;
    let bokAuthor = document.querySelector('dialog input#bokAuthor').value;
    let bokPages = document.querySelector('dialog input#bokPages').value;
    let bokRead = 'No';
    if(document.querySelector('dialog input#bokRead').checked) {
        bokRead = 'Yes';
    }

    if (isNaN(bokPages)) {
        alert('Pages field must be a number!');
        return;
    }

    addBookToLibrary(bokName, bokAuthor, bokPages, bokRead);
    newBookForm.reset();
});

addBookToLibrary('Harry Potter', 'Rowling', '1337', 'No');
addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', '800', 'No');
addBookToLibrary('World of Warcraft', 'Hazikostas', '350', 'Yes');
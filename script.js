const myLibrary = [];
const bookContainer = document.querySelector('.bookContainer');
const newBookButt = document.querySelector('#newBookButt');
const newBookForm = document.querySelector('#newBook');
const dialog = document.querySelector('dialog');
const dialogButt = document.querySelector('dialog button');
const dialogCloseButt = document.querySelector('dialog .closeDialog');
const bokNameInput = document.querySelector('dialog input#bokName');
const bokAuthorInput = document.querySelector('dialog input#bokAuthor');
const bokPagesInput = document.querySelector('dialog input#bokPages');


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
        this.clearContainer();
        this.listBooksOnPage();
    }

    listBooksOnPage() {  
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
            this.clearContainer();
            this.listBooksOnPage();
        }));
    }

    addBookToLibrary(myTitle, myAuthor, myPages, myRead) {   // add book object to array myLibrary    
        let bookObj = new Book(myTitle, myAuthor, myPages, myRead)  //Create new Book object
        myLibrary.push(bookObj);  //push book object on to library array
        this.clearContainer();
        this.listBooksOnPage();
    }

    clearContainer() {
        bookContainer.innerHTML = ' ';
    };
}

newBookButt.addEventListener("click", () => {    //New Book button event listener
    dialog.showModal();
});

dialogCloseButt.addEventListener('click', () => {
    dialog.close('kek');
})

newBookForm.addEventListener('submit', (event) => {
    let bokName = document.querySelector('dialog input#bokName').value;
    let bokAuthor = document.querySelector('dialog input#bokAuthor').value;
    let bokPages = document.querySelector('dialog input#bokPages').value;
    let bokRead = 'No';
    if (bokNameInput.validity.valueMissing || bokAuthorInput.validity.valueMissing || bokPagesInput.validity.valueMissing || bokPagesInput.validity.typeMismatch) {
        event.preventDefault(); // Prevent form submission
        if (bokNameInput.validity.valueMissing) {
            bokNameInput.setCustomValidity('You did not enter a book name!');
            bokNameInput.reportValidity();
        } else {
            bokNameInput.setCustomValidity('');
        }

        if (bokAuthorInput.validity.valueMissing) {
            bokAuthorInput.setCustomValidity('You did not enter a book author!');
            bokAuthorInput.reportValidity();
        } else {
            bokAuthorInput.setCustomValidity('');
        }

        if (bokPagesInput.validity.valueMissing) {
            bokPagesInput.setCustomValidity('You did not enter the number of pages!');
            bokPagesInput.reportValidity();
        } else {
            bokPagesInput.setCustomValidity('');
        }

        if (bokPagesInput.validity.typeMismatch) {
            bokPagesInput.setCustomValidity('You need to enter a number!');
            bokPagesInput.reportValidity();
        }
        else {
            bokPagesInput.setCustomValidity('');
        }
    } else {
        if(document.querySelector('dialog input#bokRead').checked) {
            bokRead = 'Yes';
        }
        library.addBookToLibrary(bokName, bokAuthor, bokPages, bokRead);
        newBookForm.reset();
        dialog.close();
    }
});

library.addBookToLibrary('Harry Potter', 'Rowling', '1337', 'No');
library.addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', '800', 'No');
library.addBookToLibrary('World of Warcraft', 'Hazikostas', '350', 'Yes');
/* 

TODO:
- add ability to edit book info! 
- add ability to rate book from 0 to 5 (starts 'unrated')
- add bookmark bar to show how far along the book you are (will automatically update the book.complete to true when done?)
- add ability to add tags to books
- display / sort by tags

*/

class Book {
    constructor(title, author, total_pages, complete = false) {
      this.title = toTitle(title);
      this.author = toTitle(author);
      this.total_pages = total_pages;
      this.rating = ""; // future feature
      this.complete = complete;
    }
  }

function updateDisplay() {
    document.querySelector("main").innerHTML = "";
    displayBooks(library);
}

function createBookCard (book, index) {
    // create a card for the book
    const card = document.createElement("div");  
    card.title = book.title;
    card.className = "card";

    // create a display for the card
    const contents = document.createElement("div");  
    contents.className = "content";

    //create 'Book Title' paragraph
    const bookTitle = document.createElement('p');
    bookTitle.textContent = `"${book.title}"`;
    bookTitle.title = `Title: "${book.title}"`;
    bookTitle.setAttribute('class', 'bookTitle');
    // create 'Book Author' paragraph
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookAuthor.title = `Author: "${book.author}"`;
    bookAuthor.setAttribute('class', 'bookAuthor');
    // create 'Book Page Count paragraph
    const bookLength = document.createElement('p');
    bookLength.textContent = `${book.total_pages} pages`;
    bookLength.title = `No. of pages: ${book.total_pages}`;
    bookLength.setAttribute('class', 'bookLength');

    contents.append(bookTitle, bookAuthor, bookLength)
    // maybe add an option to edit on clicking? ^

    // add a 'mark as complete/incomplete' button
    const completeButton = document.createElement("button");
    if (book.complete) {
        completeButton.textContent = "Done";
        completeButton.setAttribute('title', "Mark as Incomplete");
    } else {
        completeButton.textContent = "Not";
        completeButton.setAttribute('title', "Mark as Complete");
    }
    completeButton.setAttribute('id', `complete ${index}`);
    completeButton.setAttribute('class', "completeButton button");
    completeButton.addEventListener("click", toggleComplete);
    contents.appendChild(completeButton);

    // add a 'remove from library' button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.setAttribute('title', "remove book from library");
    deleteButton.setAttribute('id', `remove ${index}`);
    deleteButton.setAttribute('class', "deleteButton button");
    deleteButton.addEventListener("click", removeFromLibrary);
    contents.appendChild(deleteButton);

    // add an 'edit' button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.setAttribute('title', 'Edit book details');
    editButton.setAttribute('id', `edit ${index}`);
    editButton.setAttribute('class', 'editButton button');
    editButton.addEventListener('click', editContents);
    contents.appendChild(editButton);

    card.appendChild(contents);

    return card;
}

function displayBooks() {
    const container = document.querySelector("main"); 
    createForm();
    for (let i = 0; i < library.length; i++) {
        let currentBook = library[i];
        let card = createBookCard(currentBook, i);
        container.appendChild(card);
    }
}

function createForm() {
    const formCard = document.createElement('div')
    formCard.className = 'card';
    formCard.id = 'newBookForm';
    
    // create the 'Add New' button
    const addNewButton = document.createElement('button');
    addNewButton.id = 'addNewButton';
    addNewButton.title = 'Add new book to Library';
    addNewButton.textContent = '+'
    addNewButton.addEventListener("click", () => {
            document.querySelector("#input-field").style.display = "initial";
            addNewButton.style.display = "none";
        });
    formCard.appendChild(addNewButton)

    // create the form 
    const newBookForm = document.createElement('form')
    newBookForm.id = 'input-field' 
    
    // create 'Title' field
    const titleDiv = document.createElement('div');
    const titleinput = document.createElement('input');
    titleDiv.appendChild(titleinput); 
    titleinput.setAttribute('placeholder', 'Book Title');
    titleinput.setAttribute('id', 'title');
    titleinput.setAttribute('type', 'text'); //set character limit?
    titleinput.setAttribute('name', 'title')

    // create 'Author' field
    const authorDiv = document.createElement('div');
    const authorinput = document.createElement('input');
    authorDiv.appendChild(authorinput); 
    authorinput.setAttribute('placeholder', 'Author')
    authorinput.setAttribute('id', 'author');
    authorinput.setAttribute('type', 'text'); //set character limit?
    authorinput.setAttribute('name', 'author')
    
    // create 'Book Length' field
    const bookLengthDiv = document.createElement('div');
    const bookLengthinput = document.createElement('input');
    bookLengthDiv.appendChild(bookLengthinput); 
    bookLengthinput.setAttribute('placeholder', 'Page count');
    bookLengthinput.setAttribute('id', 'bookLength');
    bookLengthinput.setAttribute('type', 'number'); //set character limit?
    bookLengthinput.setAttribute('name', 'bookLength')
    bookLengthinput.setAttribute('min', '0');
    bookLengthinput.setAttribute('oninput',"validity.valid||(value='');");

    // create 'Completed' checkbox 
    const completedDiv = document.createElement('div');
    const completedLabel = document.createElement('label');
    const completedInput = document.createElement('input');
    completedDiv.append(completedInput, completedLabel); // could be problematic on different browsers? 
    completedLabel.textContent = 'Completed?';
    completedLabel.setAttribute('for', 'completed');
    completedInput.setAttribute('id', 'completed');
    completedInput.setAttribute('type', 'checkbox');
    completedInput.setAttribute('name', 'completed');

    // create 'Submit' button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('id', 'submit');
    submitButton.textContent = 'Add'
    submitButton.addEventListener("click", addBookToLibrary);

    // create 'Cancel' button
    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('id', 'cancel');
    cancelButton.textContent = 'Cancel';
    cancelButton.formNoValidate = true;
    cancelButton.addEventListener('click', () => { 
        console.log(document.querySelector("#addNewButton"))
        document.querySelector("#addNewButton").style.display = "block";
        document.querySelector("#input-field").style.display = "none";
        clearFormFields();
    }); 

    // make it all one big happy div family
    newBookForm.append( titleDiv,  // 'append' could be problematic on different browsers? 
                        authorDiv, 
                        bookLengthDiv, 
                        completedDiv, 
                        submitButton, 
                        cancelButton,
                        );

    formCard.appendChild(newBookForm)

    document.querySelector('main').appendChild(formCard);

    // a similar function will create the edit for an existing book
};


function addBookToLibrary() {
    const inputFields = document.querySelectorAll("input");

    // form validation
    for (let i = 0; i < inputFields.length - 1; i++) {
        if (inputFields[i].value == "") {
        alert("fill in all the details before submitting");
        return;
        }
    }

    const newBook = new Book(
        inputFields[0].value,
        inputFields[1].value,
        inputFields[2].value,
        inputFields[3].checked
    );

    library.push(newBook);
    updateLocalStorage(); 
    updateDisplay();
}

function clearFormFields() {
    const fields = document.querySelectorAll("input");
    for (let i = 0; i < fields.length - 1; i++) {
        fields[i].value = "";
        fields[fields.length - 1].checked = false;
    }
}

// returns string with first letter of every word capitalised
function toTitle(str) {
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/g, function (letter) {
        return letter.toUpperCase();
    });
}

function toggleComplete(event) {
    let index = (this.id).replace(/\D/g,''); //extract index number from button id
    let book = library[index];
    book.complete = !book.complete;
    updateLocalStorage();

    const button = document.getElementById(this.id)
    if (book.complete) {
        button.innerHTML = "Done";
        button.title = "Mark as Incomplete";
    } else {
        button.innerHTML = "Not";
        button.title = "Mark as Complete";
    }
}

function removeFromLibrary(event) {
    let index = (this.id).replace(/\D/g,''); //extract index number from button id
    library.splice(index, 1);
    updateLocalStorage();
    updateDisplay();
}

function editContents(event) {
    let index = (this.id).replace(/\D/g,''); //extract index number from button id
    console.log(library[index].title)
    // option 1: open up a modal to update the details
    // option 2: make the title, author and page count sections editable in place
}

// store library in local storage
function updateLocalStorage() {
    localStorage.setItem(`library`, JSON.stringify(library));
}

// pull library from local storage when page is refreshed
function restoreFromLocalStorage() {
    if (!localStorage.library) {
        displayBooks(library);
    } 
    else {
        let objects = localStorage.getItem("library");
        objects = JSON.parse(objects);
        library = objects;
        displayBooks(library);
    }
}

let library = [];
restoreFromLocalStorage();

/* 
TODO:
- migrate the whole shebang into webpack
- refactor all the code into modules
- update GHpages to work with the webpacked version

- DONE - add ability to edit book info! 
- DONE - add bookmark bar to show how far along the book you are 
- DONE - add ability to rate book from 0 to 5 (starts 'unrated') 
- DONE - add ability to add tags to books
- DONE - add ability to remove tags from books (close button deletes the tag.)
- DONE - get rid of the page count on the book cover (information already available in bookmark bar)
- DONE - switch all the buttons to <i> tags
- migrate the page count prompt to an html form for added control.
- display / sort by tags
- pressing the read/unread button updates the bookmark bar and vice versa
- instead of having an edit button to edit the details, have each section
  in the card open up a small form in its stead (click on the book name to 
  a text field hiding the title, same for author, bookmark etc.)

BUGS:
- DONE - clicking the save changes button while two or more edit fields are open closes them all and only saves the changes in the one clicked
- DONE - clicking the tag button while the tags are open on another card makes them disappear
*/

/* imports*/
import { Book } from './book';
import { extractID, toggleComplete } from './helpers'
import { restoreFromLocalStorage, updateLocalStorage } from './localStorage'
import { displayTags } from './tags'

function updateDisplay() {
    document.querySelector("main").innerHTML = "";
    displayBooks(library);
}

function createBookCard (book, index) {
    // create a card for the book
    const card = document.createElement("div");  
    card.title = book.title;
    card.id = `card ${index}`;
    card.className = "card";

    const cardFace = document.createElement('container')
    cardFace.className = 'cardFace'

    const contents = document.createElement("div");  
    contents.className = "content";

    // add a progress bar
    const progressBar = document.createElement('progress')
    progressBar.setAttribute('max', book.pages_total);
    progressBar.setAttribute('id', `progress ${index}`);
    progressBar.setAttribute('value', book.pages_read);
    progressBar.setAttribute('title', `You're on page ${book.pages_read} out of ${book.pages_total}.`)
    progressBar.addEventListener("click", () => {

        // TODO: migrate this from prompt to an HTML popup form

        let pages_read = parseInt(prompt('What page are you on?'))
        if (pages_read >= book.pages_total) {
            pages_read = book.pages_total
        } 
        if ( pages_read < 0 | !pages_read ) { 
            return }
        book.pages_read = pages_read
        updateLocalStorage(library);
        updateDisplay();
    });
    contents.appendChild(progressBar)    

    //add a star rating  
    const ratingsBar = document.createElement('div')
    ratingsBar.className = 'rating-box';
    ratingsBar.title = (((book.rating / 20) *10)/10) + ' stars';
    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.style.width = book.rating + '%'; // dislpay the rating
    ratingsBar.setAttribute('id',`rating ${index}`)
    ratingsBar.addEventListener('click', (event) => {
        const bar = document.getElementById(`rating ${index}`)
        const rated = bar.querySelector('.rating')
        rated.style.width = event.layerX + '%' // set the width of the filled out stars
        book.rating = event.layerX;
        bar.title = ((book.rating / 20) *10)/10 + ' stars';
        updateLocalStorage(library);
    });
    ratingsBar.appendChild(rating)
    contents.appendChild(ratingsBar);

    //create 'Book Title' paragraph
    const bookTitle = document.createElement('p');
    bookTitle.textContent = `"${book.title}"`;
    bookTitle.title = `Title: "${book.title}"`;
    bookTitle.setAttribute('class', 'bookTitle');
    contents.appendChild(bookTitle)

    // create 'Book Author' paragraph
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    bookAuthor.title = `Author: "${book.author}"`;
    bookAuthor.setAttribute('class', 'bookAuthor');
    contents.appendChild(bookAuthor)

    cardFace.appendChild(contents)

    const buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'cardButtons')

    // add a 'delete' button
    const deleteButton = document.createElement('i');
    deleteButton.innerHTML = 'delete_forever';
    deleteButton.setAttribute('title', "Remove book from library");
    deleteButton.setAttribute('class', 'material-icons-round deleteButton');
    deleteButton.setAttribute('id', `remove ${index}`);
    deleteButton.addEventListener("click", removeFromLibrary);
    buttonDiv.appendChild(deleteButton);
    
    // add a 'tag' button
    const tagButton = document.createElement('i');
    tagButton.innerHTML = 'label';
    tagButton.setAttribute('title', 'Add tags');
    tagButton.setAttribute('class', 'material-icons-round tagButton');
    tagButton.setAttribute('id', `tag ${index}`);
    tagButton.addEventListener('click', displayTags);
    buttonDiv.appendChild(tagButton)
    
    // add an 'edit' button
    const editButton = document.createElement('i');
    editButton.innerHTML = 'create';
    editButton.setAttribute('title', 'Edit book details');
    editButton.setAttribute('class', 'material-icons-round editButton');
    editButton.setAttribute('id', `edit ${index}`);
    editButton.addEventListener('click', editContents);
    buttonDiv.appendChild(editButton);

    // add a 'mark as complete/incomplete' button
    const completeButton = document.createElement("i");
    if (book.complete) {
        completeButton.innerHTML = "check_circle_outline";
        completeButton.setAttribute('title', "Mark as unread");
    } else {
        completeButton.innerHTML = "visibility";
        completeButton.setAttribute('title', "Mark as Complete");
    }
    completeButton.setAttribute('class', "material-icons-round completeButton");
    completeButton.setAttribute('id', `complete ${index}`);
    completeButton.addEventListener("click", toggleComplete);
    buttonDiv.appendChild(completeButton);
    
    cardFace.appendChild(buttonDiv);

    card.appendChild(cardFace)
    return card;
}

function displayBooks() {
    const container = document.querySelector("main"); 
    container.appendChild(createForm());
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
    const titleInput = document.createElement('input');
    titleDiv.appendChild(titleInput); 
    titleInput.setAttribute('placeholder', 'Book Title');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('type', 'text'); //set character limit?
    titleInput.setAttribute('name', 'title')

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
    completedDiv.setAttribute('class','form-group')
    const completedLabel = document.createElement('label');
    const completedInput = document.createElement('input');
    completedDiv.append(completedInput, completedLabel); // could be problematic on different browsers? 
    completedLabel.textContent = 'Completed?';
    completedLabel.setAttribute('for', 'completed');
    completedInput.setAttribute('id', 'completed');
    completedInput.setAttribute('type', 'checkbox');
    completedInput.setAttribute('name', 'completed');

    // create 'Submit' button
    const submitButton = document.createElement('i');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('id', 'submit');
    submitButton.setAttribute('class','material-icons-round')
    submitButton.innerHTML = 'done'
    submitButton.addEventListener("click", addBookToLibrary);

    // create 'Cancel' button
    const cancelButton = document.createElement('i');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('id', 'cancel');
    cancelButton.setAttribute('class', 'material-icons-round')
    cancelButton.innerHTML = 'close';
    cancelButton.formNoValidate = true;
    cancelButton.addEventListener('click', () => { 
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
    return formCard
}

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
    updateLocalStorage(library); 
    updateDisplay();
}

function clearFormFields() {
    const fields = document.querySelectorAll("input");
    for (let i = 0; i < fields.length - 1; i++) {
        fields[i].value = "";
        fields[fields.length - 1].checked = false;
    }
}

function updateBook(event) {
    let index = extractID(this.id); //extract index number from button id
    let book = library[index]
    const bookCard = document.getElementById(`card ${index}`);
    const contents = bookCard.querySelector('.content');
    const inputs = document.getElementById(`update-input-field${index}`).querySelectorAll('input') 

    // basic form validation
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
        alert("input cannot be left empty!");
        return;
        }
    }

    book.title = inputs[0].value;
    contents.querySelector('.bookTitle').innerHTML = book.title
    contents.querySelector('.bookTitle').title = `Title: "${book.title}"`
    book.author = inputs[1].value;
    contents.querySelector('.bookAuthor').innerHTML = book.author
    contents.querySelector('.bookAuthor').title = `Author: "${book.author}"`
    book.pages_total = inputs[2].value;
    updateLocalStorage(library);
    // remove the form
    document.getElementById(`update-input-field${index}`).remove()

    // display book card contents 
    bookCard.querySelector('.cardFace').style.display = "block";
}



function removeFromLibrary(event) {
    let index = extractID(this.id); //extract index number from button id
    library.splice(index, 1);
    updateLocalStorage(library);
    updateDisplay();
}

function editContents(event) {
    let index = extractID(this.id); //extract index number from button id
    let book = library[index]
    const bookCard = document.getElementById(`card ${index}`);
    // hide book card contents 
    bookCard.querySelector('.cardFace').style.display = "none";

    // create the form 
    const editBookForm = document.createElement('form')
    editBookForm.id = `update-input-field${index}` 

    // create 'Title' field
    const titleDiv = document.createElement('div');
    const titleInput = document.createElement('input');
    titleDiv.appendChild(titleInput); 
    titleInput.setAttribute('value', book.title);
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'Edit Title')
    titleInput.minlength = 1;

    // create 'Author' field
    const authorDiv = document.createElement('div');
    const authorinput = document.createElement('input');
    authorDiv.appendChild(authorinput); 
    authorinput.setAttribute('value', book.author)
    authorinput.setAttribute('type', 'text');
    authorinput.setAttribute('name', 'Edit Author')
    authorinput.required = true;

    // create 'Book Length' field
    const bookLengthDiv = document.createElement('div');
    const bookLengthinput = document.createElement('input');
    bookLengthDiv.appendChild(bookLengthinput); 
    bookLengthinput.setAttribute('value', book.pages_total);
    bookLengthinput.setAttribute('type', 'number');
    bookLengthinput.setAttribute('name', 'Edit Total Pages')
    bookLengthinput.setAttribute('min', '0');
    bookLengthinput.setAttribute('oninput',"validity.valid||(value='');");
    bookLengthinput.required = true;

    // create 'Submit' button
    const submitButton = document.createElement('i');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('class','material-icons-round')
    submitButton.setAttribute('id', `update ${index}`)
    submitButton.innerHTML = 'done'
    submitButton.addEventListener("click", updateBook);

    // create 'Cancel' button
    const cancelButton = document.createElement('i');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('class','material-icons-round')
    cancelButton.innerHTML = 'close';
    cancelButton.formNoValidate = true;
    cancelButton.addEventListener('click', () => { 
        bookCard.querySelector('.cardFace').style.display = "initial";
        let index = extractID(this.id);
        document.querySelector(`#update-input-field${index}`).remove();
    }); 

    editBookForm.append(titleDiv, 
                        authorDiv, 
                        bookLengthDiv, 
                        submitButton,
                        cancelButton,
                        );
                        
    bookCard.appendChild(editBookForm)
    titleInput.focus();
}


let library = restoreFromLocalStorage();
displayBooks(library)


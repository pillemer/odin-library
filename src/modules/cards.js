import { addBookToLibrary, removeFromLibrary } from './updateLibrary'
import { clearFormFields, setToggleImage, extractID } from './helpers'
import { tagButton, completeButton } from './buttons'
import { restoreFromLocalStorage } from './localStorage'
import { updateBook, updateBookmark, updateRating } from './updateBook'

export function newBookFormCard () {
    const formCard = document.createElement('div')
    formCard.className = 'card';
    formCard.id = 'newBookForm';
    
    // create the 'Add New' button
    const addNewButton = document.createElement('i');
    addNewButton.setAttribute('type', 'button')
    addNewButton.setAttribute('title', 'Add new book to Library');
    addNewButton.setAttribute('id', 'addNewButton');
    addNewButton.setAttribute('class','material-icons-round')
    addNewButton.innerHTML = 'add'
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
    const completedInput = document.createElement('input');
    completedInput.setAttribute('id', 'completed');
    completedInput.setAttribute('type', 'checkbox');
    completedInput.setAttribute('name', 'completed');
    completedDiv.appendChild(completedInput);
    const completedLabel = document.createElement('label');
    completedLabel.textContent = 'Completed?';
    completedLabel.setAttribute('for', 'completed');
    completedDiv.appendChild(completedLabel);

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

export function createBookCard (book, index) {
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
    progressBar.addEventListener("click", updateBookmark);
    contents.appendChild(progressBar);

    //add a star rating  
    const ratingsBar = document.createElement('div')
    ratingsBar.className = 'rating-box';
    ratingsBar.title = (((book.rating / 20) *10)/10) + ' stars';
    const rating = document.createElement('div');
    rating.className = 'rating';
    rating.style.width = book.rating + '%'; // dislpay the rating
    ratingsBar.setAttribute('id',`rating ${index}`)
    ratingsBar.addEventListener('click', updateRating);

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
    
    buttonDiv.appendChild(tagButton(index))
    
    // add an 'edit' button
    const editButton = document.createElement('i');
    editButton.innerHTML = 'create';
    editButton.setAttribute('title', 'Edit book details');
    editButton.setAttribute('class', 'material-icons-round editButton');
    editButton.setAttribute('id', `edit ${index}`);
    editButton.addEventListener('click', editContents);
    buttonDiv.appendChild(editButton);

    // add a 'mark as complete/incomplete' button
    const readButton = completeButton(index);
    setToggleImage(readButton, book.complete);
    buttonDiv.appendChild(readButton);
    
    cardFace.appendChild(buttonDiv);

    card.appendChild(cardFace)
    return card;
}

function editContents() {
    let index = extractID(this.id); //extract index number from button id
    let library = restoreFromLocalStorage();
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
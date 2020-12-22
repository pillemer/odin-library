import { addBookToLibrary, removeFromLibrary } from './updateLibrary'
import { clearFormFields, setToggleImage } from './helpers'
import { tagButton, completeButton } from './buttons'
import { updateBookmark, updateRating, editContents } from './updateBook'

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
            titleInput.focus();
        });
    formCard.appendChild(addNewButton)

    // create the form 
    const newBookForm = document.createElement('form')
    newBookForm.id = 'input-field' 
    
    // create 'Title' field
    const titleInput = document.createElement('input');
    titleInput.setAttribute('placeholder', 'Book Title');
    titleInput.setAttribute('id', 'title');
    titleInput.setAttribute('type', 'text'); //set character limit?
    titleInput.setAttribute('name', 'title')
    titleInput.setAttribute('oninput', "classList.remove('invalid');")
    newBookForm.appendChild(titleInput);

    // create 'Author' field
    const authorinput = document.createElement('input');
    authorinput.setAttribute('placeholder', 'Author')
    authorinput.setAttribute('id', 'author');
    authorinput.setAttribute('type', 'text'); //set character limit?
    authorinput.setAttribute('name', 'author')
    authorinput.setAttribute('oninput', "classList.remove('invalid');")
    newBookForm.appendChild(authorinput);

    // create 'Book Length' field
    const bookLengthinput = document.createElement('input');
    bookLengthinput.setAttribute('placeholder', 'Page count');
    bookLengthinput.setAttribute('id', 'bookLength');
    bookLengthinput.setAttribute('type', 'number'); //set character limit?
    bookLengthinput.setAttribute('name', 'bookLength')
    bookLengthinput.setAttribute('min', '1');
    bookLengthinput.setAttribute('oninput', "validity.valid||(value='');");
    bookLengthinput.setAttribute('oninput', "classList.remove('invalid');")

    newBookForm.appendChild(bookLengthinput);

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
    newBookForm.appendChild(completedDiv);

    // create a button div
    const buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'buttonDiv')

    // create 'Submit' button
    const submitButton = document.createElement('i');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('id', 'submit');
    submitButton.setAttribute('class','material-icons-round')
    submitButton.innerHTML = 'done'
    submitButton.addEventListener("click", addBookToLibrary);
    buttonDiv.appendChild(submitButton);

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
    buttonDiv.appendChild(cancelButton);

    newBookForm.appendChild(buttonDiv);

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
    buttonDiv.setAttribute('class', 'buttonDiv')

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

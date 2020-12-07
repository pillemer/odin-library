/* 

TODO:
- DONE - add ability to edit book info! 
- DONE - add bookmark bar to show how far along the book you are 
- DONE add ability to rate book from 0 to 5 (starts 'unrated') 
- add ability to add tags to books
- migrate the prompt to an html form for added control. Then you can:
    - automatically update the book.complete to true when done.
- display / sort by tags

*/

class Book {
    constructor(title, author, pages_total, complete = false) {
      this.title = toTitle(title);
      this.author = toTitle(author);
      this.pages_total = pages_total;
      this.pages_read = 0;
      this.rating = 0;
      this.categories = ['rubberband','Fantasy'];
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
    card.id = book.title;
    card.className = "card";

    // create a display for the card
    const contents = document.createElement("div");  
    contents.className = "content";

    // add a progress bar
    const progressBar = document.createElement('progress')
    progressBar.setAttribute('max', book.pages_total);
    progressBar.setAttribute('id', `progress ${index}`);
    progressBar.setAttribute('value', book.pages_read);
    progressBar.setAttribute('title', `You're on page ${book.pages_read} out of ${book.pages_total}.`)
    progressBar.addEventListener("click", () => {

        // TODO: migrate this from prompt to an HTML popup form somehow
        
        let pages_read = parseInt(prompt('What page are you on?'))
        if (pages_read >= book.pages_total) {
            pages_read = book.pages_total
        } 
        if ( pages_read < 0 | !pages_read ) { 
            return }
        book.pages_read = pages_read
        updateLocalStorage();
        updateDisplay();
    });

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
        updateLocalStorage();
    });
    ratingsBar.appendChild(rating)

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
    bookLength.textContent = `${book.pages_total} pages`;
    bookLength.title = `No. of pages: ${book.pages_total}`;
    bookLength.setAttribute('class', 'bookLength');

    contents.append(progressBar, ratingsBar, bookTitle, bookAuthor, bookLength)

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

function toTitle(str) {
    // returns string with first letter of every word capitalised
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/g, function (letter) {
        return letter.toUpperCase();
    });
}

function updateBook(event) {
    let index = (this.id).replace(/\D/g,''); //extract index number from button id
    let book = library[index]
    const inputs = document.getElementById('update-input-field').querySelectorAll('input') 
    
    // basic form validation
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
        alert("input cannot be left empty!");
        return;
        }
    }

    book.title = inputs[0].value;
    book.author = inputs[1].value;
    book.pages_total = inputs[2].value;
    updateLocalStorage();
    updateDisplay();
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
    let book = library[index]
    const bookCard = document.getElementById(book.title);
    // hide book card contents 
    bookCard.querySelector('.content').style.display = "none";

    // create the form 
    const editBookForm = document.createElement('form')
    editBookForm.id = 'update-input-field' 

    // create 'Title' field
    const titleDiv = document.createElement('div');
    const titleinput = document.createElement('input');
    titleDiv.appendChild(titleinput); 
    titleinput.setAttribute('value', book.title);
    titleinput.setAttribute('type', 'text');
    titleinput.setAttribute('name', 'Edit Title')
    titleinput.minlength = 1;

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

    // WIP! trying to add a section to the edit form to add tags
    // maybe instead of having a drop down menu I can just have a
    // text field with the current tags as the placeholder?
    // (if no tags > default placeholder)?

    // create a 'tags' input field
    const tagForm = document.createElement('form')
    tagForm.setAttribute('id', `tagForm ${index}`);
    const tagInput = document.createElement('input');
    tagInput.setAttribute('list', `options ${index}`);
    tagInput.setAttribute('id',`tags ${index}`);
    const datalist = document.createElement('datalist');
    datalist.setAttribute('id',`options ${index}`);
    let options = book.categories;
    for (const option of options){
        tag = document.createElement('option');
        tag.setAttribute('value',option);
        datalist.appendChild(tag)
    }
    const addNewTag = document.createElement('button');
    addNewTag.setAttribute('type','submit')
    addNewTag.setAttribute('form', `tagForm ${index}`)
    addNewTag.textContent = 'Tag'
    tagForm.append(tagInput, addNewTag)





    // create 'Submit' button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'button');
    submitButton.setAttribute('id', `update ${index}`)
    submitButton.textContent = 'Add'
    submitButton.addEventListener("click", updateBook);

    // create 'Cancel' button
    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.textContent = 'Cancel';
    cancelButton.formNoValidate = true;
    cancelButton.addEventListener('click', () => { 
        bookCard.querySelector('.content').style.display = "block";
        document.querySelector("#update-input-field").remove();
    }); 

    editBookForm.append(titleDiv, 
                        authorDiv, 
                        bookLengthDiv, 
                        tagForm,
                        datalist,
                        submitButton,
                        cancelButton,
                        );
                        
    bookCard.appendChild(editBookForm)
}

function updateLocalStorage() {
    // store library in local storage
    localStorage.setItem(`library`, JSON.stringify(library));
}

function restoreFromLocalStorage() {
    // pull library from local storage when page is refreshed
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

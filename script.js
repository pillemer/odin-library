let library = []

// book Class
class Book {
    constructor(title, author, pages, read = false){
        this.title = toTitle(title);
        this.author = toTitle(author);
        this.pages = pages;
        this.read = read;
    }
    info() {
        return [title, author, pages, read]
    }
}

// test values 
let theHobbit = new Book('The hobbit', 'brandon sanderson', 310, false);
let songOfAchiles = new Book('The song of Achilles', 'J.R.R Tolkien', 416, true)
let deadhouseGates = new Book('Deadhouse Gates', 'madeline miller', 943, true);
let bible = new Book('The Bible', 'God', 666, false);

library.push(theHobbit)
library.push(songOfAchiles)
library.push(deadhouseGates)
library.push(bible)

displayBooks(library); // initial display

function updateDisplay() {
    document.querySelector('#container').innerHTML = '';
    displayBooks(library);
}

function clearFields() {
    const fields = document.querySelectorAll('input');
    for (let i = 0; i <fields.length-1; i++) {
        fields[i].value = '';
    fields[fields.length - 1].checked = false;
    }
}

function displayBooks (library) {
    const container = document.querySelector('#container');
    container.style.gridTemplateRows = `repeat(${library.length}, 1fr)`;
    for (let i = 0; i < library.length; i++) {
        currentBook = library[i];
        const card = document.createElement('div');
        card.title = i;
        card.id = 'card'
        const contents = document.createElement('div');
        contents.className = 'content';
        contents.innerHTML = `"${currentBook.title}"<br><br>${currentBook.author}<br><br>${currentBook.pages} pages<br>`
        // add a 'mark as read/unread' button
        const readButton = document.createElement('button');
        if ((currentBook).read){
            readButton.innerHTML = 'Mark as unread'    
        } else { readButton.innerHTML = 'Mark as read'};
        readButton.id = `read${i}`;
        readButton.className = 'readButton button';
        readButton.addEventListener('click', function() {
            currentBook.read = !currentBook.read;
            if (currentBook.read){
                readButton.innerHTML = 'Mark as unread'    
            } 
            else { 
                readButton.innerHTML = 'Mark as read'
            };
        })

        contents.appendChild(readButton);
        // add a 'remove from library' button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Remove'
        deleteButton.id = `delete${i}`;
        deleteButton.className = 'deleteButton button';
        deleteButton.addEventListener('click', function() {
            library.splice(i, 1)
            updateDisplay();
        })
        contents.appendChild(deleteButton);
        card.appendChild(contents)
        container.appendChild(card);
    }
}

function toTitle(str) {
    return str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
  }

const addNewButton = document.getElementById('addNew')
addNewButton.addEventListener('click', () => {
    document.querySelector('#input-field').style.display = 'inline-block'
    addNewButton.style.display = 'none';
})

const cancelButton = document.getElementById('cancel')
cancelButton.addEventListener('click', () => {
    document.querySelector('#input-field').style.display = 'none'
    addNewButton.style.display = 'inline-block';
})

const submitButton = document.getElementById('submit')
submitButton.addEventListener('click', () => {
    const inputFields = document.querySelectorAll('input')
    for (let i = 0; i < inputFields.length - 1; i ++) {
        if (inputFields[i].value == '') {
            alert('fill in all the details before submitting')
            return;
        } 
    }
    const newBook = new Book(inputFields[0].value, inputFields[1].value, inputFields[2].value, inputFields[3].checked);
    console.log('namefield value'+inputFields[0].value)
    console.log('namefield value'+newBook.title)

    library.push(newBook); // add book to library
    document.querySelector('#input-field').style.display = 'none'
    addNewButton.style.display = 'inline-block';
    clearFields()
    updateDisplay();
})

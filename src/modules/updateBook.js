import { restoreFromLocalStorage, updateLocalStorage } from './localStorage'
import { extractID, setToggleImage } from './helpers'
import { updateDisplay } from './dislpay'

export function toggleComplete() {
    let index = extractID(this.id);
    let library = restoreFromLocalStorage();
    let book = library[index];
    book.complete = !book.complete;
    updateLocalStorage(library);
    const button = document.getElementById(this.id)
    setToggleImage(button, book.complete)
}

export function updateBook() {
    let index = extractID(this.id);
    let library = restoreFromLocalStorage();
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
    contents.querySelector('.bookTitle').innerHTML = `"${book.title}"`
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

export function updateBookmark () {
    let index = extractID(this.id);
    let library = restoreFromLocalStorage();
    const book = library[index];
    let pages_read = parseInt(prompt('What page are you on?'))
    if (pages_read >= book.pages_total) {
        pages_read = book.pages_total
    } 
    if ( pages_read < 0 | !pages_read ) { 
        return }
    book.pages_read = pages_read
    updateLocalStorage(library);
    updateDisplay();
}

export function updateRating (event) {
    let index = extractID(this.id);
    let library = restoreFromLocalStorage();
    const book = library[index];
    const bar = document.getElementById(`rating ${index}`).querySelector('.rating')
    bar.style.width = event.layerX + '%' // set the width of the filled out stars
    book.rating = event.layerX;
    bar.title = ((book.rating / 20) *10)/10 + ' stars';
    updateLocalStorage(library);
}
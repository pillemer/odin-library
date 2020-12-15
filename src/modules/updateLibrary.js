import { extractID } from 'helpers'
import { updateDisplay } from 'dislpay'
import { restoreFromLocalStorage, updateLocalStorage } from 'localStorage'
import { Book } from 'book'

export function removeFromLibrary() {
    let index = extractID(this.id); //extract index number from button id
    let library = restoreFromLocalStorage();
    library.splice(index, 1);
    updateLocalStorage(library);
    updateDisplay();
}
export function addBookToLibrary() {
    const inputFields = document.getElementById('newBookForm').querySelectorAll("input");

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

    let library = restoreFromLocalStorage();
    library.push(newBook);
    updateLocalStorage(library); 

    updateDisplay(); // should be moved out of this function?
}
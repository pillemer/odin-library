import { extractID } from './helpers'
import { updateDisplay } from './dislpay'
import { restoreFromLocalStorage, updateLocalStorage } from './localStorage'
import { Book } from './book'
import { validate } from './formValidation'

export function removeFromLibrary() {
    let index = extractID(this.id); //extract index number from button id
    let library = restoreFromLocalStorage();
    library.splice(index, 1);
    updateLocalStorage(library);
    updateDisplay();
}
export function addBookToLibrary() {
    const inputFields = Array.from(document.getElementById('newBookForm').querySelectorAll("input"));
    inputFields.slice(0, 3);

    if (!validate(inputFields)) {
        return
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
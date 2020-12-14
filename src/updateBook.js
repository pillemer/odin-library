import { restoreFromLocalStorage, updateLocalStorage } from './localStorage'
import { extractID, setToggleImage } from './helpers'

export function toggleComplete(event) {
    let index = extractID(this.id);
    let library = restoreFromLocalStorage();
    let book = library[index];
    book.complete = !book.complete;
    updateLocalStorage(library);

    const button = document.getElementById(this.id)
    setToggleImage(button, book.complete)
}


import { restoreFromLocalStorage, updateLocalStorage } from './localStorage'

export function toTitle(str) {
    // returns string with first letter of every word capitalised
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/g, function (letter) {
        return letter.toUpperCase();
    });
}

export function extractID(string) {
    // returns only the number digits in a string
    return string.replace(/\D/g,'');
}

export function toggleComplete(event) {
    let index = extractID(this.id);
    let library = restoreFromLocalStorage();
    let book = library[index];
    book.complete = !book.complete;
    updateLocalStorage(library);

    const button = document.getElementById(this.id)
    if (book.complete) {
        button.innerHTML = "check_circle_outline";
        button.title = "Mark as Incomplete";
    } else {
        button.innerHTML = "visibility";
        button.title = "Mark as Complete";
    }
}
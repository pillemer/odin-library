import { restoreFromLocalStorage } from 'localStorage'
import { newBookFormCard, createBookCard } from 'cards'

export function updateDisplay() {
    let library = restoreFromLocalStorage();
    document.querySelector("main").innerHTML = "";
    displayBooks(library);
}

export function displayBooks(library) {
    const container = document.querySelector("main"); 
    container.appendChild(newBookFormCard());
    for (let i = 0; i < library.length; i++) {
        let currentBook = library[i];
        let card = createBookCard(currentBook, i);
        container.appendChild(card);
    }
}
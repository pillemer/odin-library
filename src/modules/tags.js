import { extractID } from './helpers'
import { restoreFromLocalStorage, updateLocalStorage } from './localStorage'

function addTags(id) {
    // dislpays the tags whenever a 
    const library = restoreFromLocalStorage();
    let index = extractID(id); 
    let book = library[index];
    const tagContainer = document.getElementById(`tag container ${index}`)
    clearTags(tagContainer);
    book.categories.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
    });
}

function createTag(label) {
    const div = document.createElement('div');
    div.setAttribute('class', 'tag');
    const span = document.createElement('span');
    span.innerHTML = label;
    const closeIcon = document.createElement('i');
    closeIcon.innerHTML = 'close';
    closeIcon.setAttribute('class', 'material-icons');
    closeIcon.setAttribute('id', label); // is this used?
    closeIcon.addEventListener('click', removeTag)
    div.appendChild(span);
    div.appendChild(closeIcon);
    return div;
}

function removeTag(event) {
    const library = restoreFromLocalStorage();
    const index = extractID(event.target.parentNode.parentNode.id)
    const book = library[index];
    let labelIndex = book.categories.indexOf(event.target.id)
    book.categories.splice(labelIndex,1)
    updateLocalStorage(library);

    addTags(index);
}

function clearTags(container) {
    // removes already present tags before displaying the current ones
    container.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    })
}

function enterTag(event) {
    if(event.target.value != '') {
        if (event.key === 'Enter'){
            const library = restoreFromLocalStorage();
            const index = extractID(event.target.id)
            event.target.value.split(',').forEach(tag => {
                library[index].categories.push(tag);
                updateLocalStorage(library);
            });
            addTags(event.target.id);
            event.target.value = '';
        }
    }
}

export function displayTags() {
    let index = extractID(this.id); //extract index number from button id
    const bookCard = document.getElementById(`card ${index}`);
    
    // hide book card contents 
    bookCard.querySelector('.cardFace').style.display = "none";
    
    // create tag input div
    const tagEditContainer = document.createElement('div');
    tagEditContainer.setAttribute('class', 'tag-edit-container');
    tagEditContainer.setAttribute('id', `tag edit container ${index}`)
    const tagContainer = document.createElement('div');
    tagContainer.setAttribute('class', 'tag-container');
    tagContainer.setAttribute('id', `tag container ${index}`)
    const tagInput = document.createElement('input');
    tagInput.setAttribute('id', `tag input ${index}`)
    tagContainer.appendChild(tagInput);
    tagInput.addEventListener('keyup', enterTag); // adds new tag on 'Enter'
    
    // create 'Done' button
    const doneButton = document.createElement('i');
    doneButton.setAttribute('type', 'button');
    doneButton.innerHTML = 'done'
    doneButton.setAttribute('title', 'Done')
    doneButton.setAttribute('class', 'material-icons-round doneButton')
    doneButton.setAttribute('id', `finish tagging ${index}`)
    doneButton.addEventListener("click", () => {
        bookCard.querySelector('.cardFace').style.display = "block";
        let index = extractID(this.id);
        document.getElementById(`tag edit container ${index}`).remove()
        document.getElementById(`finish tagging ${index}`).remove();
    }); 
    tagEditContainer.appendChild(tagContainer)
    
    bookCard.append(tagEditContainer, doneButton)
    
    addTags(index);
    tagInput.focus();
}
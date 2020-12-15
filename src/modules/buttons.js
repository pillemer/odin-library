import { displayTags } from 'tags'
import { toggleComplete } from 'updateBook'

export function tagButton(index) {
    const button = document.createElement('i');
    button.innerHTML = 'label';
    button.setAttribute('title', 'Add tags');
    button.setAttribute('class', 'material-icons-round tagButton');
    button.setAttribute('id', `tag ${index}`);
    button.addEventListener('click', displayTags);
    return button
}

export function completeButton(index) {
    const button = document.createElement("i");
    button.setAttribute('class', "material-icons-round completeButton");
    button.setAttribute('id', `complete ${index}`);
    button.addEventListener("click", toggleComplete);
    return button
}

import { updateBook } from './updateBook'
import { extractID } from './helpers'


export function createEditBookForm(index, book, bookCard) {
    const editBookForm = document.createElement('form')
    editBookForm.setAttribute('class', 'editForm')
    editBookForm.id = `update-input-field${index}`

    // create 'Title' field
    const titleInput = document.createElement('input')
    titleInput.setAttribute('value', book.title)
    titleInput.setAttribute('type', 'text')
    titleInput.setAttribute('name', 'Edit Title')
    titleInput.setAttribute('oninput', "classList.remove('invalid');")
    editBookForm.appendChild(titleInput)

    // create 'Author' field
    const authorinput = document.createElement('input')
    authorinput.setAttribute('value', book.author)
    authorinput.setAttribute('type', 'text')
    authorinput.setAttribute('name', 'Edit Author')
    authorinput.setAttribute('oninput', "classList.remove('invalid');")
    editBookForm.appendChild(authorinput)

    // create 'Book Length' field
    const bookLengthinput = document.createElement('input')
    bookLengthinput.setAttribute('value', book.pages_total)
    bookLengthinput.setAttribute('type', 'number')
    bookLengthinput.setAttribute('name', 'Edit Total Pages')
    bookLengthinput.setAttribute('min', '1')
    bookLengthinput.setAttribute('oninput', "validity.valid||(value='');")
    bookLengthinput.setAttribute('oninput', "classList.remove('invalid');")
    editBookForm.appendChild(bookLengthinput)

    // create a button div
    const buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'buttonDiv')

    // create 'Submit' button
    const submitButton = document.createElement('i')
    submitButton.setAttribute('type', 'button')
    submitButton.setAttribute('class', 'material-icons-round')
    submitButton.setAttribute('id', `update ${index}`)
    submitButton.innerHTML = 'done'
    submitButton.addEventListener("click", updateBook)
    buttonDiv.appendChild(submitButton);

    // create 'Cancel' button
    const cancelButton = document.createElement('i')
    cancelButton.setAttribute('type', 'button')
    cancelButton.setAttribute('class', 'material-icons-round')
    cancelButton.innerHTML = 'close'
    cancelButton.formNoValidate = true
    cancelButton.addEventListener('click', (event) => {
        bookCard.querySelector('.cardFace').style.display = "initial"
        let index = extractID(bookCard.id)
        document.querySelector(`#update-input-field${index}`).remove()
    })
    buttonDiv.appendChild(cancelButton);
    editBookForm.appendChild(buttonDiv)
    return editBookForm
}

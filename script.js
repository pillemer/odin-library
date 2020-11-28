/* 

TODO:
- add ability to edit book info! 
- add ability to rate book from 0 to 5 (starts 'unrated')
- add bookmark bar to show how far along the book you are (will automatically update the book.complete to true when done?)
- add ability to add tags to books
- display / sort by tags

*/

class Book {
    constructor(title, author, total_pages, complete = false) {
      this.title = toTitle(title);
      this.author = toTitle(author);
      this.total_pages = total_pages;
      this.rating = ""; // future feature
      this.complete = complete;
    }
    info() {
      return [title, author, total_pages, complete];
    }
  }




  function updateDisplay() {
    document.querySelector("#container").innerHTML = "";
    displayBooks(library);
  }
  
  function clearFields() {
    const fields = document.querySelectorAll("input");
    for (let i = 0; i < fields.length - 1; i++) {
      fields[i].value = "";
      fields[fields.length - 1].checked = false;
    }
  }
  
  function displayBooks() {
    const container = document.querySelector("#container");  
    container.style.gridTemplateRows = `repeat(${library.length}, 1fr)`;
    for (let i = 0; i < library.length; i++) {
      currentBook = library[i];
      // create a card for the book
      const card = document.createElement("div");  
      card.title = currentBook.title;
      card.id = "card";
      // create a display for the card
      const contents = document.createElement("div");  
      contents.className = "content";
  
      // TODO: break content into <p> so you can set size limits and arrange them in the card
      contents.innerHTML = `"${currentBook.title}"<br><br>${currentBook.author}<br><br>${currentBook.total_pages} pages<br>`;  
  
      // add a 'mark as complete/incomplete' button
      const completeButton = document.createElement("button");
      if (currentBook.complete) {
        completeButton.innerHTML = "☑️";
        completeButton.title = "Mark as Incomplete";
      } else {
        completeButton.innerHTML = "☐";
        completeButton.title = "Mark as Complete";
      }
      completeButton.id = i;
      completeButton.className = "completeButton button";
      completeButton.addEventListener("click", function () {
        // toggle book.complete
        currentBook.complete = !currentBook.complete;
        setData(); // update local storage
        if (currentBook.complete) {
          completeButton.innerHTML = "☑️";
          completeButton.title = "Mark as Incomplete";
        } else {
          completeButton.innerHTML = "☐";
          completeButton.title = "Mark as Complete";
        }
      });
      contents.appendChild(completeButton);
  



      // add a 'remove from library' button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X ";
      deleteButton.id = i;
      deleteButton.title = "remove book from library";
      deleteButton.className = "deleteButton button";
      deleteButton.addEventListener("click", removeFromLibrary);
      contents.appendChild(deleteButton);

      // add an 'edit' button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.setAttribute('id', i);
      editButton.setAttribute('title', 'Edit book details');
      editButton.setAttribute('class', 'editButton button');
      editButton.addEventListener('click', editContents);
      contents.appendChild(editButton);

      card.appendChild(contents);
      container.appendChild(card);
    }
  }
  
  const addNewButton = document.getElementById("addNew");
  addNewButton.addEventListener("click", () => {
    document.querySelector("#input-field").style.display = "inline-block";
    addNewButton.style.display = "none";
  });
  
  const cancelButton = document.getElementById("cancel");
  cancelButton.addEventListener("click", () => {
    document.querySelector("#input-field").style.display = "none";
    addNewButton.style.display = "inline-block";
  });
  
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
    const inputFields = document.querySelectorAll("input");
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
    library.push(newBook); // add book to library
    console.log('book pushed?')
    setData(); // update local storage
    document.querySelector("#input-field").style.display = "none";
    addNewButton.style.display = "inline-block";
    clearFields();
    updateDisplay();
  });

  // set all titles and authors to Title Case
  function toTitle(str) {
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/g, function (letter) {
      return letter.toUpperCase();
    });
  }

  function removeFromLibrary(event) {
    console.log(this.id)
    library.splice(this.id, 1);
    setData(); // update local storage
    updateDisplay();
  }

  function editContents(event) {
      console.log(library[this.id].title)

      // option 1: open up a modal to update the details
      // option 2: make the title, author and page count sections editable in place
  }
  
  // send library to be stored in local storage
  function setData() {
    localStorage.setItem(`library`, JSON.stringify(library));
  }
  
  // pull library from local storage when page is refreshed
  function restoreFromLocalStorage() {
    if (!localStorage.library) {
      displayBooks(library);
    } else {
      let objects = localStorage.getItem("library");
      objects = JSON.parse(objects);
      library = objects;
      displayBooks(library);
    }
  }
  
  let library = [];
  restoreFromLocalStorage();
  
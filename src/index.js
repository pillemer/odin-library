/* 
TODO:
- DONE - migrate the whole shebang into webpack
- DONE - refactor all the code into modules
- update GHpages to work with the webpacked version

- DONE - add ability to edit book info! 
- DONE - add bookmark bar to show how far along the book you are 
- DONE - add ability to rate book from 0 to 5 (starts 'unrated') 
- DONE - add ability to add tags to books
- DONE - add ability to remove tags from books (close button deletes the tag.)
- DONE - get rid of the page count on the book cover (information already available in bookmark bar)
- DONE - switch all the buttons to <i> tags
- migrate the page count prompt to an html form for added control.
- display / sort by tags
- pressing the read/unread button updates the bookmark bar and vice versa
- instead of having an edit button to edit the details, have each section
  in the card open up a small form in its stead (click on the book name to 
  a text field hiding the title, same for author, bookmark etc.)

BUGS:
- DONE - clicking the save changes button while two or more edit fields are open closes them all and only saves the changes in the one clicked
- DONE - clicking the tag button while the tags are open on another card makes them disappear
- DONE - progress bar and ratings not saved to library 
*/

import { restoreFromLocalStorage } from './localStorage'
import { displayBooks } from './dislpay'

let library = restoreFromLocalStorage();
displayBooks(library)

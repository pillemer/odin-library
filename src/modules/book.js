import { toTitle } from 'helpers';

export class Book {
    constructor(title, author, pages_total, complete = false) {
      this.title = toTitle(title);
      this.author = toTitle(author);
      this.pages_total = pages_total;
      this.pages_read = 0;
      this.rating = 0;
      this.categories = [];
      this.complete = complete;
    }
  }
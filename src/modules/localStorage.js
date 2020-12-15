export function updateLocalStorage(library) {
    // store library in local storage
    localStorage.setItem(`library`, JSON.stringify(library));
}

export function restoreFromLocalStorage() {
    // pull library from local storage when page is refreshed
    if (!localStorage.library) {
        return [];
    } 
    else {
        let objects = localStorage.getItem("library");
        objects = JSON.parse(objects);
        let library = objects;
        return library;
    }
}
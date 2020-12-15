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

export function setToggleImage (button, read = false) {
    if (read) {
        button.innerHTML = "check_circle_outline";
        button.setAttribute('title', "Mark as Unread");
    } else {
        button.innerHTML = "visibility";
        button.setAttribute('title', "Mark as Complete");
    }   
}

export function clearFormFields() {
    const fields = document.getElementById('newBookForm').querySelectorAll("input");
    for (let i = 0; i < fields.length - 1; i++) {
        fields[i].value = "";
        fields[fields.length - 1].checked = false;
    }
}
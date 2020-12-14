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
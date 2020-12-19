export function validate(inputFields) {

    for (let i = 0; i < inputFields.length; i++) {
        
        console.log(inputFields[i].value)
        if (inputFields[i].value == "") {
            inputFields[i].classList.add('invalid');
        return false;
        }
    }
    return true;
}
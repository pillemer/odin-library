export function validate(inputFields) {

    let validCheck = true;
    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].value == "") {
            inputFields[i].classList.add('invalid');
            validCheck = false;
        }
    }
    console.log(validCheck)
    return validCheck;
}
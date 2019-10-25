//DOM
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

//Events
generateEl.addEventListener('click', () => {
    //Plus sign is an urnary operator that automatically converts the string to a number
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
    
    //NOTE: Handy js debugging shorthand to debug multiple vars at once
    //console.log(length, hasLower, hasUpper, hasNumber, hasSymbol)

    let generated_password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
    resultEl.innerText = generated_password;
})

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//clipboard event
clipboard.addEventListener('click', () => {
    //create a textarea to put the password in temporarily
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText

    //if the clipboard was clicked and there was no password, we'll simply return
    if(!password){
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea)
    //select the text in the user's textarea
    textarea.select()
    //copy the selected text
    document.execCommand('copy')
    //remove the temp element
    textarea.remove();
})

//Generate Password Function

function generatePassword(lower, upper, number, symbol, length){
    //init pw var
    

    let generated_password = '';

    //counts number of checked vars
    const typesCount = lower + upper + number + symbol
    //the following is shorthand that automatically turns the array into an array of objects
    //0: {lower: true}
    //1: {upper: true}
    //2: {number: true}
    //3: {symbol: true}
    //filter out unchecked types
    
    //filter is used to remove any elements that are false
    //so filter is saying only take the element if it is equal to true
    const typesArray = [{lower},{upper},{number},{symbol}].filter
    (
        item => Object.values(item)[0] == true
    )
    //if there are no checked boxes, we simply return
    if(typesCount===0){
        return '';
    }
    //loop over length
    //this loop is saying that every so many characters, we're going to use a specific type of char
    //e.g. every 4th character is a symbol
    for(let i = 0; i<length; i+= typesCount){
        typesArray.forEach(type => {
            //funcName is getting the name of the function
            const funcName = Object.keys(type)[0]
            console.log('index: ', i, 'funcName: ', funcName)
            generated_password += randomFunc[funcName]()
            console.log('generatedPassword', generated_password)
        })
    }
    //the problem with the loop is that we will get the number of the closest increment
    //if we enter a length of 1, we could still get a password of 4 characters because we have 4 checkboxes checked, which makes the increment 4
    //we will simply slice the string to handle this case
    generated_password = generated_password.slice(0, length)
    return generated_password;
}

//Generator functions

/*
* Get random lower case letter
*/
function getRandomLower(){
    //get random number between 1 and 26 to get char codes
    //97 is an offset for where the lowercase letters start in our character sets
    let random_char_code = Math.floor(
        (Math.random() * 26)+97
        );
    return String.fromCharCode(random_char_code)
}

/*
* Get random upper case letter
*/
function getRandomUpper(){
    //get random number between 1 and 26 to get char codes
    //97 is an offset for where the lowercase letters start in our character sets
    let random_char_code = Math.floor(
        (Math.random() * 26)+65
        );
    return String.fromCharCode(random_char_code)
}

/*
* Get random upper case letter
*/
function getRandomNumber(){
    //get random number between 1 and 26 to get char codes
    //97 is an offset for where the lowercase letters start in our character sets
    let random_char_code = Math.floor(
        (Math.random() * 10)+48
        );
    return String.fromCharCode(random_char_code)
}

/*
* Get random upper case letter
*/
function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=,.';
    return symbols[Math.floor(Math.random()*symbols.length)]
}

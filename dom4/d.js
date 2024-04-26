const word = document.querySelector('.input-text');
const btn = document.querySelector('.btn');
const result = document.querySelector('.results');

btn.addEventListener('click', countVowel);

function countVowel () {
    let count = 0;
    let wordVal = word.value.toLowerCase();
    let regex = /^[aeiou]$/i;

    for(let i = 0; i < wordVal.length; i++) {
        const letter = wordVal[i];
        if (letter.match(regex)) {
            count++
        }
    }

    result.innerText = `${wordVal} has ${count} vowels`;
}
const btn = document.querySelector('button');
const p = document.querySelector('p');
const url = "https://api.chucknorris.io/jokes/random"


btn.addEventListener('click', getJoke);

function getJoke() {
    fetch(url).then(res => res.json()).then(data => p.innerHTML = data.value);
}

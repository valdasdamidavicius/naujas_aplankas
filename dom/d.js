const count = document.querySelector(".count");
const subtract = document.querySelector(".subtract");
const reset = document.querySelector(".reset");
const add = document.querySelector(".add");
const buttons = document.querySelector(".buttons");

buttons.addEventListener('click', function (e) {
    if (e.target.classList.contains('add')) {
        count.innerHTML++;
        setColor();
    } else if (e.target.classList.contains('subtract')) {
        count.innerHTML--;
        setColor();
    } else if (e.target.classList.contains('reset')) {
        count.innerHTML = 0;
        setColor();
    }
});

// add.addEventListener("click", function () {
//   count.innerHTML++
// });

// const subtractFunc = () => {
//   count.innerHTML--
// };

// subtract.addEventListener("click", subtractFunc);

// reset.addEventListener("click", function () {
//   count.innerHTML = 0;
// });

const setColor = () => {
    if (count.innerHTML > 0) {
        count.style.color = 'yellow'
    } else if (count.innerHTML < 0) {
        count.style.color = 'red'
    } else {
        count.style.color = 'white'
    }
};
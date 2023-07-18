import { Dice } from "./classes/Dice.js";
import { ScoreCard } from "./classes/ScoreCard.js";

const amountOfDice = 5;
let dice = [];
let images = "";

for(let i = 0; i < amountOfDice; i++){
    let newDie = new Dice();
    dice.push(newDie);
    images += `<img src="./images/dice_0.jpg" class="dice-images" id="dice-nr${i}">`;
    document.getElementById("dice-div").innerHTML = images;
}

updateDice();

/** Eventlisteners */
// Update images upon throwing
const throwButton = document.getElementById("throw-button");
throwButton.addEventListener('click', evt => {
    dice.forEach(function (currentDie) {
        currentDie.throw();
    });
    updateDice();
});

// Be able to lock/unlock the dice
const diceButtons = document.querySelectorAll("img.dice-images");
diceButtons.forEach(die => die.addEventListener('click', evt => {
    dice[die.id.slice(-1)].lock();
    (dice[die.id.slice(-1)].getLocked() ? document.getElementById(die.id).style.opacity = 0.5 : document.getElementById(die.id).style.opacity = 1.0);
}));

// Redirect to login.html
const loginButton = document.getElementById("login-button");
loginButton.addEventListener('click', evt => window.location.href = "./web_pages/login.html");

// Redirect to register.html
const registerButton = document.getElementById("register-button");
registerButton.addEventListener('click', evt => window.location.href = "./web_pages/login.html");

/** Help functions */
function updateDice() {
    for(let i = 0; i < amountOfDice; i++){
        let currentDieNum = dice[i].getCurrentNum();
        document.getElementById(`dice-nr${i}`).src = `./images/dice_${currentDieNum}.jpg`;
    }
}

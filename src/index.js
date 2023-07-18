import { Dice } from "./classes/Dice.js";
import { ScoreCard } from "./classes/ScoreCard.js";

let dice = [];
for(let i = 0; i < 6; i++){
    let newDie = new Dice();
    dice.push(newDie);
}

updateDice();

/** Eventlisteners */
const throwButton = document.getElementById("throw-button");
throwButton.addEventListener('click', evt => {
    dice.forEach(function (currentDie) {
        currentDie.throw();
    });
    updateDice();
    console.log(dice.map(x => x.getCurrentNum()));
})

const loginButton = document.getElementById("login-button");
loginButton.addEventListener('click', evt => window.location.href = "./web_pages/login.html");

const registerButton = document.getElementById("register-button");
registerButton.addEventListener('click', evt => window.location.href = "./web_pages/login.html");

/** Help functions */
function updateDice() {
    let p = "";
    dice.forEach(function (currentDie) {
        let currentDieNum = currentDie.getCurrentNum();
        p += `<img src="./images/dice_${currentDieNum}.jpg" class="dice-images" id="dice-nr${currentDieNum}">`;
    });
    document.getElementById("dice-div").innerHTML = p;
}

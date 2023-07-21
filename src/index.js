/** Imports */
import { Dice } from "./classes/Dice.js";
import { ScoreCard } from "./classes/ScoreCard.js";

// Create and show the scorecard
const scoreCard = new ScoreCard();
showScorecard();

// Create and show the five dice.
const amountOfDice = 5;
let dice = [];
let images = "";

for(let i = 0; i < amountOfDice; i++){
    let newDie = new Dice();
    dice.push(newDie);
    images += `<img src="./images/dice_0.jpg" class="dice-images" id="dice-nr${i}">`;
}
document.getElementById("dice-div").innerHTML = images;

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


/** Eventlisteners for score-card */
const acesField = document.getElementById("Aces");
acesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Aces")){
        scoreCard.setAces(scoreCard.acesCheck(dice));
        scoreCard.lock("Aces");
        scoreCard.bonusCheck();
        updateScorecard();
        unlockAllDice();
    }
});

const twosField = document.getElementById("Twos");
twosField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Twos")){
        scoreCard.setTwos(scoreCard.twosCheck(dice));
        scoreCard.lock("Twos");
        scoreCard.bonusCheck();
        updateScorecard();
        unlockAllDice();
    }
});

const threesField = document.getElementById("Threes");
threesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Threes")){
        scoreCard.setThrees(scoreCard.threesCheck(dice));
        scoreCard.lock("Threes");
        scoreCard.bonusCheck();
        updateScorecard();
        unlockAllDice();
    }
});

const foursField = document.getElementById("Fours");
foursField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Fours")){
        scoreCard.setFours(scoreCard.foursCheck(dice));
        scoreCard.lock("Fours");
        scoreCard.bonusCheck();
        updateScorecard();
        unlockAllDice();
    }
});

const fivesField = document.getElementById("Fives");
fivesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Fives")){
        scoreCard.setFives(scoreCard.fivesCheck(dice));
        scoreCard.lock("Fives");
        scoreCard.bonusCheck();
        updateScorecard();
        unlockAllDice();
    }
});

const sixesField = document.getElementById("Sixes");
sixesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Sixes")){
        scoreCard.setSixes(scoreCard.sixesCheck(dice));
        scoreCard.lock("Sixes");
        scoreCard.bonusCheck();
        updateScorecard();
        unlockAllDice();
    }
});

const fullHouseField = document.getElementById("Full House");
fullHouseField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Full House")){
        (scoreCard.fullHouseCheck(dice) ? scoreCard.setFullHouse(25) : scoreCard.setFullHouse(0));
        scoreCard.lock("Full House");
        updateScorecard();
        unlockAllDice();
    }
});

/** Help functions */
/**
 * Outputs the correct image of the dice with their new values.
 */
function updateDice() {
    for(let i = 0; i < amountOfDice; i++){
        let currentDieNum = dice[i].getCurrentNum();
        document.getElementById(`dice-nr${i}`).src = `./images/dice_${currentDieNum}.jpg`;
    }
}

function unlockAllDice() {
    for(let i = 0; i < 5; i++){
        if(dice[i].getLocked()){
            dice[i].lock();
            document.getElementById(`dice-nr${i}`).style.opacity = 1;
        }
    }
}

/**
 * Generates the entire table that works as a template for the scorecard.
 * Only the initial values will be loaded here.
 */
function showScorecard() {
    let scorecardScores = scoreCard.toObject();
    let scorecard = document.getElementById("score-card-values");
    let p = "<table id='scores'>";
    
    for(const key in scorecardScores){
        if(key === "Total lower") {
            p += `<tr id="${key}"><td id="${key}-name">${key}</td><td id="${key}-value">${(scorecardScores[key] !== undefined ? scorecardScores[key] : '')}</td></tr>`;
            p += `<tr id="Total upper2"><td id="Total upper2-name">Total upper</td><td id="Total upper2-value">${scorecardScores["Total upper"]}</td></tr>`;
        } else {
            p += `<tr id="${key}"><td id="${key}-name">${key}</td><td id="${key}-value">${(scorecardScores[key] !== undefined ? scorecardScores[key] : '')}</td></tr>`;
        }
    }
    scorecard.innerHTML = p + "</table>";
}

/**
 * Updates the scoreboard when a new value is added to it.
 */
function updateScorecard() {
    let upToDateScores = scoreCard.toObject();
    for(const key in upToDateScores){
        document.getElementById(`${key}-value`).innerHTML = (upToDateScores[key] !== undefined ? upToDateScores[key] : '');
    }
    document.getElementById('Total upper2-value').innerHTML = upToDateScores['Total upper'];
}

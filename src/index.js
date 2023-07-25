/** Imports */
import { Dice } from "./classes/Dice.js";
import { ScoreCard } from "./classes/ScoreCard.js";

let scoreSpacesFilled = 0;
let gameComplete = false;

// Set turn counter
let throwCounter = 3;
document.getElementById("throw-counter").innerHTML = `Throws left: ${throwCounter}`;

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
    images += `<img src="./images/dice_0.jpg" class="dice-images" id="dice-nr${i}" draggable=false>`;
}
document.getElementById("dice-div").innerHTML = images;

updateDice();


/** Eventlisteners */
// Update images upon throwing
const throwButton = document.getElementById("throw-button");
throwButton.addEventListener('click', evt => {
    if(throwCounter > 0 && !gameComplete){
        dice.forEach(function (currentDie) {
            currentDie.throw();
        });
        updateDice();
        updateThrowCounter();
    }
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
registerButton.addEventListener('click', evt => window.location.href = "./web_pages/register.html");


/** Eventlisteners for score-card */
const acesField = document.getElementById("Aces");
acesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Aces") && dice[0].getCurrentNum() !== 0){
        scoreCard.setAces(scoreCard.acesCheck(dice));
        scorecardClick("Aces");
    }
});
acesField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Aces")){document.getElementById("Aces-value").innerHTML = scoreCard.acesCheck(dice)}});
acesField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Aces")){document.getElementById("Aces-value").innerHTML = ''}});

const twosField = document.getElementById("Twos");
twosField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Twos") && dice[0].getCurrentNum() !== 0){
        scoreCard.setTwos(scoreCard.twosCheck(dice));
        scorecardClick("Twos");
    }
});
twosField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Twos")){document.getElementById("Twos-value").innerHTML = scoreCard.twosCheck(dice)}});
twosField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Twos")){document.getElementById("Twos-value").innerHTML = ''}});

// Threes
const threesField = document.getElementById("Threes");
threesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Threes") && dice[0].getCurrentNum() !== 0){
        scoreCard.setThrees(scoreCard.threesCheck(dice));
        scorecardClick("Threes");
    }
});
threesField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Threes")){document.getElementById("Threes-value").innerHTML = scoreCard.threesCheck(dice)}});
threesField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Threes")){document.getElementById("Threes-value").innerHTML = ''}});

// Fours
const foursField = document.getElementById("Fours");
foursField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Fours") && dice[0].getCurrentNum() !== 0){
        scoreCard.setFours(scoreCard.foursCheck(dice));
        scorecardClick("Fours");
    }
});
foursField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Fours")){document.getElementById("Fours-value").innerHTML = scoreCard.foursCheck(dice)}});
foursField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Fours")){document.getElementById("Fours-value").innerHTML = ''}});

// Fives
const fivesField = document.getElementById("Fives");
fivesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Fives") && dice[0].getCurrentNum() !== 0){
        scoreCard.setFives(scoreCard.fivesCheck(dice));
        scorecardClick("Fives");
    }
});
fivesField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Fives")){document.getElementById("Fives-value").innerHTML = scoreCard.fivesCheck(dice)}});
fivesField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Fives")){document.getElementById("Fives-value").innerHTML = ''}});

// Sixes
const sixesField = document.getElementById("Sixes");
sixesField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Sixes") && dice[0].getCurrentNum() !== 0){
        scoreCard.setSixes(scoreCard.sixesCheck(dice));
        scorecardClick("Sixes");
    }
});
sixesField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Sixes")){document.getElementById("Sixes-value").innerHTML = scoreCard.sixesCheck(dice);}});
sixesField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Sixes")){document.getElementById("Sixes-value").innerHTML = '';}});

// Three of a kind
const threeOfAKindField = document.getElementById("Three of a kind");
threeOfAKindField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Three of a kind") && dice[0].getCurrentNum() !== 0){
        (scoreCard.nOfAKindCheck(dice) >= 3 ? scoreCard.setThreeOfAKind(scoreCard.chanceCheck(dice)) : scoreCard.setThreeOfAKind(0));
        scorecardClick("Three of a kind");
    }
});
threeOfAKindField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Three of a kind")){document.getElementById("Three of a kind-value").innerHTML = (scoreCard.nOfAKindCheck(dice) >= 3 ? scoreCard.chanceCheck(dice) : 0)}});
threeOfAKindField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Three of a kind")){document.getElementById("Three of a kind-value").innerHTML = ''}});

// Four of a kind
const fourOfAKindField = document.getElementById("Four of a kind");
fourOfAKindField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Four of a kind") && dice[0].getCurrentNum() !== 0){
        (scoreCard.nOfAKindCheck(dice) >= 4 ? scoreCard.setFourOfAKind(scoreCard.chanceCheck(dice)) : scoreCard.setFourOfAKind(0));
        scorecardClick("Four of a kind");
    }
});
fourOfAKindField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Four of a kind")){document.getElementById("Four of a kind-value").innerHTML = (scoreCard.nOfAKindCheck(dice) >= 4 ? scoreCard.chanceCheck(dice) : 0)}});
fourOfAKindField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Four of a kind")){document.getElementById("Four of a kind-value").innerHTML = ''}});

// Full House
const fullHouseField = document.getElementById("Full House");
fullHouseField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Full House") && dice[0].getCurrentNum() !== 0){
        (scoreCard.fullHouseCheck(dice) ? scoreCard.setFullHouse(25) : scoreCard.setFullHouse(0));
        scorecardClick("Full House");
    }
});
fullHouseField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Full House")){document.getElementById("Full House-value").innerHTML = (scoreCard.fullHouseCheck(dice) ? 25 : 0)}});
fullHouseField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Full House")){document.getElementById("Full House-value").innerHTML = ''}});

// Small straight
const smallStraightField = document.getElementById("Small straight");
smallStraightField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Small straight") && dice[0].getCurrentNum() !== 0){
        (scoreCard.straightCheck(dice) >= 4 ? scoreCard.setSmallStraight(30) : scoreCard.setSmallStraight(0));
        scorecardClick("Small straight");
    }
});
smallStraightField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Small straight")){document.getElementById("Small straight-value").innerHTML = (scoreCard.straightCheck(dice) >= 4 ? 30 : 0)}});
smallStraightField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Small straight")){document.getElementById("Small straight-value").innerHTML = ''}});

// Large straight
const largeStraightField = document.getElementById("Large straight");
largeStraightField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Large straight") && dice[0].getCurrentNum() !== 0){
        (scoreCard.straightCheck(dice) === 5 ? scoreCard.setLargeStraight(40) : scoreCard.setLargeStraight(0));
        scorecardClick("Large straight");
    }
});
largeStraightField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Large straight")){document.getElementById("Large straight-value").innerHTML = (scoreCard.straightCheck(dice) === 5 ? 40 : 0)}});
largeStraightField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Large straight")){document.getElementById("Large straight-value").innerHTML = ''}});

// Yahtzee
const yahtzeeField = document.getElementById("Yahtzee");
yahtzeeField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Yahtzee") && dice[0].getCurrentNum() !== 0){
        (scoreCard.nOfAKindCheck(dice) === 5 ? scoreCard.setYahtzee(50) : scoreCard.setYahtzee(0));
        scorecardClick("Yahtzee");
    }
});
yahtzeeField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Yahtzee")){document.getElementById("Yahtzee-value").innerHTML = (scoreCard.nOfAKindCheck(dice) === 5 ? 50 : 0)}});
yahtzeeField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Yahtzee")){document.getElementById("Yahtzee-value").innerHTML = ''}});

// Chance
const chanceField = document.getElementById("Chance");
chanceField.addEventListener('click', evt => {
    if(!scoreCard.getLocked().includes("Chance") && dice[0].getCurrentNum() !== 0){
        scoreCard.setChance(scoreCard.chanceCheck(dice));
        scorecardClick("Chance");
    }
});
chanceField.addEventListener("mouseover", () => {if(!scoreCard.getLocked().includes("Chance")){document.getElementById("Chance-value").innerHTML = scoreCard.chanceCheck(dice)}});
chanceField.addEventListener("mouseleave", () => {if(!scoreCard.getLocked().includes("Chance")){document.getElementById("Chance-value").innerHTML = ''}});

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

function resetDice() {
    for(let i = 0; i < 5; i++){
        if(dice[i].getLocked()){
            dice[i].lock();
            document.getElementById(`dice-nr${i}`).style.opacity = 1;
        }
        dice[i].resetNum();
    }
    updateDice();
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

function updateThrowCounter(){
    throwCounter -= 1;
    document.getElementById("throw-counter").innerHTML = `Throws left: ${throwCounter}`;
}

function resetThrowCounter(){
    throwCounter = 3;
    document.getElementById("throw-counter").innerHTML = `Throws left: ${throwCounter}`;
}

function scorecardClick(fieldName) {
    scoreCard.lock(fieldName);
    scoreCard.bonusCheck();
    updateScorecard();
    resetDice();
    resetThrowCounter();
    scoreSpacesFilled += 1;
    if(scoreSpacesFilled === 13) gameComplete = true;
}

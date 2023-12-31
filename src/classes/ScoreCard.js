/**
 * This class represents a standard Yahtzee scorecard.
 * Each of the fields can be filled in based on the values of the dice.
 */
export class ScoreCard {
    #lockedFields = [];
    /**
     * Attributes
     * Note: The total scores are not present in the attributes.
     * I made the trade-off to save a little storage and use computing power
     * to calculate the totals every single time. In return, no variables have
     * to be made.
     */
    /** Top half of scorecard */
    #aces;              // number
    #twos;              // number
    #threes;            // number
    #fours;             // number
    #fives;             // number
    #sixes;             // number
    #bonus = false;     // boolean

    /** Bottom half of scorecard */
    #threeOfAKind;      // number
    #fourOfAKind;       // number
    #fullHouse;         // number
    #smallStraight;     // number
    #largeStraight;     // number
    #yahtzee;           // number
    #chance;            // number

    constructor() {}

    /**
     * For every die that has a value of one, the total score will raise.
     * @param {Dice[]} dice An array with Dice objects. 
     * @returns The score of all aces added together.
     */
    acesCheck(dice){
        let totalAcesScore = 0;
        for(const currentDie of dice){
            if(currentDie.getCurrentNum() === 1) totalAcesScore += 1;
        }
        return totalAcesScore;
    }

    /**
     * For every die that has the value of two, the total score will raise.
     * @param {Dice[]} dice An array with Dice objects. 
     * @returns The score of all twos added together.
     */
    twosCheck(dice){
        let totalTwosScore = 0;
        for(const currentDie of dice){
            if(currentDie.getCurrentNum() === 2) totalTwosScore += 2;
        }
        return totalTwosScore;
    }

    /**
     * For every die that has the value of three, the total score will raise.
     * @param {Dice[]} dice An array with Dice objects. 
     * @returns The score of all threes added together.
     */
    threesCheck(dice){
        let totalThreesScore = 0;
        for(const currentDie of dice){
            if(currentDie.getCurrentNum() === 3) totalThreesScore += 3;
        }
        return totalThreesScore;
    }

    /**
     * For every die that has the value of four, the total score will raise.
     * @param {Dice[]} dice An array with Dice objects. 
     * @returns The score of all fours added together.
     */
    foursCheck(dice){
        let totalFoursScore = 0;
        for(const currentDie of dice){
            if(currentDie.getCurrentNum() === 4) totalFoursScore += 4;
        }
        return totalFoursScore;
    }

    /**
     * For every die that has the value of five, the total score will raise.
     * @param {Dice[]} dice An array with Dice objects. 
     * @returns The score of all fives added together.
     */
    fivesCheck(dice){
        let totalFivesScore = 0;
        for(const currentDie of dice){
            if(currentDie.getCurrentNum() === 5) totalFivesScore += 5;
        }
        return totalFivesScore;
    }

    /**
     * For every die that has the value of six, the total score will raise.
     * @param {Dice[]} dice An array with Dice objects. 
     * @returns The score of all sixes added together.
     */
    sixesCheck(dice){
        let totalSixesScore = 0;
        for(const currentDie of dice){
            if(currentDie.getCurrentNum() === 6) totalSixesScore += 6;
        }
        return totalSixesScore;
    }

    /**
     * Checks the amount of dice that have the same value.
     * This method is used in the calcualtion for 'Three of a kind', 'Four of a kind' and 'Yahtzee'.
     * @param {Dice[]} dice 
     * @returns The amount of dice that have the same value
     */
    nOfAKindCheck(dice){
        let diceValues = [];
        for(const currentDie of dice){
            if(currentDie.getCurrentNum() === 0) return 0;
            diceValues.push(currentDie.getCurrentNum());
        }
        diceValues.sort((a,b)=>a-b);

        let consecutiveNumbers = 1;
        let highestConsecutiveNumber = 0;
        for(let i = 1; i < diceValues.length; i++){
            (diceValues[i] === diceValues[i-1] ? consecutiveNumbers += 1 : consecutiveNumbers = 1);
            if(consecutiveNumbers > highestConsecutiveNumber) highestConsecutiveNumber = consecutiveNumbers;
        }

        return highestConsecutiveNumber;
    }

    /**
     * Checks in an array of dice whether full house has been achieved or not.
     * @param {Dice[]} dice An array with Dice objects.
     * @returns True if there is full house, false if not.
     */
    fullHouseCheck(dice){
        let number1 = [0,0];
        let number2 = [0,0];
        let ifCompleted = false;
        for(const currentDie of dice){
            if(number1[0] === 0 && !ifCompleted){number1 = [currentDie.getCurrentNum(), 1]; ifCompleted = true;}
            if(number2[0] === 0 && currentDie.getCurrentNum() !== number1[0] && !ifCompleted){number2 = [currentDie.getCurrentNum(), 1]; ifCompleted = true;}
            if(currentDie.getCurrentNum() === number1[0] && !ifCompleted){number1[1] += 1; ifCompleted = true;}
            if(currentDie.getCurrentNum() === number2[0] && !ifCompleted){number2[1] += 1; ifCompleted = true;}
            ifCompleted = false;
        }

        return (number1[1] === 2 && number2[1] === 3) || (number1[1] === 3 && number2[1] === 2);
    }

    /**
     * Sorts the dice in ascending order, then counts the consecutive dice.
     * This method can be used for either small or large straight as it returns a number and not a boolean.
     * @param {Dice[]} dice An array with Dice objects.
     * @returns The number of consecutive dice.
     */
    straightCheck(dice){
        let diceValues = [];
        for(const currentDie of dice){diceValues.push(currentDie.getCurrentNum());}
        diceValues.sort((a,b)=>a-b);

        let consecutiveNumbers = 1;
        for(let i = 1; i < diceValues.length; i++){
            (diceValues[i] === diceValues[i-1]+1 ? consecutiveNumbers += 1 : (diceValues[i] === diceValues[i-1] ? consecutiveNumbers += 0 : consecutiveNumbers = 1));
        }

        return consecutiveNumbers;
    }

    /**
     * Loops through every die and adds their values together.
     * @param {Dice[]} dice An array with Dice objects. 
     * @returns The total score of the dice.
     */
    chanceCheck(dice){
        let addedScore = 0;
        for(const currentDie of dice){
            addedScore += currentDie.getCurrentNum();
        }
        return addedScore;
    }

    /**
     * Locks the field so the value won't be updated.
     * @param {string} fieldName 
     */
    lock(fieldName){
        this.#lockedFields.push(fieldName);
    }

    /**
     * Returns the total score of the upper half disregarding the bonus.
     * Mainly used for Total Score (row above BONUS) on the scorecard
     * @returns Total score of the upper section
     */
    totalTop() {
        const upperHalf = [this.#aces, this.#twos, this.#threes, this.#fours, this.#fives, this.#sixes];
        let totalTopScore = 0;
        upperHalf.forEach(score => (score !== undefined ? totalTopScore += score : totalTopScore += 0));

        return totalTopScore;
    }

    /**
     * Checks whether a bonus score should be applied.
     * Bonus is given if the score of the upper half adds up to 63.
     * 63 can be achieved by getting 3 of a kind for every number.
     */
    bonusCheck() {
        let totalScoreTop = this.totalTop();
        if(totalScoreTop >= 63) this.#bonus = true;
    }

    /**
     * Calculates the total score of the lower half of the card.
     * @returns Total score of lower half.
     */
    lowerTotal(){
        const bottomHalf = [this.#threeOfAKind, this.#fourOfAKind, this.#fullHouse, this.#smallStraight, this.#largeStraight, this.#yahtzee, this.#chance];
        let totalScoreLower = 0;
        bottomHalf.forEach(score => (score !== undefined ? totalScoreLower += score : totalScoreLower + 0));

        return totalScoreLower;
    }

    /**
     * Calculates the total score of the upper half of the card and checks whether the
     * player gets a bonus score.
     * @returns Total score of upper half with/without bonus.
     */
    upperTotal(){
        let totalTopBonus = this.totalTop();
        return (this.#bonus ? totalTopBonus + 35 : totalTopBonus);
    }

    /**
     * Resets the card and removes all values that have been filled in.
     * Instead of putting every value to zero, they are turned into undefined.
     * Other methods check whether a value is undefined or not.
     */
    resetCard(){
        this.#aces = undefined;     this.#threeOfAKind = undefined;
        this.#twos = undefined;     this.#fourOfAKind = undefined;
        this.#threes = undefined;   this.#fullHouse = undefined;
        this.#fours = undefined;    this.#smallStraight = undefined;
        this.#fives = undefined;    this.#largeStraight = undefined;
        this.#sixes = undefined;    this.#yahtzee = undefined;
        this.#bonus = false;        this.#chance = undefined;
    }

    /**
     * Creates an object with all the scores of the scorecard.
     * This is representend in key/value pairs where the key is the name of said score, and the value is a number with the score.
     * @returns Object with key/value pairs
     */
    toObject(){
        return {
            "Aces": this.#aces,
            "Twos": this.#twos,
            "Threes": this.#threes,
            "Fours": this.#fours,
            "Fives": this.#fives,
            "Sixes": this.#sixes,
            "Total score upper": this.totalTop(),
            "Bonus": (this.#bonus ? '✔️' : '✖️'),
            "Total upper": this.upperTotal(),

            "Three of a kind": this.#threeOfAKind,
            "Four of a kind": this.#fourOfAKind,
            "Full House": this.#fullHouse,
            "Small straight": this.#smallStraight,
            "Large straight": this.#largeStraight,
            "Yahtzee": this.#yahtzee,
            "Chance": this.#chance,
            "Total lower": this.lowerTotal(),

            "Grand total": this.lowerTotal() + this.upperTotal()
        };
    }

    /** Getters & Setters */
    getAces(){return this.#aces;}
    setAces(score){this.#aces = score;}
    
    getTwos(){return this.#twos;}
    setTwos(score){this.#twos = score;}

    getThrees(){return this.#threes;}
    setThrees(score){this.#threes = score;}

    getFours(){return this.#fours;}
    setFours(score){this.#fours = score;}

    getFives(){return this.#fives;}
    setFives(score){this.#fives = score;}

    getSixes(){return this.#sixes;}
    setSixes(score){this.#sixes = score;}

    getBonus(){return this.#bonus;}

    getThreeOfAKind(){return this.#threeOfAKind;}
    setThreeOfAKind(score){this.#threeOfAKind = score;}

    getFourOfAKind(){return this.#fourOfAKind;}
    setFourOfAKind(score){this.#fourOfAKind = score;}

    getFullHouse(){return this.#fullHouse;}
    setFullHouse(score){this.#fullHouse = score;}

    getSmallStraight(){return this.#smallStraight;}
    setSmallStraight(score){this.#smallStraight = score;}

    getLargeStraight(){return this.#largeStraight;}
    setLargeStraight(score){this.#largeStraight = score;}

    getYahtzee(){return this.#yahtzee;}
    setYahtzee(score){this.#yahtzee = score;}

    getChance(){return this.#chance;}
    setChance(score){this.#chance = score;}

    getLocked(){return this.#lockedFields;}
}

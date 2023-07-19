/**
 * This class represents a standard Yahtzee scorecard.
 * Each of the fields can be filled in based on the values of the dice.
 */
export class ScoreCard {
    /** Top half of scorecard */
    #aces;
    #twos;
    #threes;
    #fours;
    #fives;
    #sixes;
    #bonus = false;

    /** Bottom half of scorecard */
    #threeOfAKind;
    #fourOfAKind;
    #fullHouse;
    #smallStraight;
    #largeStraight;
    #yahtzee;
    #chance;

    constructor() {}

    /**
     * Returns the total score of the upper half disregarding the bonus.
     * Mainly used for Total Score (row above BONUS) on the scorecard
     * @returns total score of the upper section
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
     * @returns total score of lower half.
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
     * @returns total score of upper half with/without bonus.
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
     * @returns object with key/value pairs
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
            "Bonus": this.#bonus,
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
}

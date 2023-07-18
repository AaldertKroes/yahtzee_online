/**
 * A small class representing a die.
 * When a dice is thrown, it will be assigned a number between 1-6. When this number is 0, it has yet to be assigned.
 * 
 * The die can be either locked or unlocked. When the die is locked, a new value to currentNum can not be assigned.
 */
export class Dice {
    /** Attributes */
    #currentNum = 0;
    #locked = false;

    /**
     * Changes currentNum to one of the sides of a die, which consists of the numbers 1-6.
     * This is to simulate a new number when a die is thrown.
     */
    throw() {
        let diceSides = 6;
        if(!this.#locked){
            this.#currentNum = Math.floor(Math.random() * diceSides) + 1;
        }
    }

    /**
     * Changes #locked to true. When locked, throw() can not assign a new value to currentNum.
     */
    lock() {this.#locked = true;}

    /**
     * Changes #locked to false. When unlocked, throw() can assign a new value to currentNum
     */
    unlock() {this.#locked = false;}

    /** Getters */
    getCurrentNum() {return this.#currentNum;}
    getLocked() {return this.#locked;}
}

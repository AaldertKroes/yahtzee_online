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

    constructor() {}

    /**
     * Changes `this.#currentNum` to one of the sides of a die, which consists of the numbers 1-6.
     * This is to simulate a new number when a die is thrown.
     */
    throw() {
        let diceSides = 6;
        if(!this.#locked){
            this.#currentNum = Math.floor(Math.random() * diceSides) + 1;
        }
    }

    /**
     * Changes `this.#locked` to either true or false.
     * When locked, `this.throw()` can not assign a new value to `this.#currentNum`.
     * When unlocked, `this.throw()` *can* assign a new value to `this.#currentNum`.
     */
    lock() {(this.#locked ? this.#locked = false : this.#locked = true);}

    /**
     * Resets `this.#currentNum` back to 0.
     */
    resetNum() {this.#currentNum = 0;}

    /** Getters */
    getCurrentNum() {return this.#currentNum;}
    getLocked() {return this.#locked;}
}

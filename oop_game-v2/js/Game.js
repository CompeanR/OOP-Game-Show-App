/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    };

    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */
    createPhrases() {
        const phrases = [
            {
                phrase: 'God is good all the time'
            },
            {
                phrase: 'Keep calm and stack overflow'
            },
            {
                phrase: 'Our habits define us'
            },
            {
                phrase: 'Just do it'
            },
            {
                phrase: 'Keep going'
            }
        ];
        
        return phrases
    };

    /**
     * Select random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        const randomObjectNumber = Math.floor( Math.random() * this.phrases.length);
        const phraseObject = new Phrase (this.phrases[randomObjectNumber].phrase);
        return phraseObject
    };

    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        document.querySelector('#overlay').style.display = 'none'
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
     * Method to handle the other methods.
     */
    handleInteraction() {
        
    };

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        const blockText = document.querySelectorAll('#phrase ul li');
        
        // blockText.forEach((li, i) => {
        //     if (blockText[i].className === 'show') {
        //         return true
        //     } else {
        //         return false
        //     };
        // });

        for ( let i = 0; i < blockText.length; i++) {
            if (blockText[i].className === 'show') {
                return true
            } else {
                return false
            };
        };
    };

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        const heart = document.querySelectorAll('.tries img');
        
        if (this.missed < heart.length) {
            heart[this.missed].src = 'images/lostHeart.png'
        };
        
        this.missed += 1
    };

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.querySelector('#overlay');
        const h1 = document.querySelector('#overlay h1');

        if (!gameWon) {
            overlay.className = 'lose'
            overlay.style.display = 'block'
            h1.innerHTML = 'Sorry, better luck next time!'
        } else {
            overlay.className = 'win';
            overlay.style.display = 'block';
            h1.innerHTML = 'Great job!';
        };
    };
};
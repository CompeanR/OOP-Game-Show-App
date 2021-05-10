/**
 * The class Game handle the most part of our application.
 */
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
        
        return phrases;
    };

    /**
     * Select random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        const randomObjectNumber = Math.floor( Math.random() * this.phrases.length);
        const phraseObject = new Phrase (this.phrases[randomObjectNumber].phrase);
        return phraseObject;
    };

    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        document.querySelector('#overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    };

    /**
     * Method to handle the other methods.
     */
    handleInteraction(button) {
        const ulPhrase = document.querySelector('#phrase ul');
        let ulPhraseChild = document.querySelector('#phrase ul li');
        
        const qwerty = document.querySelectorAll('#qwerty .keyrow button');
        button.disabled = true;

        const hearts = document.querySelectorAll('.tries img');

        if (!game.activePhrase.checkLetter(button.textContent)) {
            button.className = 'wrong';
            game.removeLife();
        } else {
            button.className = 'chosen';
            game.activePhrase.showMatchedLetter(button.textContent);
        };

        if (game.checkForWin()) {
            game.gameOver(true);
            qwerty.forEach(button => {
                button.className = 'key';
                button.disabled = false;
            });
            hearts.forEach(heart => heart.src = 'images/liveHeart.png');

            for (const li in ulPhrase) {
                while (ulPhraseChild) {
                    ulPhrase.removeChild(ulPhraseChild);
                    ulPhraseChild = document.querySelector('#phrase ul li');
                };
            };

        } else if (this.missed === 5) {
            game.gameOver(false);
            qwerty.forEach(button => {
                button.className = 'key';
                button.disabled = false;
            });
            hearts.forEach(heart => heart.src = 'images/liveHeart.png');
            
            for (const li in ulPhrase) {
                while (ulPhraseChild) {
                    ulPhrase.removeChild(ulPhraseChild);
                    ulPhraseChild = document.querySelector('#phrase ul li');
                };
            };
        };
    };

    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        const blockTextArray = [...document.querySelectorAll('#phrase ul li')];
        const filterText = [...blockTextArray].filter(text => {
            return text.className === 'hide space' ? false : true;
        });
       
       for (const li in filterText) {
           while (filterText[li].className !== 'show') {
               return false;
           };
       };
       return true;
    };

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        const heart = document.querySelectorAll('.tries img');
        
        if (this.missed < heart.length) {
            heart[this.missed].src = 'images/lostHeart.png';
        };
        
        this.missed += 1;
    };

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.querySelector('#overlay');
        const h1 = document.querySelector('#overlay h1');

        if (!gameWon) {
            overlay.className = 'lose';
            overlay.style.display = 'block';
            h1.innerHTML = 'Sorry, better luck next time!';
        } else {
            overlay.className = 'win';
            overlay.style.display = 'block';
            h1.innerHTML = 'Great job!';
        };
    };
};
/**
 * Global vars that we will use in global scope.
 */
let game;
const keyboard = document.querySelector('#qwerty');
const buttons = document.querySelectorAll('#qwerty .keyrow button');
const startGame = document.querySelector('#btn__reset')

/**
 * Event listener to start the game.
 */
startGame.addEventListener('click', (e) => {
    game = new Game();
    game.startGame();
});

/**
 * Event listener to allow the user select words with clicks.
 */
keyboard.addEventListener('click', (e) => {

    for (const button in buttons) {
        if (e.target === buttons[button]) {
            game.handleInteraction(e.target);
        };
    };
});

/**
 * Event listener to allow the user select words with keyboard.
 */
window.addEventListener('keydown', (e) => {

    [...buttons].forEach(button => {
        if (e.key === button.textContent && button.disabled === false) {
            if (!game.checkForWin() && game.missed <= 5) {
                game.handleInteraction(button);
            };
        };
    });
});



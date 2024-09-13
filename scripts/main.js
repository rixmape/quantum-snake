import Game from './game/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();

    // Prevent default behavior for arrow keys and space bar
    window.addEventListener('keydown', (e) => {
        if([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1) {
            e.preventDefault();
        }
    });

    game.menuSystem.showStartScreen();

    console.log('Quantum Snake Game initialized. Press the Start button to begin!');
});


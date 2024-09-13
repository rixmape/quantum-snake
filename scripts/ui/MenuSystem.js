import EventEmitter from '../utils/EventEmitter.js';

class MenuSystem extends EventEmitter {
    constructor() {
        super();
        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over-screen');
        this.startButton = document.getElementById('start-button');
        this.restartButton = document.getElementById('restart-button');
        this.finalScoreElement = document.getElementById('final-score');

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.emit('gameStart'));
        this.restartButton.addEventListener('click', () => this.emit('gameRestart'));
    }

    showStartScreen() {
        this.startScreen.classList.remove('hidden');
        this.gameOverScreen.classList.add('hidden');
    }

    hideStartScreen() {
        this.startScreen.classList.add('hidden');
    }

    showGameOverScreen(score) {
        this.gameOverScreen.classList.remove('hidden');
        this.finalScoreElement.textContent = score;
    }

    hideGameOverScreen() {
        this.gameOverScreen.classList.add('hidden');
    }

    updateStartScreenContent(content) {
        const contentElement = this.startScreen.querySelector('p');
        if (contentElement) {
            contentElement.innerHTML = content;
        }
    }

    updateGameOverScreenContent(content) {
        const contentElement = this.gameOverScreen.querySelector('p');
        if (contentElement) {
            contentElement.innerHTML = content;
        }
    }
}

export default MenuSystem;
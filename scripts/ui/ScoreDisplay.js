import EventEmitter from '../utils/EventEmitter.js';

class ScoreDisplay extends EventEmitter {
    constructor(containerId) {
        super();
        this.container = document.getElementById(containerId);
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.createElement('div');
        this.highScoreElement.id = 'high-score';
        this.container.appendChild(this.highScoreElement);

        this.score = 0;
        this.highScore = this.loadHighScore();
        this.updateDisplay();
    }

    incrementScore(points) {
        this.score += points;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
            this.emit('newHighScore', this.highScore);
        }
        this.updateDisplay();
        this.emit('scoreUpdated', this.score);
    }

    resetScore() {
        this.score = 0;
        this.updateDisplay();
        this.emit('scoreReset');
    }

    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.highScoreElement.textContent = `High Score: ${this.highScore}`;
    }

    getScore() {
        return this.score;
    }

    getHighScore() {
        return this.highScore;
    }

    loadHighScore() {
        const savedHighScore = localStorage.getItem('quantumSnakeHighScore');
        return savedHighScore ? parseInt(savedHighScore, 10) : 0;
    }

    saveHighScore() {
        localStorage.setItem('quantumSnakeHighScore', this.highScore.toString());
    }
}

export default ScoreDisplay;
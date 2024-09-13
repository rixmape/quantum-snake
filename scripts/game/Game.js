import Grid from './Grid.js';
import Snake from './Snake.js';
import Food from './Food.js';
import QuantumMechanics from './QuantumMechanics.js';
import GameBoard from '../ui/GameBoard.js';
import ScoreDisplay from '../ui/ScoreDisplay.js';
import MenuSystem from '../ui/MenuSystem.js';
import { GRID_SIZE, CELL_SIZE, INITIAL_SPEED, SPEED_INCREMENT, POINTS_PER_FOOD, SUPERPOSITION_BONUS, GAME_STATES, KEY_CODES, WIN_SCORE } from '../utils/Constants.js';

class Game {
    constructor() {
        this.grid = new Grid();
        this.snake = new Snake(this.grid);
        this.food = new Food(this.grid);
        this.quantumMechanics = new QuantumMechanics(this.snake, this.grid);
        this.gameBoard = new GameBoard('game-board');
        this.scoreDisplay = new ScoreDisplay('score-display');
        this.menuSystem = new MenuSystem();

        this.speed = INITIAL_SPEED;
        this.gameState = GAME_STATES.IDLE;
        this.lastRenderTime = 0;

        this.setupEventListeners();
        this.resizeGameContainer();
    }

    setupEventListeners() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.menuSystem.on('gameStart', this.startGame.bind(this));
        this.menuSystem.on('gameRestart', this.startGame.bind(this));
        this.snake.on('collision', this.endGame.bind(this));
        this.food.on('consumed', this.handleFoodConsumption.bind(this));
        this.food.on('noSpaceLeft', this.handleWin.bind(this));
        window.addEventListener('resize', this.resizeGameContainer.bind(this));
    }

    resizeGameContainer() {
        const gameContainer = document.getElementById('game-container');
        const size = GRID_SIZE * CELL_SIZE;
        gameContainer.style.width = `${size}px`;
        gameContainer.style.height = `${size}px`;
    }

    startGame() {
        this.grid.reset();
        this.snake.reset();
        this.food.generate();
        this.quantumMechanics = new QuantumMechanics(this.snake, this.grid);
        this.scoreDisplay.resetScore();
        this.speed = INITIAL_SPEED;
        this.gameState = GAME_STATES.PLAYING;
        this.menuSystem.hideStartScreen();
        this.menuSystem.hideGameOverScreen();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(currentTime) {
        if (this.gameState !== GAME_STATES.PLAYING) return;

        requestAnimationFrame(this.gameLoop.bind(this));

        const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / this.speed) return;

        this.lastRenderTime = currentTime;

        this.update();
        this.render();
    }

    update() {
        this.quantumMechanics.update();
        this.snake.move();
        this.checkFoodCollision();
        this.checkWinCondition();
    }

    render() {
        this.gameBoard.render(this.grid, this.snake, this.food, this.quantumMechanics);
    }

    checkFoodCollision() {
        if (this.food.checkCollision(this.snake.getHead())) {
            this.food.consume();
            this.snake.grow();
            this.food.generate();
            this.increaseSpeed();
            this.updateScore();
        }
    }

    handleFoodConsumption() {
        const bonusPoints = this.quantumMechanics.isInSuperposition() ? SUPERPOSITION_BONUS : 0;
        this.scoreDisplay.incrementScore(POINTS_PER_FOOD + bonusPoints);
    }

    increaseSpeed() {
        this.speed += SPEED_INCREMENT;
    }

    updateScore() {
        // TODO: Implement additional score logic
    }

    checkWinCondition() {
        if (this.scoreDisplay.getScore() >= WIN_SCORE) {
            this.handleWin();
        }
    }

    handleWin() {
        this.gameState = GAME_STATES.GAME_OVER;
        this.menuSystem.updateGameOverScreenContent(`You win! Final score: ${this.scoreDisplay.getScore()}`);
        this.menuSystem.showGameOverScreen(this.scoreDisplay.getScore());
    }

    endGame() {
        this.gameState = GAME_STATES.GAME_OVER;
        this.menuSystem.showGameOverScreen(this.scoreDisplay.getScore());
    }

    handleKeyPress(event) {
        if (this.gameState !== GAME_STATES.PLAYING) return;

        switch (event.key) {
            case KEY_CODES.UP:
                this.snake.changeDirection({ x: 0, y: -1 });
                break;
            case KEY_CODES.DOWN:
                this.snake.changeDirection({ x: 0, y: 1 });
                break;
            case KEY_CODES.LEFT:
                this.snake.changeDirection({ x: -1, y: 0 });
                break;
            case KEY_CODES.RIGHT:
                this.snake.changeDirection({ x: 1, y: 0 });
                break;
            case KEY_CODES.SPACE:
                this.quantumMechanics.collapseSuperposition();
                break;
        }
    }
}

export default Game;
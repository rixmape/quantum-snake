import { GRID_SIZE, CELL_SIZE, COLORS } from '../utils/Constants.js';

class GameBoard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
    }

    setupCanvas() {
        const size = GRID_SIZE * CELL_SIZE;
        this.canvas.width = size;
        this.canvas.height = size;
        this.container.style.width = `${size}px`;
        this.container.style.height = `${size}px`;
        this.container.appendChild(this.canvas);
    }

    render(grid, snake, food, quantumMechanics) {
        this.clear();
        this.drawGrid();
        this.drawFood(food);
        this.drawSnake(snake);
        if (quantumMechanics.isInSuperposition()) {
            this.drawQuantumHead(quantumMechanics.getSuperpositionStates());
        }
    }

    clear() {
        this.ctx.fillStyle = COLORS.GRID_BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i <= GRID_SIZE; i++) {
            const position = i * CELL_SIZE;

            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(position, 0);
            this.ctx.lineTo(position, this.canvas.height);
            this.ctx.stroke();

            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(0, position);
            this.ctx.lineTo(this.canvas.width, position);
            this.ctx.stroke();
        }
    }

    drawSnake(snake) {
        snake.body.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? COLORS.SNAKE_HEAD : COLORS.SNAKE_BODY;
            this.drawCell(segment.x, segment.y);
        });
    }

    drawFood(food) {
        const position = food.getPosition();
        if (position) {
            this.ctx.fillStyle = COLORS.FOOD;
            this.drawCell(position.x, position.y);
        }
    }

    drawQuantumHead(superpositionStates) {
        this.ctx.fillStyle = COLORS.QUANTUM_HEAD;
        superpositionStates.forEach(state => {
            this.drawCell(state.x, state.y);
        });
    }

    drawCell(x, y) {
        this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

export default GameBoard;
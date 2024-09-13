import { DIRECTIONS, SUPERPOSITION_PROBABILITY, MAX_SUPERPOSITION_DURATION } from '../utils/Constants.js';
import EventEmitter from '../utils/EventEmitter.js';

class QuantumMechanics extends EventEmitter {
    constructor(snake, grid) {
        super();
        this.snake = snake;
        this.grid = grid;
        this.inSuperposition = false;
        this.superpositionStates = [];
        this.superpositionDuration = 0;
    }

    update() {
        if (this.inSuperposition) {
            this.superpositionDuration++;
            if (this.superpositionDuration >= MAX_SUPERPOSITION_DURATION) {
                this.collapseSuperposition();
            }
        } else if (Math.random() < SUPERPOSITION_PROBABILITY) {
            this.enterSuperposition();
        }
    }

    enterSuperposition() {
        this.inSuperposition = true;
        this.superpositionDuration = 0;
        const head = this.snake.getHead();
        const currentDirection = this.snake.direction;

        // Create two superposition states
        this.superpositionStates = [
            { x: head.x + currentDirection.x, y: head.y + currentDirection.y },
            this.getAdjacentPosition(head, currentDirection)
        ];

        this.updateGrid();
        this.emit('enteredSuperposition');
    }

    getAdjacentPosition(position, currentDirection) {
        const possibleDirections = Object.values(DIRECTIONS).filter(dir =>
            dir !== currentDirection &&
            (dir.x + currentDirection.x !== 0 || dir.y + currentDirection.y !== 0)
        );
        const randomDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        return {
            x: position.x + randomDirection.x,
            y: position.y + randomDirection.y
        };
    }

    collapseSuperposition() {
        if (!this.inSuperposition) return;

        const validStates = this.superpositionStates.filter(state =>
            this.grid.isValidPosition(state.x, state.y) && !this.snake.checkCollision(state)
        );

        if (validStates.length > 0) {
            const chosenState = validStates[Math.floor(Math.random() * validStates.length)];
            this.snake.body[0] = chosenState;
            this.snake.direction = {
                x: chosenState.x - this.superpositionStates[0].x,
                y: chosenState.y - this.superpositionStates[0].y
            };
        }

        this.inSuperposition = false;
        this.superpositionStates = [];
        this.superpositionDuration = 0;
        this.snake.updateGrid();
        this.emit('collapsedSuperposition');
    }

    updateGrid() {
        if (this.inSuperposition) {
            this.superpositionStates.forEach(state => {
                if (this.grid.isValidPosition(state.x, state.y)) {
                    this.grid.setCell(state.x, state.y, 'quantumHead');
                }
            });
        }
    }

    isInSuperposition() {
        return this.inSuperposition;
    }

    getSuperpositionStates() {
        return this.superpositionStates;
    }
}

export default QuantumMechanics;
import { DIRECTIONS, INITIAL_SNAKE_LENGTH } from '../utils/Constants.js';
import EventEmitter from '../utils/EventEmitter.js';

class Snake extends EventEmitter {
    constructor(grid) {
        super();
        this.grid = grid;
        this.reset();
    }

    reset() {
        const centerX = Math.floor(this.grid.size / 2);
        const centerY = Math.floor(this.grid.size / 2);
        this.body = [];
        for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
            this.body.push({ x: centerX - i, y: centerY });
        }
        this.direction = DIRECTIONS.RIGHT;
        this.grew = false;
        this.updateGrid();
    }

    move() {
        const head = this.body[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        if (this.checkCollision(newHead)) {
            this.emit('collision');
            return;
        }

        this.body.unshift(newHead);
        if (!this.grew) {
            const tail = this.body.pop();
            this.grid.clearCell(tail.x, tail.y);
        } else {
            this.grew = false;
        }

        this.updateGrid();
        this.emit('moved');
    }

    grow() {
        this.grew = true;
        this.emit('grew');
    }

    checkCollision(position) {
        // Check wall collision
        if (!this.grid.isValidPosition(position.x, position.y)) {
            console.log('Wall collision');
            return true;
        }

        // Check self collision (excluding the tail if not growing)
        for (let i = 0; i < this.body.length - (this.grew ? 0 : 1); i++) {
            if (this.body[i].x === position.x && this.body[i].y === position.y) {
                console.log('Self collision');
                return true;
            }
        }

        return false;
    }

    changeDirection(newDirection) {
        // Prevent 180-degree turns
        if (this.direction.x + newDirection.x !== 0 || this.direction.y + newDirection.y !== 0) {
            this.direction = newDirection;
        }
    }

    updateGrid() {
        this.body.forEach((segment, index) => {
            this.grid.setCell(segment.x, segment.y, index === 0 ? 'head' : 'body');
        });
    }

    getHead() {
        return this.body[0];
    }

    getLength() {
        return this.body.length;
    }
}

export default Snake;
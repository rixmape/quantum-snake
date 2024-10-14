import { GRID_SIZE } from '../utils/Constants.js';

class Grid {
    constructor() {
        this.size = GRID_SIZE;
        this.cells = new Array(this.size).fill(null).map(() => new Array(this.size).fill(null));
    }

    getCell(x, y) {
        if (this.isValidPosition(x, y)) {
            return this.cells[y][x];
        }
        return null;
    }

    setCell(x, y, value) {
        if (this.isValidPosition(x, y)) {
            this.cells[y][x] = value;
        }
    }

    clearCell(x, y) {
        this.setCell(x, y, null);
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    getRandomEmptyCell() {
        const emptyCells = [];
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this.getCell(x, y) === null) {
                    emptyCells.push({ x, y });
                }
            }
        }
        if (emptyCells.length === 0) return null;
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    isOccupied(x, y) {
        return this.getCell(x, y) !== null;
    }

    reset() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                this.clearCell(x, y);
            }
        }
    }
}

export default Grid;
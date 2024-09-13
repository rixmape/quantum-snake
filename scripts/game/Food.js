import EventEmitter from '../utils/EventEmitter.js';

class Food extends EventEmitter {
    constructor(grid) {
        super();
        this.grid = grid;
        this.position = null;
    }

    generate() {
        const emptyCell = this.grid.getRandomEmptyCell();
        if (emptyCell) {
            this.position = emptyCell;
            this.grid.setCell(this.position.x, this.position.y, 'food');
            this.emit('generated', this.position);
        } else {
            this.emit('noSpaceLeft');
        }
    }

    consume() {
        if (this.position) {
            this.grid.clearCell(this.position.x, this.position.y);
            this.position = null;
            this.emit('consumed');
        }
    }

    checkCollision(position) {
        return this.position &&
               position.x === this.position.x &&
               position.y === this.position.y;
    }

    getPosition() {
        return this.position;
    }

    reset() {
        if (this.position) {
            this.grid.clearCell(this.position.x, this.position.y);
            this.position = null;
        }
    }
}

export default Food;
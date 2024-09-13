// Game Board
export const GRID_SIZE = 20;
export const CELL_SIZE = 20; // in pixels

// Game Speed
export const INITIAL_SPEED = 10; // milliseconds per move
export const SPEED_INCREMENT = 5; // milliseconds to decrease per food eaten

// Snake
export const INITIAL_SNAKE_LENGTH = 3;
export const MAX_SNAKE_LENGTH = GRID_SIZE * GRID_SIZE - 1;

// Quantum Mechanics
export const SUPERPOSITION_PROBABILITY = 0.01; // Probability of entering superposition on each move
export const MAX_SUPERPOSITION_DURATION = 5; // Maximum number of moves in superposition

// Scoring
export const POINTS_PER_FOOD = 10;
export const SUPERPOSITION_BONUS = 5;

// Colors
export const COLORS = {
    SNAKE_BODY: '#4CAF50',
    SNAKE_HEAD: '#45a049',
    QUANTUM_HEAD: 'rgba(69, 160, 73, 0.5)',
    FOOD: '#FF5722',
    GRID_BACKGROUND: '#ffffff'
};

// Directions
export const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Key Codes
export const KEY_CODES = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    SPACE: ' '
};

// Game States
export const GAME_STATES = {
    IDLE: 'idle',
    PLAYING: 'playing',
    GAME_OVER: 'gameOver'
};

// Win Condition
export const WIN_SCORE = 500;
const readline = require("readline");

// Define game board size and number of mines
const BOARD_SIZE = 10;
const NUM_MINES = 10;

// Create game board with hidden values
const board = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
        isMine: false,
        neighborCount: 0,
        isRevealed: false,
    }))
);

// Add mines to the board
let minesAdded = 0;
while (minesAdded < NUM_MINES) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);
    if (!board[row][col].isMine) {
        board[row][col].isMine = true;
        minesAdded++;
    }
}

// Calculate neighbor counts for each cell
for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
        if (!board[row][col].isMine) {
            let neighborCount = 0;
            for (let i = row - 1; i <= row + 1; i++) {
                for (let j = col - 1; j <= col + 1; j++) {
                    if (
                        i >= 0 &&
                        i < BOARD_SIZE &&
                        j >= 0 &&
                        j < BOARD_SIZE &&
                        board[i][j].isMine
                    ) {
                        neighborCount++;
                    }
                }
            }
            board[row][col].neighborCount = neighborCount;
        }
    }
}

// Define function to reveal a cell
function reveal(row, col) {
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
        return;
    }
    const cell = board[row][col];
    if (cell.isRevealed || cell.isMine) {
        return;
    }
    cell.isRevealed = true;
    if (cell.neighborCount === 0) {
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                reveal(i, j);
            }
        }
    }
}

// Define function to print game board to console
function printBoard() {
    console.log("  " + Array.from({ length: BOARD_SIZE }, (_, i) => i).join(""));
    for (let row = 0; row < BOARD_SIZE; row++) {
        const rowString = board[row]
            .map((cell) => {
                if (!cell.isRevealed) {
                    return ".";
                } else if (cell.isMine) {
                    return "*";
                } else {
                    return cell.neighborCount;
                }
            })
            .join("");
        console.log(row + " " + rowString);
    }
}

// Define function to check if game is won
function checkWin() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const cell = board[row][col];
            if (!cell.isRevealed && !cell.isMine) {
                return false;
            }
        }
    }
    return true;
}

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define function to handle user input
function handleInput(input) {
    const [row, col] = input.trim().split(" ").map((num) => parseInt(num));
    if (isNaN(row) || isNaN(col) || row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) {
        console.log("Invalid input. Please enter two integers separated by a space.");
        rl.prompt();
    } else {
        reveal(row, col);
        printBoard();
        if (board[row][col].isMine) {
            console.log("Game over!");
            rl.close();
        } else if (checkWin()) {
            console.log("You win!");
            rl.close();
        } else {
            rl.prompt();
        }
    }
}

// Print initial game board and prompt user for input
printBoard();
rl.setPrompt("Enter row and column (e.g. '2 4'): ");
rl.prompt();
rl.on("line", handleInput);


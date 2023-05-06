# Minesweeper in JavaScript

This is a command-line implementation of the classic Minesweeper game in JavaScript, playable in a terminal or console environment. The game randomly generates a minefield of a specified size and allows the user to reveal cells one at a time, with the goal of avoiding mines and revealing all non-mine cells.

## Getting started

To run the game, you will need Node.js installed on your system. If you don't have Node.js installed, you can download it from the official website: https://nodejs.org/

To play the game, first clone or download the repository to your local machine. Then, navigate to the root directory of the project in a terminal or command prompt and run the following command:

```
node index.js
```

This will start the game and display the initial game board in the console. You can then enter row and column indices to reveal cells on the board.

## How to play

The game board is represented as a grid of cells, with each cell containing either a mine or a number indicating the number of adjacent cells that contain mines. When you reveal a cell, one of the following things will happen:

- If the cell contains a mine, the game is over and you lose.
- If the cell contains a number, that number is displayed on the cell, and you can continue playing.
- If the cell is blank (i.e., contains no mines or adjacent mines), all adjacent cells are automatically revealed.

To win the game, you must reveal all cells on the board that do not contain mines. You can mark cells that you think contain mines using a flag, but this is not required to win the game.

## Customizing the game

You can customize the game by modifying the constants at the top of the `index.js` file:

- `BOARD_SIZE`: the size of the game board (number of rows and columns)
- `NUM_MINES`: the number of mines to randomly place on the board
- `SHOW_MINES_ON_GAME_OVER`: whether to reveal all mines on the board when the game is over

You can also modify the `generateBoard` function to create a custom game board. The function takes two arguments: `size` (the size of the board) and `numMines` (the number of mines to place on the board), and returns a two-dimensional array representing the board.

## License

This game is licensed under the MIT License. See the `LICENSE` file for details.
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/** the board comp represent the 3x3 grid of square.
 * props:
 * xIsNext: a boolean indicating the next player
 * squares: an array represent the current state of the board
 * onPlay: a fn to handle move
 */
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    /** return if there is already a winner or the square is filled */
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    /** otherwise it create a copy of the squares array, update it with x or o depending on xIsNext */
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // call onPlay with the updated squares
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
/** manages the state of the game and handles the game's history */
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // an array of board state, initial on empty board
  const [currentMove, setCurrentMove] = useState(0); // a num represent the index of the current move
  //xIsNext: a boolean showing whether the next player is X, determined by whether the current move is even
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; // the state of the board at the current move

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // it slice the history up the current move, adds the new board state,
    setHistory(nextHistory); // update the history,
    setCurrentMove(nextHistory.length - 1); // set the current move to the end of the new history
  }

  /** this fn sets the current move to the specified move,
   * allowing users to jump to any previous move in the game
   */
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  /** it map over history to create a list of buttons,
   * each representing a move in the game's history.
   * clicking a button call jumpTo with the corresponding move index
   */
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
/** determine the winner of the game,
 *lines: an array of all possible winning combination,
 loop: it iterate over the lines array and checks if the values at the three positions (a, b, c) in any line are equal and non-null,
 if a winning combination is found, it returns the value X or O of the winning player, 
 if no winner is found it return null 
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // for each combination the, the indices a, b and c are extracted, these represent the position on the board that need to be checked

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

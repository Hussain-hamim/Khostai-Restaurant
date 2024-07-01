import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="btn  btn-info m-1" onClick={onSquareClick}>
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

  const { winner, line } = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function renderSquare(i) {
    const highlight = line.includes(i) ? "btn btn-danger highlight" : "";
    return (
      <Square
        key={i}
        className={highlight}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
      />
    );
  }

  const boardRows = [];

  for (let row = 0; row < 3; row++) {
    const boardColumns = [];
    for (let col = 0; col < 3; col++) {
      boardColumns.push(renderSquare(row * 3 + col));
    }
    boardRows.push(
      <div key={row} className="board-row">
        {boardColumns}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      <hr />
      {boardRows}
      {/* 
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
      </div> */}
    </>
  );
}
/** manages the state of the game and handles the game's history */
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // an array of board state, initial on empty board
  const [currentMove, setCurrentMove] = useState(0); // a num represent the index of the current move
  const [isAscending, setIsAscending] = useState(true);
  //xIsNext: a boolean showing whether the next player is X, determined by whether the current move is even
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; // the state of the board at the current move

  function handlePlay(nextSquares, location) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location },
    ]; // it slice the history up the current move, adds the new board state,
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
  const moves = history.map((step, move) => {
    const description = move
      ? `Go to move #${move} (${Math.floor(step.location / 3) + 1}, ${
          (step.location % 3) + 1
        })`
      : "Go to Game start";

    // if (move > 0) {
    //   description = "Go to move #" + move;
    //   last = "You are at move #" + move;
    // } else if (move < last) {
    //   description = "You are at move #" + move;
    // } else {
    //   description = "Go to game start";
    // }

    // if (move === currentMove) {
    //   return (
    //     <li key={move}>
    //       You are at move #{move} ({Math.floor(step.location / 3) + 1},{" "}
    //       {(step.location % 3) + 1})
    //     </li>
    //   );
    // }

    return (
      <li key={move}>
        <button className="btn btn-info m-1" onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={(nextSquares) =>
            handlePlay(
              nextSquares,
              nextSquares.findIndex(
                (value, index) => value !== history[currentMove].squares[index]
              )
            )
          }
        />
      </div>
      <div className="game-info">
        <button
          className="btn btn-primary m-1"
          onClick={() => setIsAscending(!isAscending)}
        >
          {isAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}

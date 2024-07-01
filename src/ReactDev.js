import React, { useState } from "react";
import "./ticTac.css"; // Ensure you have the necessary CSS

function Square({ value, onSquareClick, className }) {
  return (
    <button
      style={{
        borderRadius: "3px",
      }}
      className={`square ${className} one`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
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
    const highlight = line.includes(i) ? "highlight" : "";
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        className={highlight}
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
      {boardRows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, location) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    const description = move
      ? `Go to move #${move} (${Math.floor(step.location / 3) + 1}, ${
          (step.location % 3) + 1
        })`
      : "Go to game start";
    if (move === currentMove) {
      return (
        <li key={move}>
          <span>
            You are at move #{move} ({Math.floor(step.location / 3) + 1},{" "}
            {(step.location % 3) + 1})
          </span>
        </li>
      );
    }
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
      <div>
        <h2 style={{ textAlign: "center", paddingTop: "10px" }}>
          Tic Tac Toe Game
        </h2>
      </div>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={(nextSquares, location) => handlePlay(nextSquares, location)}
        />
      </div>
      <div className="game-info">
        <button
          className="btn btn-secondary m-2"
          onClick={() => setIsAscending(!isAscending)}
        >
          {isAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

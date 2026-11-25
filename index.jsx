const { useState } = React;

function calculateWinner(squares) {
  const lines = new Array(
    new Array(0, 1, 2),
    new Array(3, 4, 5),
    new Array(6, 7, 8),
    new Array(0, 3, 6),
    new Array(1, 4, 7),
    new Array(2, 5, 8),
    new Array(0, 4, 8),
    new Array(2, 4, 6)
  );

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const a = line[0];
    const b = line[1];
    const c = line[2];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(index) {
    if (squares[index] || winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let statusMessage;
  if (winner) {
    statusMessage = `Winner: ${winner}`;
  } else if (isDraw) {
    statusMessage = "It's a draw!";
  } else {
    statusMessage = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Tic-Tac-Toe</h1>

      <div className={`status-message ${winner ? "winner-highlight" : ""}`}>
        {statusMessage}
      </div>

      <div className="board-grid">
        {squares.map((value, index) => (
          <button
            key={index}
            className={`square ${value === "X" ? "player-x" : value === "O" ? "player-o" : ""}`}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button id="reset" className="reset-btn" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

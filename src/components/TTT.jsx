import React, { useRef, useState, useEffect } from "react";

const TTT = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [boxes, setBoxes] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const boardRef = useRef(null);

  const toggle = (num) => {
    if (lock || boxes[num] !== "") return;
    
    const current = count % 2 === 0 ? "X" : "O";
    const newBoxes = [...boxes];
    newBoxes[num] = current;
    
    setBoxes(newBoxes);
    setCount(count + 1);
  };

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [boxes]);

  const reset = () => {
    setLock(false);
    setWinner(null);
    setIsDraw(false);
    setBoxes(Array(9).fill(""));
    setCount(0);
  };

  const checkDraw = () => {
    if (!winner && boxes.every(box => box !== "")) {
      setIsDraw(true);
      setLock(true);
    }
  };

  const checkWinner = () => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let [a, b, c] of wins) {
      if (boxes[a] && boxes[a] === boxes[b] && boxes[b] === boxes[c]) {
        setWinner(boxes[a]);
        setLock(true);
        highlightWinner([a, b, c]);
        return;
      }
    }
  };

  const highlightWinner = (winningCells) => {
    if (!boardRef.current) return;
    
    const cells = boardRef.current.querySelectorAll('.cell');
    winningCells.forEach(index => {
      cells[index].classList.add('winning-cell');
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Tic Tac Toe</h1>
        
        {(winner || isDraw) && (
          <div className="mb-6 p-4 rounded-xl text-center bg-gray-100">
            {winner ? (
              <p className="text-2xl font-semibold">
                Player <span className={winner === "X" ? "text-blue-600" : "text-rose-600"}>{winner}</span> wins!
              </p>
            ) : (
              <p className="text-2xl font-semibold text-gray-700">It's a draw!</p>
            )}
          </div>
        )}
        
        <div className="mb-6 flex justify-center">
          <button
            className="bg-indigo-500 text-white px-8 py-3 rounded-xl hover:bg-indigo-600 transition duration-200 font-medium shadow-md"
            onClick={reset}
          >
            New Game
          </button>
        </div>
        
        <div ref={boardRef} className="flex flex-col gap-3">
          {[0, 3, 6].map((rowStart) => (
            <div key={rowStart} className="flex gap-3 justify-center">
              {[0, 1, 2].map((offset) => {
                const index = rowStart + offset;
                return (
                  <div
                    key={index}
                    className={`cell h-20 w-20 bg-gray-100 rounded-xl flex items-center justify-center text-4xl font-bold cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${
                      boxes[index] === "X" ? "text-blue-600" : "text-rose-600"
                    } ${lock ? "pointer-events-none" : "hover:bg-gray-200"}`}
                    onClick={() => toggle(index)}
                  >
                    {boxes[index]}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-500">
          {!winner && !isDraw && (
            <p className="text-lg">
              Current player: <span className={count % 2 === 0 ? "text-blue-600 font-bold" : "text-rose-600 font-bold"}>
                {count % 2 === 0 ? "X" : "O"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TTT;
"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { useParams } from "next/navigation";

type Cell = {
  value: number;
  color: "red" | "blue" | null;
};

const BOARD_SIZE = 5;

export default function BoardGame() {
  const { id } = useParams();
  const roomId = decodeURIComponent(id as string);
  const socket = getSocket();

  const [board, setBoard] = useState<Cell[][]>(
    Array.from({ length: BOARD_SIZE }, () =>
      Array.from({ length: BOARD_SIZE }, () => ({ value: 0, color: null }))
    )
  );
  const [currentTurn, setCurrentTurn] = useState<"red" | "blue">("red");
  const [playerColor, setPlayerColor] = useState<"red" | "blue" | null>(null);
  const [winner, setWinner] = useState<"red" | "blue" | null>(null);
  const [explodingCells, setExplodingCells] = useState<string[]>([]);

  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    socket.on("gameState", (state) => {
      setBoard(state.board);
      setCurrentTurn(state.currentTurn);
      setWinner(state.winner);
    });

    socket.on("assignedColor", (color: "red" | "blue") => {
      setPlayerColor(color);
    });

    socket.on("cellExploding", (id: string) => {
      setExplodingCells((prev) => [...prev, id]);
      setTimeout(() => {
        setExplodingCells((prev) => prev.filter((c) => c !== id));
      }, 300);
    });

    return () => {
      socket.off("gameState");
      socket.off("assignedColor");
      socket.off("cellExploding");
    };
  }, [socket, roomId]);

  const handleClick = (x: number, y: number) => {
    if (!playerColor || playerColor !== currentTurn || winner) return;
    socket.emit("makeMove", { roomId, x, y });
  };

  const resetGame = () => {
    socket.emit("resetGame", roomId);
  };

  const renderCircles = (value: number) => {
    value = Math.min(value, 4);

    if (value === 3) {
      return (
        <div className="grid grid-rows-2 grid-cols-2 gap-[2px] justify-center items-center">
          <div className="col-span-2 flex justify-center gap-[2px]">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
        </div>
      );
    }

    const gridClass =
      value === 1
        ? "grid-cols-1 grid-rows-1"
        : value === 2
        ? "grid-cols-2 grid-rows-1"
        : "grid-cols-2 grid-rows-2";

    return (
      <div className={`grid ${gridClass} gap-[2px]`}>
        {[...Array(value)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-white" />
        ))}
      </div>
    );
  };

  const boardBg = currentTurn === "red" ? "#fde8e8" : "#e5efff";

  return (
    <section className="mb-10 relative px-2">
      <h3 className="text-sm md:text-xl font-bold text-center mb-4 text-teal-200 tracking-wide">
        Turno de:{" "}
        <span
          className={`${
            currentTurn === "red" ? "text-red-400" : "text-blue-400"
          } drop-shadow-sm`}
        >
          {currentTurn.toUpperCase()}
        </span>
      </h3>

      <div className="flex justify-center overflow-x-auto">
        <div
          style={{ backgroundColor: boardBg }}
          className="p-2 md:p-4 rounded-xl shadow-md inline-block transition-colors duration-300 max-w-xs sm:max-w-md md:max-w-full"
        >
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {board.map((row, y) =>
              row.map((cell, x) => {
                const id = `${x}-${y}`;
                const isExploding = explodingCells.includes(id);

                const bgColor =
                  cell.color === "red"
                    ? "#f87171"
                    : cell.color === "blue"
                    ? "#60a5fa"
                    : "#f3f4f6";

                return (
                  <div
                    key={id}
                    onClick={() => handleClick(x, y)}
                    style={{ backgroundColor: bgColor }}
                    className={`aspect-square w-10 md:w-14 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 border border-gray-300 shadow-sm ${
                      isExploding
                        ? "scale-110 opacity-20"
                        : "scale-100 opacity-100"
                    }`}
                  >
                    {cell.value > 0 && renderCircles(cell.value)}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-6 w-72 max-w-full text-center shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              🎉 ¡{winner === "red" ? "Rojo" : "Azul"} gana!
            </h3>
            <button
              onClick={resetGame}
              className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
            >
              Reiniciar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function RoomPage() {
  const params = useParams();
  const roomId = params.id as string;
  const [players, setPlayers] = useState<string[]>(["Player1", "Player2"]);

  const handleAddPlayer = () => {
    const nextNumber = players.length + 1;
    const newPlayer = `Player${nextNumber}`;
    setPlayers([...players, newPlayer]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white p-8">
      <div className="max-w-4xl mx-auto bg-teal-900/80 border border-teal-500 rounded-2xl p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-300">
          Room #{roomId}
        </h1>

        {/* General info */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg text-teal-200 font-semibold">
            Players in room: {players.length}
          </p>
          <div className="space-x-4">
            <button
              onClick={handleAddPlayer}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md font-semibold shadow-md transition"
            >
              Add Player
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-md font-semibold shadow-md transition">
              Start Game
            </button>
          </div>
        </div>

        {/* Player list */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {players.map((player, index) => (
            <div
              key={index}
              className="bg-teal-800/70 p-5 rounded-xl border border-teal-400 text-center font-medium text-teal-100 shadow-inner transition hover:bg-teal-700/90 cursor-default select-none"
            >
              {player}
            </div>
          ))}
        </div>

        {/* Chat section */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-teal-300">💬 Chat</h2>
          <div className="bg-teal-900/60 border border-teal-600 p-5 h-48 overflow-y-auto rounded-lg mb-4 text-teal-200 text-sm font-mono">
            {/* Chat messages go here */}
            <p>[Player1]: Hello!</p>
            <p>[Player2]: Ready?</p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 rounded-lg bg-teal-800 border border-teal-600 text-teal-100 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

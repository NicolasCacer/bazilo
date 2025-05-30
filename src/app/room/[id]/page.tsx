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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto bg-black/40 border border-blue-500 rounded-2xl p-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Room #{roomId}</h1>

        {/* General info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg">Players in room: {players.length}</p>
          <div className="space-x-2">
            <button
              onClick={handleAddPlayer}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition"
            >
              Add Player
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">
              Start Game
            </button>
          </div>
        </div>

        {/* Player list */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {players.map((player, index) => (
            <div
              key={index}
              className="bg-blue-800/40 p-4 rounded-lg border border-blue-500 text-center"
            >
              {player}
            </div>
          ))}
        </div>

        {/* Chat section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">💬 Chat</h2>
          <div className="bg-black/30 border border-gray-600 p-4 h-48 overflow-y-auto rounded-md mb-2">
            {/* Chat messages go here */}
            <p className="text-sm text-gray-300">[Player1]: Hello!</p>
            <p className="text-sm text-gray-300">[Player2]: Ready?</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 rounded-md bg-gray-800 border border-gray-600 text-white"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

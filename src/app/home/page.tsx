"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Room = {
  id: string;
  name: string;
};

export default function Home() {
  const router = useRouter();

  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Room 1" },
    { id: "2", name: "Room 2" },
  ]);

  const [newRoomName, setNewRoomName] = useState("");

  const createRoom = () => {
    if (!newRoomName.trim()) return;

    const nextId =
      rooms.length > 0
        ? Math.max(...rooms.map((room) => Number(room.id))) + 1
        : 1;

    const newRoom: Room = {
      id: nextId.toString(),
      name: newRoomName.trim(),
    };

    setRooms([...rooms, newRoom]);
    setNewRoomName("");
  };

  const joinRoom = (id: string) => {
    router.push(`/room/${id}`);
  };

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold text-teal-800 mb-8">
        Available Rooms
      </h1>

      <section className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-teal-200 mb-10">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          Create a Room
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Room name"
            className="flex-grow border border-teal-300 rounded-md px-4 py-2 text-teal-900 placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button
            onClick={createRoom}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md px-5 transition-shadow shadow-md hover:shadow-lg"
            aria-label="Create new room"
          >
            Create
          </button>
        </div>
      </section>

      <section className="w-full max-w-md space-y-4">
        {rooms.length === 0 ? (
          <p className="text-center text-teal-400 italic">No rooms available</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className="flex justify-between items-center bg-white border border-teal-200 rounded-md p-4 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => joinRoom(room.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") joinRoom(room.id);
              }}
            >
              <span className="text-teal-800 font-medium text-lg">
                {room.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  joinRoom(room.id);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-md px-4 py-2 font-semibold transition"
                aria-label={`Join ${room.name}`}
              >
                Join
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

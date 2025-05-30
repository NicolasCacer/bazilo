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
    setNewRoomName(""); // Limpiar input después de crear
  };

  const joinRoom = (id: string) => {
    router.push(`/room/${id}`);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Available rooms</h1>
      <div className="w-full max-w-md pb-6 border-b mb-4">
        <h2 className="text-xl font-semibold mb-2">Create room</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Room name"
            className="flex-grow border px-3 py-2 rounded"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button
            onClick={createRoom}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Create
          </button>
        </div>
      </div>
      <div className="w-full max-w-md space-y-3">
        {rooms.length === 0 ? (
          <p className="text-center text-gray-500">No rooms available</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded shadow"
            >
              <span>{room.name}</span>
              <button
                onClick={() => joinRoom(room.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                Join
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

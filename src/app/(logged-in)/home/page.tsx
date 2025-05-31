"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type Room = {
  id: string;
  name: string;
};

export default function Home() {
  const router = useRouter();

  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Room 1" },
    { id: "2", name: "Room 2" },
    { id: "3", name: "Room 3" },
    { id: "4", name: "Room 4" },
    { id: "5", name: "Room 5" },
    { id: "6", name: "Room 6" },
    { id: "7", name: "Room 7" },
    { id: "8", name: "Room 8" },
    { id: "9", name: "Room 9" },
    { id: "10", name: "Room 10" },
    { id: "11", name: "Room 11" },
    { id: "12", name: "Room 12" },
    { id: "13", name: "Room 13" },
    { id: "14", name: "Room 14" },
    { id: "15", name: "Room 15" },
    { id: "16", name: "Room 16" },
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

  const logOut = async () => {
    const result = await Swal.fire({
      title: "¿Are you sure?",
      text: "You are trying to log out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#042f2e",
      cancelButtonColor: "#0d9488",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: "You are signed out",
        icon: "success",
        timer: 800,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 flex flex-col items-center p-4 pt-[90px]">
      <section className="w-full max-w-md bg-teal-600 p-6 rounded-lg shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-teal-950 mb-4">
          Create a Room
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Room name"
            className="flex-grow border-2 bg-white border-teal-900 rounded-md px-4 py-2 text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-900"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button
            onClick={createRoom}
            className="bg-teal-950 hover:bg-teal-800 text-white font-semibold rounded-md px-5"
            aria-label="Create new room"
          >
            Create
          </button>
        </div>
      </section>

      <h1 className="text-4xl font-extrabold text-white mb-8">
        Available Rooms
      </h1>

      <section className="w-full max-w-[800px] bg-teal-300 p-2 rounded-xl overflow-y-scroll max-h-[350px] shadow-lg">
        {rooms.length === 0 ? (
          <p className="text-center text-teal-400 italic">No rooms available</p>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className="flex justify-between items-center bg-teal-950 p-2 rounded-md m-1"
              onClick={() => joinRoom(room.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") joinRoom(room.id);
              }}
            >
              <span className="text-white font-medium text-lg">
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
      <button
        className="bg-teal-300 hover:bg-teal-500 text-teal-950 px-3 py-2 text-xl uppercase rounded-lg mt-10 font-semibold"
        onClick={() => logOut()}
      >
        Log out
      </button>
    </div>
  );
}

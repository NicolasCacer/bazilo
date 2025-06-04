"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axios";
import Swal from "sweetalert2";

type Room = {
  id: string;
  name: string;
};

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomInput, setRoomInput] = useState("");
  const router = useRouter();

  useEffect(() => {
    const socket = getSocket();

    // Fallback: load rooms from API on first render
    axiosClient.get("/rooms").then((res) => {
      const data = res.data;
      if (Array.isArray(data)) {
        setRooms(data);
      } else if (Array.isArray(data.rooms)) {
        setRooms(data.rooms);
      } else {
        console.warn("Unexpected rooms format:", data);
        setRooms([]);
      }
    });

    // Socket listeners
    socket.on("initialRooms", (rooms: Room[]) => {
      setRooms(rooms);
    });

    socket.on("newRoom", (room: Room) => {
      setRooms((prev) => {
        // Avoid duplicates by checking if room already exists
        if (prev.find((r) => r.id === room.id)) return prev;
        return [...prev, room];
      });
    });

    return () => {
      socket.off("initialRooms");
      socket.off("newRoom");
    };
  }, []);

  const handleCreateRoom = async () => {
    const trimmed = roomInput.trim();
    if (!trimmed) return;

    try {
      const socket = getSocket();

      await axiosClient.post("/rooms", { name: trimmed });
      socket.emit("createRoom", { name: trimmed });
      setRoomInput("");
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const handleJoinRoom = (name: string) => {
    router.push(`/room/${name}`);
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
      try {
        await axiosClient.post("/logout");
      } catch (error) {
        console.error("Error during logout:", error);
      }

      await Swal.fire({
        title: "We’re logging you out",
        icon: "success",
        timer: 800,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      router.push("/");
    }
  };

  return (
    <div className="p-8 pt-[90px] text-white min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-teal-300">
          Available Rooms
        </h1>

        <ul className="space-y-2 mb-6">
          {rooms.map((room) => (
            <li
              key={room.id}
              onClick={() => handleJoinRoom(room.name)}
              className="cursor-pointer bg-teal-800 p-3 rounded-lg hover:bg-teal-700 transition"
            >
              {room.name}
            </li>
          ))}
        </ul>

        <div className="flex space-x-2">
          <input
            type="text"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="Enter room name"
            className="flex-1 p-3 rounded-lg bg-teal-800 border border-teal-600 placeholder-teal-400 text-teal-100"
          />
          <button
            onClick={handleCreateRoom}
            className="bg-teal-600 hover:bg-teal-700 p-3 rounded-lg text-white font-semibold"
          >
            Create
          </button>
        </div>

        <button
          className="bg-teal-300 hover:bg-teal-500 text-teal-950 px-3 py-2 text-xl uppercase rounded-lg mt-10 font-semibold"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

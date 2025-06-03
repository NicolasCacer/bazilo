"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthContext";

// Define a type for messages
interface ChatMessage {
  sender: string;
  message: string;
}

let socket: Socket;

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;
  const { user } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL!, {
      withCredentials: true,
    });

    socket.emit("joinRoom", roomId);
    socket.on("message", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleExit = () => {
    router.push("/home");
  };

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit("sendMessage", {
        sender: user?.displayName,
        roomId,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white p-8 pt-[90px]">
      <main className="max-w-4xl mx-auto bg-teal-900 border border-teal-500 rounded-2xl p-8 shadow-lg flex flex-col">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-300">
          Room #{roomId}
        </h1>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-teal-300">💬 Chat</h2>
          <div
            ref={chatRef}
            className="bg-teal-950 border border-teal-300 p-5 h-48 overflow-y-auto rounded-lg mb-4 text-teal-200 text-sm font-mono"
          >
            {messages.map((msg, idx) => (
              <p key={idx}>{`[${msg.sender}]: ${msg.message}`}</p>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 rounded-l-lg bg-teal-800 border border-teal-600 text-teal-100 placeholder-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
            <button
              onClick={sendMessage}
              className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-r-lg font-semibold transition shadow-md"
            >
              Send
            </button>
          </div>
        </section>

        <button
          onClick={handleExit}
          className="mt-6 self-end text-sm text-teal-400 hover:text-white underline"
        >
          Exit Room
        </button>
      </main>
    </div>
  );
}

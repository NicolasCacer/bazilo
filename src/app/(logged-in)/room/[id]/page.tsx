"use client";

import { useParams, useRouter } from "next/navigation";

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params.id as string;

  const handleExit = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white p-8 pt-[90px]">
      <main className="max-w-4xl mx-auto bg-teal-900 border border-teal-500 rounded-2xl p-8 shadow-lg flex flex-col">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-teal-300">
          Room #{roomId}
        </h1>
        <section className="flex justify-center items-center mb-8">
          <div className="space-x-4">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md font-semibold shadow-md transition">
              Start Game
            </button>
            <button
              onClick={handleExit}
              className="bg-teal-950 hover:bg-teal-700 text-white px-5 py-2 rounded-md font-semibold shadow-md transition"
            >
              Exit Room
            </button>
          </div>
        </section>

        <section className="flex justify-between items-center gap-3 bg-teal-950 p-3 rounded-md overflow-x-auto shadow-lg mb-10">
          <button className="bg-teal-800/70 p-2 min-w-[100px] rounded-xl border border-teal-400 ">
            Player 1
          </button>
          <button className="bg-teal-800/70 p-2 min-w-[100px] rounded-xl border border-teal-400 ">
            Player 2
          </button>
          <button className="bg-teal-800/70 p-2 min-w-[100px] rounded-xl border border-teal-400 ">
            Player 3
          </button>
          <button className="bg-teal-800/70 p-2 min-w-[100px] rounded-xl border border-teal-400 ">
            Player 4
          </button>
          <button className="bg-teal-800/70 p-2 min-w-[100px] rounded-xl border border-teal-400 ">
            Player 5
          </button>
          <button className="bg-teal-800/70 p-2 min-w-[100px] rounded-xl border border-teal-400 ">
            Player 6
          </button>
          <button className="bg-teal-800/70 p-2 min-w-[100px] rounded-xl border border-teal-400 ">
            Player 7
          </button>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-teal-300">💬 Chat</h2>
          <div className="bg-teal-950 border border-teal-300 p-5 h-48 overflow-y-auto rounded-lg mb-4 text-teal-200 text-sm font-mono">
            {/* Chat messages go here */}
            <p>[Player 1]: Hello!</p>
            <p>[Player 2]: Ready?</p>
            <p>[Player 3]: Almost. Still fixing my sensitivity settings.</p>
            <p>[Player 4]: Seriously? You change that before every match 😂</p>
            <p>
              [Player 5]: He’s just stalling. He’s scared I’ll outscore him
              again.
            </p>
            <p>[Player 6]: Oh boy, here we go with the trash talk...</p>
            <p>
              [Player 7]: Can we focus, please? Let’s win this one for real.
            </p>
            <p>[Player 1]: Alright, plan is the same as last round?</p>
            <p>
              [Player 2]: Yup. 1, 3, and 5 go left. 2, 4, and 6 take the right.
              7 watches mid and gives callouts.
            </p>
            <p>[Player 3]: Copy that. I’ll take the high ground.</p>
            <p>[Player 5]: I’ll push forward. Cover me when I go in.</p>
            <p>[Player 6]: I’ll stay behind and pick off anyone who flanks.</p>
            <p>[Player 4]: Can we not split up too much this time?</p>
            <p>[Player 2]: Agreed. Stick close, move in pairs.</p>
            <p>
              [Player 7]: Reminder: don’t forget to mark enemies. Some of y’all
              forget we have that feature 😅
            </p>
            <p>[Player 1]: *cough* Player 5 *cough*</p>
            <p>[Player 5]: Hey! I mark with bullets, not pings.</p>
            <p>[Player 3]: Which is exactly the problem 😒</p>
            <p>
              [Player 6]: Also — make sure your gear is set. Last time Player 4
              went in with no armor.
            </p>
            <p>[Player 4]: It was a tactical decision!</p>
            <p>[Player 2]: It was a terrible decision.</p>
            <p>[Player 7]: Game starts in 30 seconds. Final checks?</p>
            <p>[Player 1]: Good to go.</p>
            <p>[Player 3]: All set.</p>
            <p>[Player 5]: Weapons hot 🔥</p>
            <p>[Player 6]: Let’s do this.</p>
            <p>[Player 2]: For glory! 🛡️</p>
            <p>[Player 4]: For XP!</p>
            <p>[Player 7]: Match starting in 3... 2... 1... Good luck!</p>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 rounded-l-lg bg-teal-800 border border-teal-600 text-teal-100 placeholder-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-r-lg font-semibold transition shadow-md">
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

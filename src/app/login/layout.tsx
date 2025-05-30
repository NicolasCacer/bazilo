export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow flex-col justify-center items-center">
      <nav className="bg-[#026E81] uppercase flex justify-center items-center text-white h-15 w-full text-5xl dark:text-black">
        BAZILO
      </nav>
      {children}
    </main>
  );
}

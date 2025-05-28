export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <nav className="bg-[#026E81] uppercase flex justify-center items-center text-white h-15 text-5xl dark:text-black">
        BAZILO
      </nav>
      {children}
    </main>
  );
}

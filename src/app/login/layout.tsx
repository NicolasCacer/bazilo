export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-grow flex-col justify-center items-center">
      {children}
    </main>
  );
}

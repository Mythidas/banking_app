import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      <div className="flex-center size-full max-sm:px-6">
        {children}
      </div>
      <div className="">
        {/** MOCK IMAGE */}
        MOCK IMAGE
      </div>
    </main>
  );
}
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full justify-between font-inter overflow-hidden">
      <div className="flex-center w-full max-sm:px-6 overflow-y-auto">
        {children}
      </div>
      <div className="flex w-full bg-blue-50">
        <Image src="/icons/auth-image.svg" width={700} height={700} alt="mock image" className="rounded-l-xl object-contain ml-auto" />
      </div>
    </main>
  );
}
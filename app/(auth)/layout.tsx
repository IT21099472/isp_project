import Image from "next/image";

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="grid grid-cols-2">
          <div>
            <Image src='/images/auth-banner.jpg' alt="auth-banner" width={500} height={500} className="h-screen w-full object-cover"/>
          </div>
          <div className="flex items-center justify-center h-screen">{children}</div>
        </div>
    );
  }
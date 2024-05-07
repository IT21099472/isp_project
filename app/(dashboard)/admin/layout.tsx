import { auth } from "@clerk/nextjs";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";



const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const {userId}=auth()

  if (!isAdmin(userId)) {
    return redirect("/");
  }
  return (
    <div className="h-full">
    <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
      <Navbar />
    </div>
    <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
      <Sidebar />
    </div>
    <main className="md:pl-56 pt-[80px] h-full">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </main>
  </div>
  );
};

export default DashboardLayout;

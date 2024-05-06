import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "@/components/theme-provider";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
    <div className="h-[80px] fixed inset-y-0 w-full z-50">
      <Navbar />
    </div>
    <div className="hidden md:flex h-full flex-col fixed inset-y-0 z-50">
    </div>
    <main className="md:pl-5 pt-[80px] h-full">
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

import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Room from "./Room";

export const metadata = {
  title: "Geoma",
  description: "",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body className={`bg-slate-900 bg-[url(/paper-dark.svg)]`}>
      <Room>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </body>
  </html>
);

export default RootLayout;

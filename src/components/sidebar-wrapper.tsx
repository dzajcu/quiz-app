import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Menu } from "lucide-react";

export default function SidebarWrapper({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
            <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full h-16 px-4 bg-background border-b">
                <div className="flex justify-between items-center w-full h-full">
                    <img
                        src="./asd"
                        alt="Logo"
                    />
                    <SidebarTrigger className="-ml-1">
                        <Menu />
                    </SidebarTrigger>
                </div>
            </header>
        </SidebarProvider>
    );
}

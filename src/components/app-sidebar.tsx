import * as React from "react";
import {
    BookOpen,
    Bot,
    Settings2,
    SquareTerminal,
    SquareChevronLeft,
    SquareChevronRight,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Logo from "@/components/Logo";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Quiz",
            url: "/quiz",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "/quiz",
                },
                {
                    title: "Starred",
                    url: "/quiz",
                },
                {
                    title: "Settings",
                    url: "/quiz",
                },
            ],
        },
        {
            title: "Models",
            url: "/",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "/",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "/",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
};

interface ModeToggleWithTooltipProps {
    isCollapsed: boolean;
}

const ModeToggleWithTooltip: React.FC<ModeToggleWithTooltipProps> = ({
    isCollapsed,
}) => {
    if (!isCollapsed) {
        return <ModeToggle />;
    }

    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="inline-block">
                        <ModeToggle />
                    </span>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Toggle theme</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
interface SidebarTriggerWithTooltipProps {
    isCollapsed: boolean;
}

const SidebarTriggerWithTooltip: React.FC<SidebarTriggerWithTooltipProps> = ({
    isCollapsed,
}) => {
    if (!isCollapsed) {
        return (
            <SidebarTrigger className="bg-primary-button hover:bg-primary-button-hover text-white hover:text-white">
                <SquareChevronLeft />
            </SidebarTrigger>
        );
    }

    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="inline-block">
                        <SidebarTrigger className="bg-primary-button hover:bg-primary-button-hover text-white hover:text-white">
                            <SquareChevronRight />
                        </SidebarTrigger>
                    </span>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Expand menu</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { state } = useSidebar();

    return (
        <Sidebar
            collapsible="icon"
            {...props}
        >
            <SidebarHeader>
                {state !== "collapsed" ? (
                    <div className="ml-2">
                        <Logo hover={true} />
                    </div>
                ) : null}
                <div className="flex flex-col gap-4">
                    {state === "collapsed" ? (
                        <div>
                            <Logo
                                short={true}
                                hover={true}
                            />
                        </div>
                    ) : null}
                    <div
                        className={`flex gap-2 ${
                            state === "collapsed" ? "flex-col-reverse" : ""
                        }`}
                    >
                        <ModeToggleWithTooltip isCollapsed={state === "collapsed"} />
                        <SidebarTriggerWithTooltip
                            isCollapsed={state === "collapsed"}
                        />
                    </div>
                </div>
            </SidebarHeader>

            {/* Separator widoczny tylko, gdy sidebar jest collapsed */}
            {state === "collapsed" && <Separator className="my-2" />}

            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}

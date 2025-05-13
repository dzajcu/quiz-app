import { UserProfile } from "@/components/user-profile";
import SidebarWrapper from "@/components/sidebar-wrapper";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <SidebarWrapper>
                <UserProfile />
            </SidebarWrapper>
        </div>
    );
}

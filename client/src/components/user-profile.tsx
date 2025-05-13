import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";

export function UserProfile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">Your Profile</CardTitle>
                    <CardDescription>
                        View and manage your account information
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <Avatar className="w-32 h-32 border-2 border-primary">
                            <div className="text-4xl font-semibold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    Username
                                </h3>
                                <p className="text-lg font-medium">
                                    {user.username}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    Email
                                </h3>
                                <p className="text-lg font-medium">
                                    {user.email}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">
                                    Role
                                </h3>
                                <p className="text-lg font-medium capitalize">
                                    {user.role}
                                </p>
                            </div>
                            <div className="pt-4">
                                <Button
                                    variant="destructive"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

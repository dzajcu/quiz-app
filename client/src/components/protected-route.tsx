import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string; // Optional: for role-based authorization
}

export const ProtectedRoute = ({
    children,
    requiredRole,
}: ProtectedRouteProps) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // If authentication is still being determined, show loading state
    if (isLoading) {
        return (
            <div className="flex min-h-svh items-center justify-center">
                Loading...
            </div>
        );
    }

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // If a specific role is required, check if user has that role
    if (requiredRole && user?.role !== requiredRole) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    // User is authenticated and has required role, render children
    return <>{children}</>;
};

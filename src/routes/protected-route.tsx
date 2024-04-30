import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../provider/auth-provider";
import DashboardLayout from "../layouts/dashboard";
import { Suspense } from "react";

export const ProtectedRoute = () => {
    // const { token } = useAuth();

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" />;
    }

    return (
        <DashboardLayout>
            <Suspense>
                <Outlet />
            </Suspense>
        </DashboardLayout>
    );
};
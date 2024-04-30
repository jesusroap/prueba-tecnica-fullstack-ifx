import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import { Suspense } from "react";

export const ProtectedRoute = () => {
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
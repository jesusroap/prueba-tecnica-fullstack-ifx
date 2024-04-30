import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import UserPage from '../pages/user';
import DashboardLayout from '../layouts/dashboard';
import { Suspense } from 'react';
import IndexPage from '../pages/app';
import ProductsPage from '../pages/products';
import Page404 from '../pages/page-not-found';
import LoginPage from '../pages/login';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/admin' element={<DashboardLayout>
                                <Suspense>
                                    <Outlet />
                                </Suspense>
                            </DashboardLayout> }>
                <Route path='dashboard' element={<IndexPage />} index={true} />
                <Route path='users' element={<UserPage />} />
                <Route path='products' element={<ProductsPage />} />
            </Route>
            <Route path='login' element={<LoginPage />} />
            <Route path='404' element={<Page404 />} />
            <Route path='*' element={<Navigate to='/404' replace />} />
        </Routes>
    );
};
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import HomePage from '../pages/home';

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
};
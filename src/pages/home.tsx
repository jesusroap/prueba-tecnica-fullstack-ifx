import { Helmet } from 'react-helmet-async';
import ProductsPage from './products';
import AppBarHome from '../layouts/home/app-bar';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home | Store App </title>
      </Helmet>

      <AppBarHome />

      <ProductsPage />
    </>
  );
}
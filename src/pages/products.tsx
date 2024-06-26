import { Helmet } from 'react-helmet-async';

import ProductsView from '../sections/products/products-view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Store App </title>
      </Helmet>

      <ProductsView />
    </>
  );
}

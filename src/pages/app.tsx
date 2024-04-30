import { Helmet } from 'react-helmet-async';

import AppView from '../sections/app-view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Store App </title>
      </Helmet>

      <AppView />
    </>
  );
}

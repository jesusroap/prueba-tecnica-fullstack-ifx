import { Helmet } from 'react-helmet-async';

import { LoginView } from '../sections/login-view.tsx';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Store App </title>
      </Helmet>

      <LoginView />
    </>
  );
}
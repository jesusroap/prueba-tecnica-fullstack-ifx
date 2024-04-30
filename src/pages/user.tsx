import { Helmet } from 'react-helmet-async';

import UserView from '../sections/user/user-view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Store App </title>
      </Helmet>

      <UserView />
    </>
  );
}

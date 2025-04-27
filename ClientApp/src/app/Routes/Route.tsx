import { Routes, Route } from 'react-router-dom';
import NxWelcome from '../nx-welcome';
import Protected from '../components/PrivateRoute/PrivateRoute';
import UserList from '../pages/User/UserList';
import UserPage from '../pages/User/UserPage';
import React from 'react';

export const RouteComponent = () => {
  const User = 'User';

  return (
    <Routes>
      <Route path="/" element={<NxWelcome title={'Hey'} />} />

      <Route
        path={'/' + User + '/List'}
        element={
          <Protected>
            <UserList />
          </Protected>
        }
      />
      <Route path={'/' + User + '/New'} element={<UserPage />} />
      <Route path={'/' + User + '/Edit/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Delete/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Detail/:id'} element={<UserPage />} />
    </Routes>
  );
};

import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import AppContext from '../Context/Context';

type props = {
  children: ReactNode;
};
const Protected: React.FC<props> = ({ children }) => {
  const { data } = React.useContext(AppContext);
  if (!data?.isSignedIn) {
    //window.location.reload();
    return <Navigate to="/" replace />;
  }
  //else if(Roles)
  // {
  //   return <Navigate to="/NoPermission" replace />;
  // }
  return children;
};
export default Protected;

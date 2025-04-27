import React from 'react';
import { Route } from 'react-router-dom';
type Props = {
  Name: string;
  List: JSX.Element;
  Create: JSX.Element;
  Edit: JSX.Element;
  Delete: JSX.Element;
  Detail: JSX.Element;
};
const LazyRoute = ({ Name, List, Create, Edit, Delete, Detail }: Props) => {
  return (
    <>
      <Route path={'/' + Name + '/List'} element={List} />
      <Route path={'/' + Name + '/Create'} element={Create} />
      <Route path={'/' + Name + '/Edit/:id'} element={Edit} />
      <Route path={'/' + Name + '/Delete/:id'} element={Delete} />
      <Route path={'/' + Name + '/Detail/:id'} element={Detail} />
    </>
  );
};

export default LazyRoute;

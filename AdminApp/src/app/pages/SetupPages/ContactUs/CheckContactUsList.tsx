import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const CheckContactUsList: React.FC = () => (
  <BasicTable
    api={'ContactUs'}
    displayData={['name', 'email', 'subject', 'message', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default CheckContactUsList;

import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const ChequeNoList: React.FC = () => (
  <BasicTable
    api={'ChequeNo'}
    displayData={['code','name', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default ChequeNoList;

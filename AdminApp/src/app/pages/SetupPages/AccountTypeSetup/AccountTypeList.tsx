import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const AccountTypeList: React.FC = () => (
  <BasicTable
    api={'AccountType'}
    displayData={['name','code', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default AccountTypeList;

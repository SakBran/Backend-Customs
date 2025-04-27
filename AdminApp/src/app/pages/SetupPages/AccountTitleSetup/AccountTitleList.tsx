import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const AccountTitleList: React.FC = () => (
  <BasicTable
    api={'AccountTitle'}
    displayData={['description', 'applyType','chequeNo','accountType','amount', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default AccountTitleList;

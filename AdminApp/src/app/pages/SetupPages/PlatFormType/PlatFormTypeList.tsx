import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const PlatFormTypeList: React.FC = () => (
  <BasicTable
    api={'PlatFormType'}
    displayData={['name', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default PlatFormTypeList;

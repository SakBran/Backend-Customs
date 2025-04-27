import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const BusinessTypeList: React.FC = () => (
  <BasicTable
    api={'BusinessType'}
    displayData={['name', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default BusinessTypeList;

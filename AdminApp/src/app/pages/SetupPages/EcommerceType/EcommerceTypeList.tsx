import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const EcommerceTypeList: React.FC = () => (
  <BasicTable
    api={'EcommerceType'}
    displayData={['name', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default EcommerceTypeList;

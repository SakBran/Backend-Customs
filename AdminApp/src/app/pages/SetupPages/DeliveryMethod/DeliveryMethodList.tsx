import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const DeliveryMethodList: React.FC = () => (
  <BasicTable
    api={'DeliveryMethod'}
    displayData={['name', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default DeliveryMethodList;

import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const PaymentMethodList: React.FC = () => (
  <BasicTable
    api={'PaymentMethod'}
    displayData={['name', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default PaymentMethodList;

import React from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const SystemSettingList: React.FC = () => (

  <BasicTable
    api={'SystemSetting'}
    displayData={['mpuUrl','merchantId','secretKey','currencyCode','imAmount','mocAmount', 'id']}
    fetch={Get}
  ></BasicTable>

);

export default SystemSettingList;


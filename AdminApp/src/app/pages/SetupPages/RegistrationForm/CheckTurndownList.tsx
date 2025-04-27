import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';

const CheckTurndownList: React.FC = () => (
  <CheckApproveTable
    api={'BusinessRegistration/CheckGetTurndownApplication'}
    displayData={[
      'applicationNo',
      'createdDate',
      'businessName',
      'businessNameMyanmar',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'turnDownCount',
      'turnDownDate',
      'id',
    ]}
    fetch={Get}
  ></CheckApproveTable>
);

export default CheckTurndownList;

import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';

const RegistrationApproveList: React.FC = () => (
  <CheckApproveTable
    api={'BusinessRegistration/GetCheckedApplication'}
    displayData={[
      'businessName',
      'businessNameMyanmar',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'id',
    ]}
    fetch={Get}
  ></CheckApproveTable>
);

export default RegistrationApproveList;

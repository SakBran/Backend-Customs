import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';

const RegistrationList: React.FC = () => (
  <CheckApproveTable
    api={'BusinessRegistration/GetCheckApplication'}
    displayData={[
      'applicationNo',
      'createdDate',      
      'companyOrIndividualType',
      'businessName',
      'businessNameMyanmar',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'isReSubmit',
      'takeBy',
      'id',
    ]}
    fetch={Get}
  ></CheckApproveTable>
);

export default RegistrationList;

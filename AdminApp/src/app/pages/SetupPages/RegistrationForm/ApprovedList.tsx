import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';

const ApprovedList: React.FC = () => (
  <CheckApproveTable
    api={'BusinessRegistration/GetApprovedApplication'}
    displayData={[
      'applicationNo',
      'createdDate',
      'approveDate',
      'approvedBy',
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

export default ApprovedList;

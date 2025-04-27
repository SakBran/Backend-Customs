import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';
import DoccaAction from 'src/app/components/TableAction/DoccaAction';

const columnMapping = {
  "doccaPassDate": "docaPassDate",
}

const DoccaApprovedList: React.FC = () => (
  <CheckApproveTable
    api={'DOCCA/GetDOCCAApprovedApplications'}
    displayData={[
      'applicationNo',
      'createdDate',
      'checkDate',
      'doccaPassDate',
      'businessName',
      'businessNameMyanmar',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'sendToDocaBy',
      'isReSubmit',
      'id',
    ]}
    columnLabels={columnMapping}
    fetch={Get}
    actionColumn={(record) => <DoccaAction id={record.id} source='DoccaApprovedList' />}
  ></CheckApproveTable>
);

export default DoccaApprovedList;
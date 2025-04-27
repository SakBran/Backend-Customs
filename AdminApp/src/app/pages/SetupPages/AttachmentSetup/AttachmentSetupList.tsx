import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const AttachmentSetupList: React.FC = () => (
  <BasicTable
    api={'AttachmentSetup'}
    displayData={['step', 'title', 'registrationType', 'isActive', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default AttachmentSetupList;

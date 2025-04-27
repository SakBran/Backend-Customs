import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const MemberList: React.FC = () => (
  <BasicTable
    api={'Member/GetAllwithBusinessName'}
    displayData={[
      'name',
      'password',
      'email',
      'businessName',
      'businessNameMyanmar',
      'address',
      'phoneNo',
      'id',
    ]}
    fetch={Get}
  ></BasicTable>
);

export default MemberList;

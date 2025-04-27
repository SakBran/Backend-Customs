import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const AnnouncementList: React.FC = () => (
  <BasicTable
    api={'Announcement'}
    displayData={['title', 'createdDate', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default AnnouncementList;

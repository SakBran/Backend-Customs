import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import envConfig from 'src/app/config';
import { Get } from 'src/app/services/BasicHttpServices';

const CheckedAmendList: React.FC = () => {
  /*<CheckApproveTable
    api={'BusinessRegistration/GetCheckedAmend'}
    displayData={[
      'applicationNo',
      'createdDate',
      'checkDate',   
      'businessName',
      'businessNameMyanmar',
      // 'approveCheckUserId',
      'checkedBy',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'isReSubmit',
      'takeBy',
      'id',
    ]}
    // columnLabels={{
    //   'approveCheckUserId': 'Checked By'
    // }}
    fetch={Get}
  ></CheckApproveTable>
);*/

const [columns, setColumns] = useState<string[]>([
  'applicationNo',
      'createdDate',
      'checkDate',   
      'businessName',
      'businessNameMyanmar',
      // 'approveCheckUserId',
      'checkedBy',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'isReSubmit',
      'id',
]);
const [loading, setLoading] = useState(true);
const roleFetched = useRef(false);

useEffect(() => {
  const fetchUserRole = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get<string>(
        `${envConfig.baseUrl}BusinessRegistration/GetCurrentUserRole`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If user is "Approve User", add the column
      if (!roleFetched.current && response.data === 'Approve User') {
        setColumns(prevColumns => {
          if (!prevColumns.includes('takeBy')) {
            return [...prevColumns, 'takeBy'];
          }
          return prevColumns;
        });
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserRole();
}, []);

if (loading) {
  return <div>Loading...</div>;
}

return (
  <CheckApproveTable
    api={'BusinessRegistration/GetCheckedAmend'}
    displayData={columns}
    fetch={Get}
  />
);
};

export default CheckedAmendList;

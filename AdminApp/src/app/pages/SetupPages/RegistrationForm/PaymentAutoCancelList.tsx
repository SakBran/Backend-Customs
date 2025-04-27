import React, { useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import { format } from 'date-fns';
import { Modal } from 'antd';

const PaymentAutoCancelList: React.FC = () => {
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      await fetch('BusinessRegistration/PaymentAutoCancelList');
      // Update the state variable to trigger re-render
      //setRefreshData(!refreshData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    //const formattedDate = format(date, 'yyyy-MM-dd');
    const formattedDate = format(date, 'dd-MM-yyyy');
    return formattedDate;
  };

  const fetch = async (url: string): Promise<PaginationType> => {
    const response = await axiosInstance.get(url + '&status=PaymentAutoCancel');
    const responseData: PaginationType = JSON.parse(
      JSON.stringify(response.data)
    );
    console.log('Response Data:', responseData);
    responseData.data.forEach((data) => {
      data['createdDate'] = formatDate(data['createdDate']);
      data['blockedDate'] = formatDate(data['blockedDate']);
      data['approvedDate'] = formatDate(data['approvedDate']);
      data['paymentAutoCancelDate'] = formatDate(data['paymentAutoCancelDate']);
    });
    return responseData;
  };

  return (
    <>
      <RegisteredTable
        key={refreshData ? 'refresh' : 'initial'} // Key prop to force re-render
        api={'BusinessRegistration/PaymentAutoCancelList'}
        displayData={[
          'applicationNo',
          'createdDate',     
          'approvedDate',
          'blockedDate',
          'paymentAutoCancelDate',
          'businessName',
          'businessNameMyanmar',
          'companyRegNo',
          'sMERegNo',
          'eIRRegNo',
        ]}
        fetch={fetch}
      />
     
    </>
  );
};

export default PaymentAutoCancelList;

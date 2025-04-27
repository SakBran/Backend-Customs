import React, { useEffect, useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import { format } from 'date-fns';
import { Modal } from 'antd';
import axios from 'axios';
import { AnyObject } from 'src/Models/AnyObject';

const PaymentBlockedList: React.FC = () => {
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isRequested, setisRequested] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      await fetch('BusinessRegistration/GetBlockedApplication');
      // Update the state variable to trigger re-render
      //setRefreshData(!refreshData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showConfirmDialog = (id: any) => {
    setSelectedUserId(id);
    setConfirmDialogVisible(true);
  };

  const checkIsRequested = async (id: number) => {
    try {
      const response = await axiosInstance.get<boolean>(`BusinessRegistration/CheckIsRequested?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error checking suspension status:', error);
      return false;
    }
  };

  const handleConfirmNo = () => {
    setConfirmDialogVisible(false);
  };
  const unblockUser = async () => {
    // const isConfirmed = window.confirm(
    //   `Are you sure you want to unblock this application?`
    // );
    // if (!isConfirmed) {
    //   return; // Exit if the user did not confirm
    // }
    setConfirmDialogVisible(false);

    console.log(`Unblocking user with ID ${selectedUserId}`);
    try {
      await axiosInstance.put(
        `BusinessRegistration/UnBlockApplication?id=${selectedUserId}&status=Payment Block`
      );
      console.log(`Unblocking user with ID ${selectedUserId}`);
      setRefreshKey((prevKey: number) => prevKey + 1);
      fetchData();
    } catch (error) {
      console.error('Error unblocking user:', error);
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

  // const normalizeData = (data: AnyObject[]) => {
  //   return data.map((item) => ({
  //     applicationNo: item.applicationNo || null,
  //     createdDate: item.createdDate || null,
  //     checkedDate: item.checkedDate || null,
  //     approvedDate: item.approvedDate || null,
  //     blockedDate: item.blockedDate || null,
  //     businessName: item.businessName || null,
  //     businessNameMyanmar: item.businessNameMyanmar || null,
  //     companyRegNo: item.companyRegNo || null,
  //     sMERegNo: item.sMERegNo || null,
  //     eIRRegNo: item.eIRRegNo || null,
  //     applyType: item.applyType || null,
  //     id: item.id || null,
  //   }));
  // };

  const fetch = async (url: string): Promise<PaginationType> => {
    const response = await axiosInstance.get(url + '&status=Payment Block');
    const responseData: PaginationType = JSON.parse(JSON.stringify(response.data));
    console.log('API Response Data:', responseData);

    // responseData.data = normalizeData(responseData.data);

    // Check each id for request status and modify the response data inline
    await Promise.all(
      responseData.data.map(async (data) => {
        const id = data['id'];
        try {
          const response = await axiosInstance.get<boolean>(
            `BusinessRegistration/CheckIsRequested?id=${id}`
          );
          const isRequested = response.data;

          // Format the date fields
          data['createdDate'] = formatDate(data['createdDate']);
          data['checkedDate'] = formatDate(data['checkedDate']);
          data['blockedDate'] = formatDate(data['blockedDate']);
          data['approvedDate'] = formatDate(data['approvedDate']);
          
          // Update 'id' to a button if it's requested, otherwise show 'UnBlock'
          // data['id'] = isRequested ? (
          //  <button onClick={() => showConfirmDialog(id)}>Unblock</button>
          // ) : (
          //  "UnBlock"
          // );
           data['id'] = ( data['id'] = isRequested?
             <button onClick={() => showConfirmDialog(id)}>Unblock</button>
           : <button disabled={true}>UnBlock</button> );
        } catch (error) {
          console.error(`Error checking request status for ID ${id}:`, error);
          data['id'] = "Error";  // Optional error handling
        }
      })
    );

    return responseData;
  };

  return (
    <>
      <RegisteredTable
        key={refreshData ? 'refresh' : 'initial'} // Key prop to force re-render
        api={'BusinessRegistration/GetBlockedApplication'}
        displayData={[
          'applicationNo',
          'createdDate',
          'checkedDate',          
          'approvedDate',
          'blockedDate',
          'businessName',
          'businessNameMyanmar',
          'companyRegNo',
          'sMERegNo',
          'eIRRegNo',
          'applyType',
          'id',
        ]}
        fetch={fetch}
      />
      <div>
        <Modal
          title="Confirmation"
          visible={confirmDialogVisible}
          onOk={unblockUser}
          onCancel={handleConfirmNo}
        >
          <p>Unblock ပြုလုပ်မှာ သေချာပါသလား။</p>
        </Modal>
      </div>
    </>
  );
};

export default PaymentBlockedList;

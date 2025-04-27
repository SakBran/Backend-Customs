import React, { useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import { format } from 'date-fns';
import { Modal } from 'antd';

const TurndownBlockedList: React.FC = () => {
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [confirmDialogVisible, setConfirmDialogVisible] =
  useState<boolean>(false);
const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


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

  const handleConfirmNo = () => {
    setConfirmDialogVisible(false);
  };

  const unblockUser = async () => {
    setConfirmDialogVisible(false);
    console.log(`Unblocking user with ID ${selectedUserId}`);
    try {
      await axiosInstance.put(
        `BusinessRegistration/UnBlockApplication?id=${selectedUserId}&status=Turn Down Block`
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

  const fetch = async (url: string): Promise<PaginationType> => {
    const response = await axiosInstance.get(url + '&status=Turn Down Block');
    const responseData: PaginationType = JSON.parse(
      JSON.stringify(response.data)
    );
    console.log('Response Data:', responseData);
    responseData.data.forEach((data) => {
      data['createdDate'] = formatDate(data['createdDate']);
      data['turnDownDate'] = formatDate(data['turnDownDate']);
      data['blockedDate'] = formatDate(data['blockedDate']);
      //data['expiredDate'] = formatDate(data['expiredDate']);
      const id = data['id'];
      //data['id'] = <button onClick={() => showConfirmDialog(id)}>Unblock</button>;
      data['id'] = "-";
    });
    return responseData;
  };

  return (
    <div>
    <RegisteredTable
      key={refreshData ? 'refresh' : 'initial'} // Key prop to force re-render
      api={'BusinessRegistration/GetBlockedApplication'}
      displayData={[
        'applicationNo',
        'createdDate',
        'turnDownDate',
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
    <Modal
    title="Confirmation"
    visible={confirmDialogVisible}
    onOk={unblockUser}
    onCancel={handleConfirmNo}
  >
    <p>Unblock ပြုလုပ်မှာ သေချာပါသလား။</p>
  </Modal>
  </div>
  );
};

export default TurndownBlockedList;

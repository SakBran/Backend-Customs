import React, { useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import { format } from 'date-fns';
import { Modal } from 'antd';

const SuspensionList: React.FC = () => {
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      await fetch('BusinessRegistration/GetSuspensedApplication');
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
        `BusinessRegistration/UnSuspenseApplication?id=${selectedUserId}`
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
    const response = await axiosInstance.get(url);
    const responseData: PaginationType = JSON.parse(
      JSON.stringify(response.data)
    );
    console.log('Response Data:', responseData);
    responseData.data.forEach((data) => {
      data['suspendedDate'] = formatDate(data['suspendedDate']);
      data['unsuspendedDate'] = formatDate(data['unsuspendedDate']);
      //data['approveDate'] = formatDate(data['approveDate']);

    const unsuspendedDate = formatDate(data['unsuspendedDate']);
    const isUnSuspendable =
    unsuspendedDate === null || 
    unsuspendedDate === '1970-01-01';

      /*const id = data['id'];
      data['id'] = (
        <button onClick={() => showConfirmDialog(id)}>UnSuspend</button>
      );*/

      const id = data['id'];
      data['id'] = ( data['id'] = isUnSuspendable?
        <button onClick={() => showConfirmDialog(id)}>UnSuspend</button>
      : <button disabled={true}>UnSuspend</button> );
    });

    return responseData;
  };

  return (
    <>
      <RegisteredTable
        key={refreshData ? 'refresh' : 'initial'} // Key prop to force re-render
        api={'BusinessRegistration/GetSuspensedApplication'}
        displayData={[
          'memberName',
          'businessName',
          'businessNameMyanmar',
          'certificateNo',
          'suspendedDate',
          'suspendRemark',
          'unsuspendedDate',
          'companyRegNo',
          'smeRegNo',
          'eirRegNo',
          'id'
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
          <p>UnSuspend ပြုလုပ်မှာ သေချာပါသလား။</p>
        </Modal>
      </div>
    </>
  );
};

export default SuspensionList;

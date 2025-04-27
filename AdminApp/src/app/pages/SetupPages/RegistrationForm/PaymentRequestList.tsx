import React, { useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import { format } from 'date-fns';
import { Modal } from 'antd';

const PaymentRequestList: React.FC = () => {
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      await fetch('BusinessRegistration/GetPaymentRequestList');
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
        `BusinessRegistration/UnBlockApplication?id=${selectedUserId}&status=Payment Block`
      );
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
      data['createdDate'] = formatDate(data['createdDate']);
      data['checkedDate'] = formatDate(data['checkedDate']);
      data['approvedDate'] = formatDate(data['approvedDate']);
      data['blockedDate'] = formatDate(data['blockedDate']);
      // data['paymentUnBlockRequestDate'] = formatDate(
      //   data['paymentUnBlockRequestDate']
      // );
      data['requestDate'] = formatDate(data['requestDate']);

      const id = data['id'];
      data['id'] = (
        <button onClick={() => showConfirmDialog(id)}>Unblock</button>
      );

      const attachmentUrl = data['requestAttachment'];
    if (attachmentUrl) {
      data['requestAttachment'] = (
        <a href={attachmentUrl} target="_blank" rel="noopener noreferrer">
          View Attachment
        </a>
      );
    } else {
      data['requestAttachment'] = 'No Attachment';
    }
  });
    return responseData;
  };

  return (
    <div>
      <RegisteredTable
        key={refreshData ? 'refresh' : 'initial'}
        api={'BusinessRegistration/GetPaymentRequestList'}
        displayData={[
          'applicationNo',
          'createdDate',
          'checkedDate',
          'approvedDate',
          'blockedDate',
          'businessName',
          'businessNameMyanmar',
          'companyRegNo',
          'smeRegNo',
          'eirRegNo',
          // 'paymentUnBlockRequestDate',
          // 'unblockAttachment',
          'requestDate',
          'requestAttachment',
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

export default PaymentRequestList;

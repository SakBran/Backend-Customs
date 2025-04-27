import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import dayjs from 'dayjs'; // Optional: for better date formatting

const fetchData = async (url: string): Promise<PaginationType> => {
  try {
    const response = await axiosInstance.get(url);
    const responseData: PaginationType = response.data;

    responseData.data = responseData.data.map((data) => {
       if (data.resubmitDate) {
        data.resubmitDate = dayjs(data.resubmitDate).format('DD-MM-YYYY HH:mm:ss');
      }
      return data;
    });
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
const CheckResubmitExtensionList: React.FC = () => (
  <CheckApproveTable
    api={'BusinessRegistration/GetCheckResubmitApplicationExtension'}
    displayData={[
      'applicationNo',
      'createdDate',
      'checkDate',
      'resubmitDate',
      'businessName',
      'businessNameMyanmar',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'id',
    ]}
    fetch={fetchData} // Use the custom fetch function
    isRestricted={true}
  />
);
export default CheckResubmitExtensionList;



import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';
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
const ResubmitExtensionList: React.FC = () => (
  <CheckApproveTable
    api={'BusinessRegistration/GetResubmitApplicationExtension'}
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
    fetch={fetchData}
    isRestricted={true}
  ></CheckApproveTable>
);

export default ResubmitExtensionList;

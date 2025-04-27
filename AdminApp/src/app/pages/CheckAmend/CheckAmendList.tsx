import React from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import axiosInstance from 'src/app/services/AxiosInstance';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';

//#region တကယ်လို့ Dataကို Manual Bind ချင်ရင်ဒါနဲ့ရေးလို့ရတယ်။

const CheckAmendList: React.FC = () => {
  return (
    <CheckApproveTable
      api={'BusinessRegistration/GetCheckAmend'}
      displayData={[
        'applicationNo',
        'createdDate',        
        'companyOrIndividualType',
        'businessName',
        'businessNameMyanmar',
        'companyRegNo',
        'smeRegNo',
        'eirRegNo',
        'isReSubmit',
        'takeBy',
        'id',
      ]}
      fetch={Get}
    ></CheckApproveTable>
  );
};

export default CheckAmendList;

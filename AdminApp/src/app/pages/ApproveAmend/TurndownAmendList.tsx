import React from 'react';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';
import { format } from 'date-fns';

/*interface YourDataStructure {
  applicationNo: string;
  createdDate: string;
  businessName: string;
  businessNameMyanmar: string;
  companyRegNo: string;
  sMERegNo: string;
  eIRRegNo: string;
  turnDownCount: number;
  turnDownDate: string;
  id: string;
  // Add more properties if needed
}*/

/*const formatEntryDate = (dateString: any) => {
  const date = new Date(dateString);
  return format(date, 'dd-MM-yyyy HH:mm:ss'); // Use 'HH' for 24-hour format
};*/

const TurndownAmendList: React.FC = () => (
  <CheckApproveTable
    api={'BusinessRegistration/GetTurndownApplicationAmend'}
    displayData={[
      'applicationNo',
      'createdDate',
      'businessName',
      'businessNameMyanmar',
      'companyRegNo',
      'smeRegNo',
      'eirRegNo',
      'turnDownCount',
      'turnDownDate',
      'id',
    ]}
    fetch={Get}
    /*formatData ={(data: YourDataStructure) => ({
      ...data,
      turnDownDate: formatEntryDate(data.turnDownDate),
    })}*/
  ></CheckApproveTable>
);

export default TurndownAmendList;

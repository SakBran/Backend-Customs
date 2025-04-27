import { Button, Card, Col, Input, Row, Space } from 'antd';
import { format, parse } from 'date-fns';
import React, { useEffect, useReducer, useState } from 'react';
import { AnyObject } from 'src/Models/AnyObject';
import BusinessWithMemberDTO from 'src/Models/BusinessWithMemberDTO';
import { PaginationType } from 'src/Models/PaginationType';
import { ReportTable } from 'src/app/components/Table/ReportTable';
import axiosInstance from 'src/app/services/AxiosInstance';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { Link } from 'react-router-dom';

const reducerFunction = (
  state: BusinessWithMemberDTO,
  action: Action
): BusinessWithMemberDTO => {
  switch (action.type) {
    case 'fromDate':
      return { ...state, fromDate: action.value };
    case 'toDate':
      return { ...state, toDate: action.value };
    default:
      return state;
  }
};

const formatTransactionDate = (dateString: string | number | Date) => {
  // Format date as per your requirements
  const date = new Date(dateString);
  return format(date, 'dd-MM-yyyy HH:mm:ss');
};

// Define the action types
type Action =
  | { type: 'fromDate'; value: string }
  | { type: 'toDate'; value: string };

const initialReportBusinessWithMemberDTO: BusinessWithMemberDTO = {
  Id: 0,
  businessRegistrationId: 0,
  memberName: '',
  companyRegNo: '',
  businessName: '',
  businessNameMyanmar: '',
  businessAddressState: '',

  certificateNo: '',
  eirRegNo: '',
  smeRegNo: '',

  businessType: '',
  businessCategory: '',
  companyOrIndividualType: '',
  applicationNo: '',
  status: '',
  businessAddress: '',
  businessOwnerName: '',
  businessOwnerNameMyanmar: '',
  businessOwnerAddress: '',
  PermanantAddress: '',
  BusinessOwnerPassportNumber: '',
  BusinessOwnerNrc: '',
  BusinessOwnerEmail: '',
  BusinessOwnerPhoneNo: '',
  ValidDate: new Date(),
  IssuedDate: new Date(),
  CreatedDate: new Date(),
  ApprovedDate: new Date(),
  fromDate: '', // Initialize with null or any suitable default value
  toDate: '',
  userRef1: '',
  applyType: '',
  // new fields ( 2, 17 , 2025 )
  sendToDocaBy: '',
  checkedBy: '',
  approvedBy: ''
};

const CompanyInfoReport: React.FC = () => {
  const [filterData, dispatchFilterData] = useReducer(
    reducerFunction,
    initialReportBusinessWithMemberDTO
  );

  const [reportData, setReportData] = useState([]);

  // const exportToExcel = (data: any, filename: any) => {
  //   // Define the columns you want to export
  //   const columnsToExport = [
  //     'memberName',
  //     'applicationNo',
  //     'businessName',
  //     'businessNameMyanmar',
  //     'businessAddressState',
  //     'certificateNo',
  //     'businessType',
  //     'businessCategory',
  //     'companyOrIndividualType',
  //     'status',
  //     'createdDate',
  //     'approvedDate',
  //     'issuedDate',
  //     'userRef1',
  //   ];
  //   // Filter and map the data to include only the selected columns
  //   const dataToExport = data.map((row: any) => {
  //     const rowData: any = {};
  //     columnsToExport.forEach((column) => {
  //       rowData[column] = row[column];
  //     });
  //     return rowData;
  //   });
  //   const ws = XLSX.utils.json_to_sheet(dataToExport);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, `${filename}.xlsx`);
  // };
  // const exportToExcel = () => {
  //   const table = document.getElementById('reportTable');
  //   const wb = XLSX.utils.table_to_book(table, { sheet: 'SheetJS' });
  //   XLSX.writeFile(wb, 'Report.xlsx');
  // };
  const exportToExcel = () => {
    const dataToExport = Array.from(
      document.querySelectorAll('#reportTable tbody tr')
    ).map((row) => {
      const cells = row.querySelectorAll('td');

      const entryDateString = cells[1].innerText; // '14-10-2024'

      const entryDate = parse(
        entryDateString,
        'dd-MM-yyyy HH:mm:ss',
        new Date()
      );

      const formattedEntryDate = !isNaN(entryDate.getTime())
        ? format(entryDate, 'dd-MM-yyyy HH:mm:ss')
        : 'Invalid Date';

      return {
        No: cells[0].innerText,
        'Member Name': cells[1].innerText,
        'Application No': cells[2].innerText,
        'Business Name': cells[3].innerText,
        'Business Name Myanmar': cells[4].innerText,
        'Business Address State': cells[5].innerText,
        'Business Owner Name': cells[6].innerText,
        'Business Owner Nrc': cells[7].innerText,
        'Business Owner Passport Number': cells[8].innerText,
        'Certificate No': cells[9].innerText,
        'EIR Reg No': cells[10].innerText,
        'SME Reg No': cells[11].innerText,
        'Apply Type': cells[12].innerText,
        'Business Type': cells[13].innerText,
        'Business Category': cells[14].innerText,
        'Company Or Individual Type': cells[15].innerText,
        Status: cells[16].innerText,
        UserRef: cells[17].innerText,
        'Created Date': cells[18].innerText,
        'Approved Date': cells[19].innerText,
        'Issued Date': cells[20].innerText,
        'Valid Date': cells[21].innerText,
        // new fields ( 2, 17 , 2025 )
        'sendToDocaBy': cells[22].innerText,
        'checkedBy': cells[23].innerText,
        'approvedBy': cells[24].innerText,
      };
    });

    console.log('Data to export:', dataToExport);

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'Report.xlsx');
  };
  const handleReportData = (data: any) => {
    setReportData(data);
  };

  const fetch = async (
    url: string,
    data: AnyObject
  ): Promise<PaginationType> => {
    // Format date and time values in ISO 8601 format
    const formattedData = {
      ...data,
      fromDate: data.fromDate ? new Date(data.fromDate).toISOString() : null,
      toDate: data.toDate ? new Date(data.toDate).toISOString() : null,
    };

    return await axiosInstance
      .post(url, formattedData)
      .then((response) => {
        const responseData: PaginationType = JSON.parse(
          JSON.stringify(response.data)
        );
        responseData.data.forEach((data) => {
          const id = data['id'];
          //data['id'] = '';
          data['createdDate'] = formatTransactionDate(data['createdDate']);
          data['approvedDate'] = formatTransactionDate(data['approvedDate']);
          data['issuedDate'] = formatTransactionDate(data['issuedDate']);
          data['validDate'] = formatTransactionDate(data['validDate']);
          data['actionLink'] = <Link to={'/Registration/' + id}>Action</Link>;
        });
        return responseData;
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('Report/CompanyInfo', filterData);
        console.log('filterData', filterData);
        console.log('Response', response);
        console.log('ResponseData', response.data);
        handleReportData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterData]);

  return (
    <>
      <Card style={{ margin: 5 }}>
        <Row>
          <Col span={11}>
            <Space.Compact block>
              <Input
                style={{ width: '50%' }}
                value={'From Date'}
                color="red"
                readOnly
                disabled
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  dispatchFilterData({
                    type: 'fromDate',
                    value: e.target.value,
                  })
                }
              />
            </Space.Compact>
          </Col>
          <Col span={1}></Col>
          <Col span={12}>
            <Space.Compact block>
              <Input
                style={{ width: '50%' }}
                value={'To Date'}
                color="red"
                readOnly
                disabled
              />
              <Input
                type="datetime-local"
                onChange={(e) =>
                  dispatchFilterData({
                    type: 'toDate',
                    value: e.target.value,
                  })
                }
              />
            </Space.Compact>
          </Col>
        </Row>
        <br />
        <Row>
          <Button type="primary" onClick={() => exportToExcel()}>
            Export to Excel
          </Button>
        </Row>
      </Card>

      <ReportTable
        api={'Report/CompanyInfo'}
        displayData={[
          'memberName',
          'applicationNo',
          'businessName',
          'businessNameMyanmar',
          'businessAddressState',
          'businessOwnerName',
          'businessOwnerNrc',
          'businessOwnerPassportNumber',
          'certificateNo',
          'eirRegNo',
          'smeRegNo',
          'applyType',
          'businessType',
          'businessCategory',
          'companyOrIndividualType',
          'status',
          'userRef1',
          'createdDate',
          'approvedDate',
          'issuedDate',
          'validDate',
          // new fields ( 2, 17 , 2025 )
          'sendToDocaBy',
          'checkedBy',
          'approvedBy',
          //
          'id',
          'actionLink', // Add the new actionLink field
        ]}
        fetch={fetch}
        filterData={filterData}
      ></ReportTable>
    </>
  );
};

export default CompanyInfoReport;

// public string SendToDOCCAUserName { get; set; }
// public string ApproveCheckUserName { get; set; }
// public string ApproveApproveUserName { get; set; }
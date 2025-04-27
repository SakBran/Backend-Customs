import { Button, Card, Col, Input, Row, Space } from 'antd';
import { format, parse } from 'date-fns';
import React, { useEffect, useReducer, useState } from 'react';
import { AnyObject } from 'src/Models/AnyObject';
import BusinessRegistrationWithIssuedDate from 'src/Models/BusinessRegistrationWithIssuedDateDTO';
import { PaginationType } from 'src/Models/PaginationType';
import { ReportTable } from 'src/app/components/Table/ReportTable';
import axiosInstance from 'src/app/services/AxiosInstance';
import * as XLSX from 'xlsx'; // Import the XLSX library

const reducerFunction = (
  state: BusinessRegistrationWithIssuedDate,
  action: Action
): BusinessRegistrationWithIssuedDate => {
  switch (action.type) {
    case 'fromDate':
      return { ...state, fromDate: action.value };
    case 'toDate':
      return { ...state, toDate: action.value };
    default:
      return state;
  }
};

// const formatTransactionDate = (dateString: string | number | Date) => {
//   // Format date as per your requirements
//   const date = new Date(dateString);
//   return format(date, 'dd-MM-yyyy HH:mm:ss');
// };
const formatTransactionDate = (dateString: any) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  //const formattedDate = format(date, 'yyyy-MM-dd');
  const formattedDate = format(date, 'dd-MM-yyyy');
  return formattedDate;
};
const normalizeData = (data: AnyObject[]) => {
  return data.map((item) => ({
    applicationNo: item.applicationNo || null,
    businessName: item.businessName || null,
    businessOwnerName: item.businessOwnerName || null,
    businessOwnerAddress: item.businessOwnerAddress || null,
    state: item.state || null,
    websiteUrls: item.websiteUrls || null,
    socialMediaUrls: item.socialMediaUrls || null,
    certificateNo: item.certificateNo || null,
    createdDate: item.createdDate || null,
    businessAddress: item.businessAddress || null,
    issuedDate: item.issuedDate || null,
  }));
};
// Define the action types
type Action =
  | { type: 'fromDate'; value: string }
  | { type: 'toDate'; value: string };

const initialReportRegisterdBusiness: BusinessRegistrationWithIssuedDate = {
  applicationNo: '',
  businessName: '',
  businessOwnerName: '',
  nrcNo: '',
  businessOwnerAddress: '',
  state: '',
  websiteUrls: '',
  socialMediaUrls: '',
  mobileApplicationUrl: '',
  certificateNo: '',
  createdDate: new Date(),
  businessAddress: '',
  issuedDate: new Date(),

  fromDate: '',
  toDate: '',
};

const RegisteredBusinessReport: React.FC = () => {
  const [filterData, dispatchFilterData] = useReducer(
    reducerFunction,
    initialReportRegisterdBusiness
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

  const handleReportData = (data: any) => {
    setReportData(data);
  };
  const exportToExcel = () => {
    const dataToExport = Array.from(
      document.querySelectorAll('#reportTable tbody tr')
    ).map((row) => {
      const cells = row.querySelectorAll('td');
      return {
        No: cells[0].innerText,
        'Application No': cells[1].innerText,
          'Business Name': cells[2].innerText,
          'Business Owner Name': cells[3].innerText,
          'Business Owner Address': cells[4].innerText,
          'State': cells[5].innerText,
          'Website Urls': cells[6].innerText,
          'Social Media Urls': cells[7].innerText,
          'Certificate No': cells[8].innerText,
          'Created Date': cells[9].innerText,
          'Business Address': cells[10].innerText,
          'Issued Date': cells[11].innerText,          
      };
    });

    console.log('Data to export:', dataToExport);

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'Report.xlsx');
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
          data['id'] = '';
          data['createdDate'] = formatTransactionDate(data['createdDate']);

          data['issuedDate'] = formatTransactionDate(data['issuedDate']);
        });
        responseData.data = normalizeData(responseData.data);
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
        api={'Report/RegisteredBusiness'}
        displayData={[
          'applicationNo',
          'businessName',
          'businessOwnerName',
          'businessOwnerAddress',
          'state',
          'websiteUrls',
          'socialMediaUrls',
          'certificateNo',
          'createdDate',
          'businessAddress',
          'issuedDate',
        ]}
        fetch={fetch}
        filterData={filterData}
      ></ReportTable>
    </>
  );
};

export default RegisteredBusinessReport;

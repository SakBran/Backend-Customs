import React, { useEffect, useReducer, useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { Button, Card, Col, Input, Row, Space } from 'antd';
import { AnyObject } from 'src/Models/AnyObject';
import { ReportTable } from 'src/app/components/Table/ReportTable';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { format, parse } from 'date-fns';

//#region တကယ်လို့ Dataကို Manual Bind ချင်ရင်ဒါနဲ့ရေးလို့ရတယ်။

// Define the action types
type Action =
  | { type: 'fromDate'; value: string }
  | { type: 'toDate'; value: string };

const reducerFunction = (state: AnyObject, action: Action): AnyObject => {
  switch (action.type) {
    case 'fromDate':
      return { ...state, fromDate: action.value };
    case 'toDate':
      return { ...state, toDate: action.value };
    default:
      return state;
  }
};
const AccountTransactionReort: React.FC = () => {
  const [filterData, dispatchFilterData] = useReducer(reducerFunction, {});
  const [reportData, setReportData] = useState([]);

  // const exportToExcel = (data: any, filename: any) => {
  //   // Define the columns you want to export
  //   const columnsToExport = [
  //     'entryDate',
  //     'companyRegistrationNo',
  //     'businessName',
  //     'businessNameMyanmar',
  //     'voucherNo',
  //     'accountTitleDescription',
  //     'amount',
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
        ? format(entryDate, 'MM-dd-yyyy')
        : 'Invalid Date';

      return {
        No: cells[0].innerText,
        'Entry Date': formattedEntryDate,
        'Htathaka No': cells[2].innerText,
        'Company Name': cells[3].innerText,
        'Transation Title': cells[4].innerText,
        'Deducted Fees': cells[5].innerText,
        Remark: cells[6].innerText,
        'Account Code': cells[7].innerText,
        'Location Code': cells[8].innerText,
      };
    });

    dataToExport.unshift({
      No: '',
      'Entry Date': '',
      'Htathaka No': '',
      'Company Name': '',
      'Transation Title': '',
      'Deducted Fees': '',
      Remark: '',
      'Account Code': '',
      'Location Code': '',
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport, {
      skipHeader: false, // Ensures headers are included after the empty row
    });

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
    try {
      const formattedData = {
        ...data,
        fromDate: data.fromDate ? new Date(data.fromDate).toISOString() : null,
        toDate: data.toDate ? new Date(data.toDate).toISOString() : null,
      };
      const response = await axiosInstance.post(url, formattedData);
      const responseData: PaginationType = JSON.parse(
        JSON.stringify(response.data)
      );
      responseData.data.forEach((item) => {
        item['id'] = '';
        item['entryDate'] = formatEntryDate(item['entryDate']);
      });
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('Report/AccountSummary', filterData);
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

  const formatEntryDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss'); // Use 'HH' for 24-hour format
  };

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
        api={'Report/DccaReport'}
        displayData={[
          'entryDate',
          'htathakaNo',
          'companyName',
          'transactionTitle',
          'deductedFees',
          'remark',
          'accountCode',
          'locationCode',
          'id',
        ]}
        fetch={fetch}
        filterData={filterData}
      ></ReportTable>
    </>
  );
};

export default AccountTransactionReort;

import React, { useEffect, useReducer, useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { Button, Card, Col, Input, Row, Space, Typography } from 'antd';
import { AnyObject } from 'src/Models/AnyObject';
import { ReportTable } from 'src/app/components/Table/ReportTable';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { format } from 'date-fns';

//#region တကယ်လို့ Dataကို Manual Bind ချင်ရင်ဒါနဲ့ရေးလို့ရတယ်။

// Define the action types
type Action =
  | { type: 'fromDate'; value: string }
  | { type: 'toDate'; value: string };
const { Text, Link } = Typography;
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
const AyaLogReport: React.FC = () => {
  const [filterData, dispatchFilterData] = useReducer(reducerFunction, {});

  const exportToExcel = () => {
    const table = document.getElementById('reportTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'SheetJS' });
    XLSX.writeFile(wb, 'Report.xlsx');
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
      responseData.data.forEach((item, index) => {
        item['id'] = '';
        if (item['statusCode'] !== '00') {
          item['statusCode'] = (
            <Text key={index + 1} type="danger">
              {item['statusCode']}
            </Text>
          );
        }
        item['requstResponseTime'] = formatEntryDate(
          item['requstResponseTime']
        );
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
        const response = await fetch('Report/AyaPaymentLogReport', filterData);
        console.log('filterData', filterData);
        console.log('Response', response);
        console.log('ResponseData', response.data);
        //handleReportData(response.data);
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
                type="date"
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
                type="date"
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
        api={'Report/AyaPaymentLogReport'}
        displayData={[
          'transationId',
          'tranId',
          'statusCode',
          'bank',
          'requestOrResponse',
          'requstResponseTime',
          'amount',
          'merchOrderId',
          'currenyCode',
          'applyType',
          'paymentCardNumber',
          'paymentMobileNumber',
          'userRef1',
          'userRef2',
          'userRef3',
          'userRef4',
          'userRef5',
          'description',
          'dateTime',
          'checkSum',
          'payload',
        ]}
        fetch={fetch}
        filterData={filterData}
      ></ReportTable>
    </>
  );
};

export default AyaLogReport;

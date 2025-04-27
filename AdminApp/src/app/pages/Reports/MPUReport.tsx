import { Button, Card, Col, Input, Row, Space } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { AnyObject } from 'src/Models/AnyObject';
import { PaginationType } from 'src/Models/PaginationType';
import { ReportDTOForMPUPayment } from 'src/Models/PaymentTransationModel';
import { ReportTable } from 'src/app/components/Table/ReportTable';
import axiosInstance from 'src/app/services/AxiosInstance';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { saveAs } from 'file-saver';

const reducerFunction = (
  state: ReportDTOForMPUPayment,
  action: Action
): ReportDTOForMPUPayment => {
  switch (action.type) {
    case 'fromDate':
      return { ...state, fromDate: action.value };
    case 'toDate':
      return { ...state, toDate: action.value };
    default:
      return state;
  }
};

// Define the action types
type Action =
  | { type: 'fromDate'; value: string }
  | { type: 'toDate'; value: string };

const initialReportDTOForMPUPayment: ReportDTOForMPUPayment = {
  id: '', // Initialize with an empty string or any suitable default value
  transactionId: '',
  eCommerceNo: '',
  companyRegistrationNo: '',
  companyName: '',
  applyType: '',
  applicationNo: '',
  invoiceNo: '',
  voucherNo: '',
  mocAmount: 0, // Initialize with 0 or any suitable default value
  imAmount: 0, // Initialize with 0 or any suitable default value
  transactionAmount: 0, // Initialize with 0 or any suitable default value
  mpuStringAmount: '',
  merchantId: '',
  cardNo: '',
  responseCode: '',
  accountNo: '',
  transactionRefNo: '',
  approvalCode: '',
  transactionDateTime: null, // Initialize with null or any suitable default value
  mpuTransactionDateTime: '',
  status: '',
  failReason: '',
  hashValue: '',
  memberId: '',
  paymentType: '',
  mpuAmount: 0, // Initialize with 0 or any suitable default value
  fromDate: '', // Initialize with null or any suitable default value
  toDate: '', // Initialize with null or any suitable default valu
  isOnlineFee: '',

  // Initialize with null or any suitable default value
};

const MPUReport: React.FC = () => {
  const [filterData, dispatchFilterData] = useReducer(
    reducerFunction,
    initialReportDTOForMPUPayment
  );

  const exportToExcel = () => {
    const table = document.getElementById('reportTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'SheetJS' });
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
        const response = await fetch('Report/MPUReport', filterData);
        console.log('filterData', filterData);
        console.log('Response', response);
        console.log('ResponseData', response.data);
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
        api={'Report/MPUReport'}
        displayData={[
          'applicationNo',
          'invoiceNo',
          'transactionId',
          'voucherNo',
          'tranId',
          'mpuTransactionDateTime',
          'isOnlineFee',
          'applyType',
          'cardNo',
          'approvalCode',
          'transactionRefNo',
          'transactionAmount',
          'mocAmount',
          'imAmount',
          'mpuStringAmount',
          'responseCode',
          'accountNo',
          'hashValue',
          'paymentType',
          'id',
        ]}
        fetch={fetch}
        filterData={filterData}
      ></ReportTable>
    </>
  );
};

export default MPUReport;

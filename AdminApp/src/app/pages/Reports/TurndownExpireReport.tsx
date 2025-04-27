import React, { useReducer, useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import { format, parse } from 'date-fns';
import { Button, Card, Col, Input, Modal, Row, Space } from 'antd';
import { AnyObject } from 'src/Models/AnyObject';
import * as XLSX from 'xlsx';
import { ReportTable } from 'src/app/components/Table/ReportTable';

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

const TurndownBlockedList: React.FC = () => {
  const [filterData, dispatchFilterData] = useReducer(reducerFunction, {});

  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);
  const [reportData, setReportData] = useState([]);

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
          'Created Date': cells[2].innerText,
          'TurnDown Date': cells[3].innerText,
          'Blocked Date': cells[4].innerText,
          'Unblocked Date': cells[5].innerText,
          'Business Name': cells[6].innerText,
          'Business Name Myanmar': cells[7].innerText,
          'Company Reg No': cells[8].innerText,
          'Sme Reg No': cells[9].innerText,
          'Eir Reg No': cells[10].innerText,
          'Apply Type': cells[11].innerText,
      };
    });

    console.log('Data to export:', dataToExport);

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'Report.xlsx');
  };
  const fetchData = async () => {
    try {
      await fetch('BusinessRegistration/GetBlockedApplication');
      // Update the state variable to trigger re-render
      //setRefreshData(!refreshData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const normalizeData = (data: AnyObject[]) => {
    return data.map((item) => ({
      applicationNo: item.applicationNo || null,
      createdDate: item.createdDate || null,
      turnDownDate: item.turnDownDate || null,
      blockedDate: item.blockedDate || null,
      unblockedDate: item.unblockedDate || null,
      businessName: item.businessName || null,
      businessNameMyanmar: item.businessNameMyanmar || null,
      companyRegNo: item.companyRegNo || null,
      smeRegNo: item.smeRegNo || null,
      eirRegNo: item.eirRegNo || null,
      applyType: item.applyType || null
    }));
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
    try {
      const { fromDate, toDate } = filterData;
      let fullUrl = url;

      if (fromDate) {
        fullUrl += `&fromDate=${encodeURIComponent(
          new Date(fromDate).toISOString()
        )}`;
      }
      if (toDate) {
        fullUrl += `&toDate=${encodeURIComponent(
          new Date(toDate).toISOString()
        )}`;
      }

      const response = await axiosInstance.get(fullUrl);
      const responseData: PaginationType = JSON.parse(
        JSON.stringify(response.data)
      );

      console.log('Response Data:', responseData);
      responseData.data.forEach((data) => {
        data['createdDate'] = formatDate(data['createdDate']);
        data['turnDownDate'] = formatDate(data['turnDownDate']);
        data['blockedDate'] = formatDate(data['blockedDate']);
        data['unblockedDate'] = formatDate(data['unblockedDate']);
      });

      responseData.data = normalizeData(responseData.data);

      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
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
        key={refreshData ? 'refresh' : 'initial'} // Key prop to force re-render
        api={'BusinessRegistration/GetTurnDownBlockedDetailApplication'}
        displayData={[
          'applicationNo',
          'createdDate',
          'turnDownDate',
          'blockedDate',
          'unblockedDate',
          'businessName',
          'businessNameMyanmar',
          'companyRegNo',
          'smeRegNo',
          'eirRegNo',
          'applyType',
          'id',
        ]}
        fetch={fetch}
        filterData={filterData}
      ></ReportTable>
    </>
  );
};

export default TurndownBlockedList;

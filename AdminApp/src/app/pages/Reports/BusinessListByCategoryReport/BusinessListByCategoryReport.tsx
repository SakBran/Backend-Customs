import { useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { GetBusinessListByCategoryReportData } from './APIAction';
import * as XLSX from 'xlsx';
import BusinessListByCategoryReportDTO from './BusinessListByCategoryReportDTO';

export const BusinessListByCategoryReport = () => {
  const [dataList, setDataList] = useState<BusinessListByCategoryReportDTO[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = dataList.map((data, index) => ({
      No: index + 1,
      BusinessCategory: data.businessCategory,
      BusinessType: data.businessType,
      CompanyCount: data.companyCount,
      IndividualCount: data.individualCount,
      TotalCount: data.totalCount,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'Report.xlsx');
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    const APIAction = async () => {
      try {
        console.log('values log', values);
        const result = await GetBusinessListByCategoryReportData(
          values['startDate'],
          values['endDate']
        );

        if (result) {
          console.log('API result', result);
          const temp: BusinessListByCategoryReportDTO[] = JSON.parse(
            JSON.stringify(result)
          );
          console.log('Parsed result', temp);
          setDataList(temp);
          console.log('DataList state updated', temp);
          setLoading(false);
          setCurrentPage(1);
        }
      } catch (ex) {
        console.log('No Data');
        setDataList([]);
        setLoading(false);
      }
    };
    APIAction();
  };

  // Calculate pagination indexes
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dataList.slice(indexOfFirstRow, indexOfLastRow);
  console.log('Current rows', currentRows);

  const calculateRowNumber = (index: number) => {
    return (currentPage - 1) * rowsPerPage + index + 1;
  };

  return (
    <>
      <div>
        <Form
          name="dateRangeForm"
          onFinish={onFinish}
          layout="inline"
          style={{ marginBottom: '16px' }}
        >
          <Form.Item name="startDate" label="Issued From Date">
            <Input type="date" />
          </Form.Item>

          <Form.Item name="endDate" label="Issued To Date">
            <Input type="date" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            &nbsp;
            <Button type="primary" htmlType="button" onClick={exportToExcel}>
              Export To Excel
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Spin tip="Fetching from database..." spinning={loading}>
          <table id="reportTable" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Business Category</th>
                <th>Business Type</th>
                <th>Company Count</th>
                <th>Individual Count</th>
                <th>Total Count</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map(
                (data: BusinessListByCategoryReportDTO, index: number) => (
                  <tr key={index}>
                    <td>{calculateRowNumber(index)}</td>
                    <td>{data.businessCategory}</td>
                    <td>{data.businessType}</td>
                    <td>{data.companyCount}</td>
                    <td>{data.individualCount}</td>
                    <td>{data.companyCount+data.individualCount}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Spin>
      </div>
      {/* Pagination controls */}
      <div style={{ marginTop: '16px' }}>
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {Math.ceil(dataList.length / rowsPerPage)}
        </span>
        <Button
          disabled={indexOfLastRow >= dataList.length}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

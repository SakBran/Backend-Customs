import { useState } from 'react';
import { Button, Form, Select, Spin } from 'antd';
import { GetYearlyReportDTO } from './APIAction';
import * as XLSX from 'xlsx';
import YearlyReportDTO from './YearlyReportDTO';

const { Option } = Select;
export const ApplyIssuedReport = () => {
  const [dataList, setDataList] = useState<YearlyReportDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const exportToExcel = () => {
    const table = document.getElementById('reportTable');
    const wb = XLSX.utils.table_to_book(table, { sheet: 'SheetJS' });
    XLSX.writeFile(wb, 'Report.xlsx');
  };
  const onFinish = (values: any) => {
    setLoading(true);
    const APIAction = async () => {
      try {
        const result = await GetYearlyReportDTO(
          values['year'],
          values['applyType']
        );
        if (result) {
          console.log(result);
          const temp: YearlyReportDTO[] = JSON.parse(JSON.stringify(result));
          setDataList(temp);
          setLoading(false);
        }
      } catch (ex) {
        console.log('No Data');
        setDataList([]);
        setLoading(false);
      }
    };
    APIAction();
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
          <Form.Item name="year" label="Select Year">
            <Select style={{ width: 200 }}>
              <Option value={2023}>2023</Option>
              <Option value={2024}>2024</Option>
              <Option value={2025}>2025</Option>
              <Option value={2026}>2026</Option>
              <Option value={2027}>2027</Option>
              <Option value={2028}>2028</Option>
              <Option value={2029}>2029</Option>
            </Select>
          </Form.Item>

          <Form.Item name="applyType" label="ApplyType">
            <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              <option value={'New'}>New</option>
              <option value={'Amend'}>Amend</option>
              <option value={'Extension'}>Extension</option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            &nbsp;
            <Button
              type="primary"
              htmlType="button"
              onClick={() => exportToExcel()}
            >
              Export To Excel
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: '100%', justifyContent: 'center' }}>
        <Spin tip="Fetching from database..." spinning={loading}>
          <table
            id="reportTable"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <thead>
              <tr>
                <td rowSpan={2}>စဥ်</td>
                <td rowSpan={2}>Month</td>
                <td colSpan={2}>
                  <center>Company</center>
                </td>
                <td colSpan={2}>
                  <center>Individual</center>
                </td>
              </tr>
              <tr>
                <td>
                  <center>Apply</center>
                </td>
                <td>
                  <center>Issued</center>
                </td>
                <td>
                  <center>Apply</center>
                </td>
                <td>
                  <center>Issued</center>
                </td>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data: YearlyReportDTO, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {data.year} {data.month}
                  </td>

                  <td>{data.companyApplyCount}</td>
                  <td>{data.companyIssuedCount}</td>
                  <td>{data.individualApplyCount}</td>
                  <td>{data.individualIssuedCount}</td>
                </tr>
              ))}

              <tr>
                <td colSpan={2}>
                  <center>စုစုပေါင်း</center>
                </td>

                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companyApplyCount,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companyIssuedCount,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualApplyCount,
                    0
                  )}
                </td>

                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualIssuedCount,
                    0
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </Spin>
      </div>
    </>
  );
};

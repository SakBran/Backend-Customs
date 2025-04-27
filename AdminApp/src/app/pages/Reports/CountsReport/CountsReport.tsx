import { useState } from 'react';
import { Button, Form, Input, Select, Spin } from 'antd';
import { GetCountReportData } from './APIAction';
import * as XLSX from 'xlsx';
import CountsReportDTO from './CountsReportDTO';

export const CountsReport = () => {
  const [dataList, setDataList] = useState<CountsReportDTO[]>([]);
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
        const result = await GetCountReportData(
          values['startDate'],
          values['endDate'],
          values['applyType']
        );
        if (result) {
          console.log(result);
          const temp: CountsReportDTO[] = JSON.parse(JSON.stringify(result));
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
          <Form.Item name="startDate" label="Start Created Date">
            <Input type="date" />
          </Form.Item>

          <Form.Item name="endDate" label="End Created Date">
            <Input type="date" />
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
                <td>No</td>
                <td>Status</td>
                <td>Company</td>
                <td>Individual</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data: CountsReportDTO, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.status}</td>
                  <td>{data.company}</td>
                  <td>{data.individual}</td>
                  <td>{data.total}</td>
                </tr>
              ))}

              {/* <tr>
                <td colSpan={2}>
                  <center>စုစုပေါင်း</center>
                </td>

                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companyGoods,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companyService,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companyGoodsService,
                    0
                  )}
                </td>

                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualGoods,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualService,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualGoodService,
                    0
                  )}
                </td>

                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companySmeGoods,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companySmeService,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.companySmeGoodsService,
                    0
                  )}
                </td>

                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualSmeGoods,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualSmeService,
                    0
                  )}
                </td>
                <td>
                  {dataList?.reduce(
                    (acc, report) => acc + report.individualSmeGoodService,
                    0
                  )}
                </td>

                <td>
                  {dataList?.reduce((acc, report) => acc + report.total, 0)}
                </td>
              </tr> */}
            </tbody>
          </table>
        </Spin>
      </div>
    </>
  );
};

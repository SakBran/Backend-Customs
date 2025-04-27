import { useState } from 'react';
import { Button, Form, Input, Select, Spin } from 'antd';
import { GetStateReportData } from './APIAction';
import StateReportDTO from './StateReportDTO';
import * as XLSX from 'xlsx';
import './StateReportStyle.css';

export const StateReport = () => {
  const [dataList, setDataList] = useState<StateReportDTO[]>([]);
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
        const result = await GetStateReportData(
          values['startDate'],
          values['endDate'],
          values['applyType']
        );
        if (result) {
          console.log(result);
          const temp: StateReportDTO[] = JSON.parse(JSON.stringify(result));
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
          <Form.Item name="startDate" label="Start Issued Date">
            <Input type="date" />
          </Form.Item>

          <Form.Item name="endDate" label="End Issued Date">
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
          <div className="scrollable-container">
          <table
            id="reportTable"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <thead>
              <tr>
                <td rowSpan={3}>စဥ်</td>
                <td rowSpan={3}>တိုင်းဒေသကြီး/ပြည်နယ်</td>
                <td colSpan={16}>
                  <center>Certificate ထုတ်ပေးမှု စောင်ရေ</center>
                </td>
                <td rowSpan={3}>စုစုပေါင်း</td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <center>ကုမ္ပဏီများ</center>
                </td>
                <td colSpan={4}>
                  <center>Individual</center>
                </td>
                <td colSpan={4}>
                  <center>ကုမ္ပဏီများ (SME)</center>
                </td>
                <td colSpan={4}>
                  <center>Individual (SME)</center>
                </td>
              </tr>
              <tr>
                <td>ကုန်ပစ္စည်း</td>
                <td>ဝန်ဆောင်မှု</td>
                <td>ကုန်ပစ္စည်းနှင့်ဝန်ဆောင်မှု</td>
                <td>ကုမ္ပဏီစုစုပေါင်း</td>
                <td>ကုန်ပစ္စည်း</td>
                <td>ဝန်ဆောင်မှု</td>
                <td>ကုန်ပစ္စည်းနှင့်ဝန်ဆောင်မှု</td>
                <td>တစ်ဦးချင်းစုစုပေါင်း</td>
                <td>ကုန်ပစ္စည်း</td>
                <td>ဝန်ဆောင်မှု</td>
                <td>ကုန်ပစ္စည်းနှင့်ဝန်ဆောင်မှု</td>
                <td>SME ကုမ္ပဏီစုစုပေါင်း</td>
                <td>ကုန်ပစ္စည်း</td>
                <td>ဝန်ဆောင်မှု</td>
                <td>ကုန်ပစ္စည်းနှင့်ဝန်ဆောင်မှု</td>
                <td>SME တစ်ဦးချင်းစုစုပေါင်း</td>
              </tr>
            </thead>
            <tbody>
              {dataList.map((data: StateReportDTO, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.state}</td>

                  <td>{data.companyGoods}</td>
                  <td>{data.companyService}</td>
                  <td>{data.companyGoodsService}</td>
                  <td>{data.companyTotal}</td>

                  <td>{data.individualGoods}</td>
                  <td>{data.individualService}</td>
                  <td>{data.individualGoodService}</td>
                  <td>{data.individualTotal}</td>

                  <td>{data.companySmeGoods}</td>
                  <td>{data.companySmeService}</td>
                  <td>{data.companySmeGoodsService}</td>
                  <td>{data.smeCompanyTotal}</td>

                  <td>{data.individualSmeGoods}</td>
                  <td>{data.individualSmeService}</td>
                  <td>{data.individualSmeGoodService}</td>
                  <td>{data.smeIndividualTotal}</td>
                  <td>{data.total}</td>
                </tr>
              ))}

              <tr>
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
                    (acc, report) => acc + report.companyTotal,
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
                    (acc, report) => acc + report.individualTotal,
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
                    (acc, report) => acc + report.smeCompanyTotal,
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
                  {dataList?.reduce(
                    (acc, report) => acc + report.smeIndividualTotal,
                    0
                  )}
                </td>

                <td>
                  {dataList?.reduce((acc, report) => acc + report.total, 0)}
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </Spin>
      </div>
    </>
  );
};

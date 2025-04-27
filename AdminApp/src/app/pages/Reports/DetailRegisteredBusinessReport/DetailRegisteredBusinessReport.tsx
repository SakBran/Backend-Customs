import { useEffect, useRef, useState } from 'react';
import { Button, Form, FormInstance, Input, Select, Spin } from 'antd';
import { GetDetailRegisteredBusinessReportData } from './APIAction';
import * as XLSX from 'xlsx';
import DetailRegisteredBusinessReportDTO from './DetailRegisteredBusinessReportDTO';
import { OptionDTO } from 'src/Models/OptionDTO';
import region from 'src/app/services/MyanmarRegion';

export const DetailRegisteredBusinessReport = () => {
  const [dataList, setDataList] = useState<DetailRegisteredBusinessReportDTO[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const formRef = useRef<FormInstance>(null);
  const [city, setCity] = useState<OptionDTO[]>([]);
  const [township, setTownship] = useState<OptionDTO[]>([]);
  const [state, setStateRegion] = useState<OptionDTO[]>([]);

  useEffect(() => {
    const initialStateRegions = region.map((state) => ({
      id: state.eng,
      value: state.eng,
    }));
    setStateRegion(initialStateRegions);
  }, []);
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = dataList.map((data, index) => ({
      No: index + 1,
      'Business Name': data.businessName,
      BusinessOwnerName: data.businessOwnerName,
      NrcNo: data.nrcPrefix + '/' + data.nrcCode + '(N)' + data.nrcNo,
      'Website Url': data.websiteUrls,
      // 'Social Media Url': data.socialMediaUrls,
      // 'Mobile Application Url': data.mobileApplicationUrls,
      'Certificate No': data.certificateNo,
      IssuedDate: data.issuedDate ? formatDate(data.issuedDate) : '-',
      'Business Address':
        data.businessAddress +
        ',' +
        data.township +
        ',' +
        data.city +
        ',' +
        data.businessAddressState,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);

    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'Report.xlsx');
  };

  const handleSelectChangeStateRegion = async (e: string) => {
    const tempDTO: OptionDTO[] = [];
    region.forEach((x) => {
      if (x.eng === e) {
        x.districts.forEach((districts) => {
          tempDTO.push({
            id: districts.eng,
            value: districts.eng,
          });
        });
      }
    });

    setCity(tempDTO);
    formRef.current?.setFieldsValue({
      city: '',
      township: '',
    });
  };

  const handleSelectChangeCity = async (e: string) => {
    const tempDTO: OptionDTO[] = [];
    region.forEach((State) => {
      State.districts.forEach((districts) => {
        if (districts.eng === e) {
          districts.townships.forEach((townships) => {
            tempDTO.push({
              id: townships.eng,
              value: townships.eng,
            });
          });
        }
      });
    });

    setTownship(tempDTO);
    formRef.current?.setFieldsValue({
      township: '',
    });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const onFinish = (values: any) => {
    setLoading(true);
    const APIAction = async () => {
      try {
        console.log('values log', values);
        const result = await GetDetailRegisteredBusinessReportData(
          values['startDate'],
          values['endDate'],
          values['state'],
          values['city'],
          values['township'],
          values['certificateNo'],
          values['businessType'],
          values['ecommerceType'],
          values['applyType']
        );
        if (result) {
          console.log(result);
          const temp: DetailRegisteredBusinessReportDTO[] = JSON.parse(
            JSON.stringify(result)
          );
          setDataList(temp);
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
            {/*<Input type="datetime-local" />*/}
            <Input type="date" />
          </Form.Item>

          <Form.Item name="endDate" label="Issued To Date">
            {/*<Input type="datetime-local" />*/}
            <Input type="date" />
          </Form.Item>
          <Form.Item noStyle name="state" label="state">
            {/* <Form.Item name="state" label="BusinessAddressState"> */}
            {/* <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              <option value={'Ayeyawady Region'}>Ayeyawady Region</option>
              <option value={'Bago Region'}>Bago Region</option>
              <option value={'Chin State'}>Chin State</option>
              <option value={'Chin State'}>Chin State</option>
              <option value={'Kachin State'}>Kachin State</option>
              <option value={'Kayah State'}>Kayah State</option>
              <option value={'Kayin State'}>Kayin State</option>
              <option value={'Magway Region'}>Magway Region</option>
              <option value={'Mandalay Region'}>Mandalay Region</option>
              <option value={'Mon State'}>Mon State</option>
              <option value={'Nay Pyi Taw'}>Nay Pyi Taw</option>
              <option value={'Rakhine State'}>Rakhine State</option>
              <option value={'Sagaing Region'}>Sagaing Region</option>
              <option value={'Rakhine State'}>Rakhine State</option>
              <option value={'Sagaing Region'}>Sagaing Region</option>
              <option value={'Shan State'}>Shan State</option>
              <option value={'Taninthayi Region'}>Taninthayi Region</option>
              <option value={'Yangon Region'}>Yangon Region</option>
            </Select> */}
            <Select
              onChange={handleSelectChangeStateRegion}
              placeholder="Select State/Region"
            >
              {state.map((item: OptionDTO, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {item.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item name="city" style={{ marginBottom: '16px' }}>
            <Select
              onChange={handleSelectChangeCity}
              placeholder="Select City"
              style={{ width: 200 }}
            >
              {city.map((item: OptionDTO, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {item.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <br />
          <br />
          <Form.Item name="township">
            <Select placeholder="Select Township" style={{ width: 200 }}>
              {township.map((item: OptionDTO, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {item.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* 
          <Form.Item name="city" label="City">
            <Input type="input" />
          </Form.Item> */}

          <Form.Item name="certificateNo" label="CertificateNo">
            <Input type="input" />
          </Form.Item>

          <Form.Item name="businessType" label="BusinessType">
            <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              <option value={'Goods'}>Goods</option>
              <option value={'Service'}>Service</option>
              <option value={'Goods and Service'}>Goods and Service</option>
            </Select>
          </Form.Item>

          <Form.Item name="applyType" label="ApplyType">
            <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              <option value={'New'}>New</option>
              <option value={'Extension'}>Extension</option>
              <option value={'Amend'}>Amend</option>
            </Select>
          </Form.Item>

          <Form.Item name="ecommerceType" label="EcommerceType">
            <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              <option value={'["B2B"]'}>B2B</option>
              <option value={'["B2C"]'}>B2C</option>
              <option value={'["C2C"]'}>C2C</option>
              <option value={'["B2B","B2C"]'}>B2B, B2C</option>
              <option value={'["B2B","C2C"]'}>B2B, C2C</option>
              <option value={'["B2B","B2C","C2C"]'}>B2B, B2C, C2C</option>
              <option value={'["B2B","C2C","B2C"]'}>B2B, C2C, B2C</option>
              <option value={'["B2C","B2B"]'}>B2C, B2B</option>
              <option value={'["B2C","C2C"]'}>B2C, C2C</option>
              <option value={'["B2C","B2B","C2C"]'}>B2C, B2B, C2C</option>
              <option value={'["B2C","C2C","B2B"]'}>B2C, C2C, B2B</option>
              <option value={'["C2C","B2B"]'}>C2C, B2B</option>
              <option value={'["C2C","B2C"]'}>C2C, B2C</option>
              <option value={'["C2C","B2B","B2C"]'}>C2C, B2B, B2C</option>
              <option value={'["C2C","B2C","B2B"]'}>C2C, B2C, B2B</option>
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
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <Spin tip="Fetching from database..." spinning={loading}>
          <table id="reportTable" style={{ width: '100%' }}>
            <thead>
              <tr>
                <td>No</td>
                <td>Business Name</td>
                <td>CompanyReg No</td>
                <td>EirReg No</td>
                <td>SMEReg No</td>
                <td>BusinessType</td>
                <td>BusinessCategory</td>
                <td>EcommerceType</td>
                <td>ContactPersonName</td>
                <td>ContactPersonEmail</td>
                <td>ContactPersonPhone</td>
                <td>EmployeeNumber</td>
                <td>PaymentMethod</td>
                <td>DeliveryMethod</td>
                {/* <td>CompanyReg No</td>
                <td>EirReg No</td>
                <td>SMEReg No</td>
                <td>BusinessType</td>
                <td>BusinessCategory</td>
                <td>EcommerceType</td>
                <td>ContactPersonName</td>
                <td>ContactPersonEmail</td>
                <td>ContactPersonPhone</td>
                <td>EmployeeNumber</td>
                <td>PaymentMethod</td>
                <td>DeliveryMethod</td> */}
                <td>Business Owner Name & NRC No</td>
                <td>Businesss Owner Passport No</td>
                {/* <td>Businesss Owner Passport No</td> */}
                <td>Website Urls</td>
                {/* <td>Social Media Url</td>
                <td>Mobile Application Url</td> */}
                <td>Certificate No & Issued Date</td>
                <td>Business Address</td>
                <td>Business Owner Address</td>
                <td>Permanant Address</td>
                {/* <td>Business Owner Address</td>
                <td>Permanant Address</td> */}
              </tr>
            </thead>
            <tbody>
              {currentRows.map(
                (data: DetailRegisteredBusinessReportDTO, index: number) => (
                  <tr key={index}>
                    <td>{calculateRowNumber(index)}</td>
                    <td>{data.businessName}</td>
                    <td>{data.companyRegNo}</td>
                    <td>{data.eirRegNo}</td>
                    <td>{data.smeRegNo}</td>
                    <td>{data.businessType}</td>
                    <td>{data.businessCategory}</td>
                    <td>{data.ecommerceType}</td>
                    <td>{data.contactPersonName}</td>
                    <td>{data.contactPersonEmail}</td>
                    <td>{data.contactPersonPhone}</td>
                    <td>{data.employeeNumber}</td>
                    <td>{data.paymentMethod}</td>
                    <td>{data.deliveryMethod}</td>
                    {/* <td>{data.companyRegNo}</td>
                    <td>{data.eirRegNo}</td>
                    <td>{data.smeRegNo}</td>
                    <td>{data.businessType}</td>
                    <td>{data.businessCategory}</td>
                    <td>{data.ecommerceType}</td>
                    <td>{data.contactPersonName}</td>
                    <td>{data.contactPersonEmail}</td>
                    <td>{data.contactPersonPhone}</td>
                    <td>{data.employeeNumber}</td>
                    <td>{data.paymentMethod}</td>
                    <td>{data.deliveryMethod}</td> */}
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {data.businessOwnerName} <br />
                      {data.nrcCode + '/' + data.nrcPrefix + '(N)' + data.nrcNo}
                      {data.nrcCode + '/' + data.nrcPrefix + '(N)' + data.nrcNo}
                    </td>
                    <td>{data.passportNo}</td>
                    {/* <td>{data.passportNo}</td> */}
                    <td>
                      {data.websiteUrls} <br />
                      {data.socialMediaUrls} <br />
                      {data.mobileApplicationUrls}
                    </td>
                    {/* <td>{data.socialMediaUrls}</td>
                    <td>{data.mobileApplicationUrls}</td> */}
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {data.certificateNo} <br />{' '}
                      {data.issuedDate ? formatDate(data.issuedDate) : '-'}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {data.businessAddress} <br />
                      {data.township} <br />
                      {data.city} <br />
                      {data.businessAddressState}
                    </td>
                    <td>{data.businessOwnerAddress}</td>
                    <td>{data.permanantAddress}</td>
                    {/* <td>{data.businessOwnerAddress}</td>
                    <td>{data.permanantAddress}</td> */}
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
          onClick={() => handlePageChange(1)}
        >
          First Page
        </Button>
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
        <Button
          disabled={indexOfLastRow >= dataList.length}
          onClick={() =>
            handlePageChange(Math.ceil(dataList.length / rowsPerPage))
          }
        >
          Last Page
        </Button>
      </div>
    </>
  );
};

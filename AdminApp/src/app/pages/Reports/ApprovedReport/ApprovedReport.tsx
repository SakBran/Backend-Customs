import { useEffect, useRef, useState } from 'react';
import { Button, Form, FormInstance, Input, Select, Spin } from 'antd';
import { GetApprovedReportData } from './APIAction';
import * as XLSX from 'xlsx';
import AdvanceSearchReportDTO from './ApprovedReportDTO';
import FormItem from 'antd/es/form/FormItem';
import { OptionDTO } from 'src/Models/OptionDTO';
import region from 'src/app/services/MyanmarRegion';
import ApprovedReportDTO from './ApprovedReportDTO';




export const ApprovedReport = () => {
  const [dataList, setDataList] = useState<ApprovedReportDTO[]>([]);
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
      'Member Name': data.memberName,
      'Application No': data.applicationNo,
      'Business Name': data.businessName,
      'Business Name Myanmar': data.businessNameMyanmar,
      'Business Address State': data.businessAddressState,
      'Certificate No': data.certificateNo,
      'Business Type': data.businessType,
      'Business Category': data.businessCategory,
      'Company Or Individual Type': data.companyOrIndividualType,
      Status: data.status,
      'User Ref': data.userRef1,
      'Created Date': data.createdDate ? formatDate(data.createdDate) : '-',
      'Approved Date': data.approvedDate ? formatDate(data.approvedDate) : '-',
      'Issued Date': data.issuedDate ? formatDate(data.issuedDate) : '-',
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onFinish = (values: any) => {
    setLoading(true);
    const APIAction = async () => {
      try {
        console.log('values log', values);
        const result = await GetApprovedReportData(
          values['startDate'],
          values['endDate'],
          values['applyType'],
          values['businessType'],
          values['status'],
          values['state'],
          values['city'],
          values['township']
        );
        if (result) {
          console.log(result);
          const temp: ApprovedReportDTO[] = JSON.parse(
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
          <Form.Item name="startDate" label="Created From Date">
            <Input type="date" />
          </Form.Item>

          <Form.Item name="endDate" label="Created To Date">
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

          <Form.Item name="businessType" label="BusinessType">
            <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              <option value={'Goods'}>Goods</option>
              <option value={'Service'}>Service</option>
              <option value={'Goods and Service'}>Goods and Service</option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              {/*<option value={'NULL'}>Draft</option>*/}
              <option value={'Approved'}>Approved</option>
              <option value={'Payment Block'}>Approve Expired</option>
              <option value={'Payment Ready'}>Payment Ready</option>
              <option value={'Pending'}>Pending</option>
              <option value={'Turndown'}>Turndown</option>
              <option value={'Reject'}>Reject</option>
              <option value={'Suspensed'}>Suspension</option>
              <option value={'Turn Down Block'}>Turndown Expired</option>
              <option value={'PaymentAutoCancel'}>PaymentAutoCancel</option>
            </Select>
          </Form.Item>
{/* 
          <Form.Item name="state" label="BusinessAddressState">
            <Select style={{ width: 200 }}>
              <option value={'All'}>All</option>
              <option value={'Ayeyawady Region'}>Ayeyawady Region</option>
              <option value={'Bago Region'}>Bago Region</option>
              <option value={'Kachin State'}>Kachin State</option>
              <option value={'Kayah State'}>Kayah State</option>
              <option value={'Kayin State'}>Kayin State</option>
              <option value={'Magway Region'}>Magway Region</option>
              <option value={'Mandalay Region'}>Mandalay Region</option>
              <option value={'Mon State'}>Mon State</option>
              <option value={'Nay Pyi Taw'}>Nay Pyi Taw</option>
              <option value={'Shan State'}>Shan State</option>
              <option value={'Taninthayi Region'}>Taninthayi Region</option>
              <option value={'Yangon Region'}>Yangon Region</option>
            </Select>
          </Form.Item> */}
           <Form.Item
            noStyle
            name="state"
            label="state"
          
          >
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
         
          <Form.Item
           
            name="city"
            style={{ marginBottom: '16px' }}
          >
            <Select onChange={handleSelectChangeCity} placeholder="Select City"  style={{ width: 200 }}>
              {city.map((item: OptionDTO, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {item.value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <br/><br/>
          <Form.Item
            
            name="township"
            
          >
            <Select placeholder="Select Township"  style={{ width: 200 }}>
              {township.map((item: OptionDTO, index) => {
                return (
                  <Select.Option key={index} value={item.value}>
                    {item.value}
                  </Select.Option>
                );
              })}
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
                <td>Member Name</td>
                <td>ApplicationNo</td>
                <td>Business Name</td>
                <td>Business Name Myanmar</td>
                <td>Business Address State</td>
                <td>Certificate No</td>
                <td>Business Type</td>
                <td>Business Category</td>
                <td>Company Or Individual Type</td>
                <td>Status</td>
                <td>User Ref</td>
                <td>Created Date</td>
                <td>Approved Date</td>
                <td>Issued Date</td>
              </tr>
            </thead>
            <tbody>
              {currentRows.map(
                (data: ApprovedReportDTO, index: number) => (
                  <tr key={index}>
                    <td>{calculateRowNumber(index)}</td>
                    <td>{data.memberName}</td>
                    <td>{data.applicationNo}</td>
                    <td>{data.businessName}</td>
                    <td>{data.businessNameMyanmar}</td>
                    {/* <td>{data.businessAddressState}</td> */}
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {data.businessAddress} <br />
                      {data.township} <br />
                      {data.city} <br />
                      {data.businessAddressState}
                    </td>
                    <td>{data.certificateNo}</td>
                    <td>{data.businessType}</td>
                    <td>{data.businessCategory}</td>
                    <td>{data.companyOrIndividualType}</td>
                    <td>{data.status}</td>
                    <td>{data.userRef1}</td>
                    <td>
                      {data.createdDate ? formatDate(data.createdDate) : '-'}
                    </td>
                    <td>
                      {data.approvedDate ? formatDate(data.approvedDate) : '-'}
                    </td>
                    <td>
                      {data.issuedDate ? formatDate(data.issuedDate) : '-'}
                    </td>
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

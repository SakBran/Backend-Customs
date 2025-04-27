// import { Button, Form, FormInstance, Input, Select, Spin } from "antd";
// import { set } from "date-fns";
// import { useEffect, useRef, useState } from "react";
// import axiosInstance from "src/app/services/AxiosInstance";
// import region from "src/app/services/MyanmarRegion";
// import { OptionDTO } from "src/Models/OptionDTO";
// import * as XLSX from 'xlsx';

// interface DOCCAReportDTO {
//   applicationNo: string;
//   businessName: string;
//   businessNameMyanmar: string;
//   businessAddress: string;
//   status: string;
//   doccaSendDate: string;
//   groundCheckingCompleteDate: string;
//   doccaAcceptDate: string;
//   doccaPassDate: string;
//   approveDate: string;
// }

// interface PayloadType {
//   pageIndex: number;
//   pageSize: number;
//   startDate: string | null;
//   endDate: string | null;
//   type: string | null;
//   status: string | null;
//   state: string | null;
//   city: string | null;
//   township: string | null;
//   [key: string]: string | number | null;
// }

// export const DOCCAReport = () => {
//   const [dataList, setDataList] = useState<DOCCAReportDTO[]>([]);
//   const [loading, setloading] = useState<boolean>(false);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [rowsPerPage, setRowsPerPage] = useState<number>(10);
//   const formRef = useRef<FormInstance>(null);
//   const [city, setCity] = useState<OptionDTO[]>([]);
//   const [township, setTownship] = useState<OptionDTO[]>([]);
//   const [state, setStateRegion] = useState<OptionDTO[]>([]);

//   // add total count state
//   const [totalCount, setTotalCount] = useState<number>(0);

//   useEffect(() => {
//     const initialStateRegions = region.map((state) => ({
//       id: state.eng,
//       value: state.eng,
//     }));
//     const sortedInitialStateRegions = initialStateRegions.sort((a, b) => a.value.localeCompare(b.value));
//     setStateRegion(sortedInitialStateRegions);
//   }, []);

//   const handleSelectChangeStateRegion = (e: string) => {
//     const tempDTO : OptionDTO[] = [];
//     region.forEach((x) => {
//       if (x.eng === e) {
//         x.districts.forEach((distracts) => {
//           tempDTO.push({
//             id: distracts.eng,
//             value: distracts.eng,
//           });
//         });
//       }
//     });
//     const sortedRegion =tempDTO.sort((a, b)=> a.value.localeCompare(b.value));
//     setCity(sortedRegion);
//     formRef.current?.setFieldsValue({
//       city: '',
//       township: '',
//     });
//   };

//   const handleSelectChangeCity = (e: string) => {
//     const tempDTO: OptionDTO[] = [];
//     region.forEach((State) => {
//       State.districts.forEach((districts) => {
//         if (districts.eng === e) {
//           districts.townships.forEach((townships) => {
//             tempDTO.push({
//               id: townships.eng,
//               value: townships.eng,
//             });
//           });
//         }
//       });
//     });
//     const sortedTownship=tempDTO.sort((a, b) => a.value.localeCompare(b.value));
//     setTownship(sortedTownship);
//     formRef.current?.setFieldsValue({
//       township: '',
//     });
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return '-';

//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const onFinish = async (values: any) => {
//     setloading(true);
//     console.log('Form values: ', values);
//     try {

//       const payload : PayloadType = {
//         pageIndex: currentPage - 1,
//         pageSize: rowsPerPage,
//         startDate: values.fromDate || null,
//         endDate: values.toDate || null,
//         type: values.type || null,
//         status: values.status || null,
//         state: values.state || null,
//         city: values.city || null,
//         township: values.township || null,
//       };

//       // remove empty / null values from payload
//       Object.keys(payload).forEach(key => {
//         if(!payload[key] && payload[key] !== 0) {
//           delete payload[key];
//         }
//       })

//       console.log('Payload:', payload);
//       const response = await axiosInstance.post('DOCCA/DOCCAReport', payload);
//       setDataList(response.data.data);
//       setTotalCount(response.data.totalCount);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setDataList([]);
//     } finally {
//       setloading(false);
//     }
//   };

//   // const indexOfLastRow = currentPage * rowsPerPage;
//   // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   // const currentRows = dataList.slice(indexOfFirstRow, indexOfLastRow)
//   // const calculateRowNumber = (index: number) => {
//   //   return (currentPage - 1) * rowsPerPage + index + 1;
//   // };

//   // const handlePageChange = (page: number) => {
//   //   setCurrentPage(page);
//   // };

//   const handlePageChange =async (page: number) => {
//     setCurrentPage(page);
//     setloading(true);
//     try {
//       const payload: PayloadType = {
//         pageIndex: page - 1,
//         pageSize: rowsPerPage,
//         startDate: formRef.current?.getFieldValue('fromDate') || null,
//         endDate: formRef.current?.getFieldValue('toDate') || null,
//         type: formRef.current?.getFieldValue('type') || null,
//         status: formRef.current?.getFieldValue('status') || null,
//         state: formRef.current?.getFieldValue('state') || null,
//         city: formRef.current?.getFieldValue('city') || null,
//         township: formRef.current?.getFieldValue('township') || null,
//       };

//       Object.keys(payload).forEach(key => {
//         if (!payload[key] && payload[key] !== 0) {
//           delete payload[key];
//         }
//       });

//       console.log('Payload:', payload);
//       const response = await axiosInstance.post('DOCCA/DOCCAReport', payload);
//       setDataList(response.data.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setDataList([]);
//     } finally {
//       setloading(false);
//     }
//   };

//   // const indexOfLastRow = currentPage * rowsPerPage;
//   // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   // const currentRows = dataList.slice(indexOfFirstRow, indexOfLastRow);

//   const exportToExcel = () => {
//     const wb = XLSX.utils.book_new();
//     const wsData = dataList.map((data, index) => ({
//       No: index + 1,
//       'Application No': data.applicationNo,
//       'Business Name': data.businessName,
//       'Business Name Myanmar': data.businessNameMyanmar,
//       'Business Address': data.businessAddress,
//       'Status': data.status,
//       'DOCCA Send Date': data.doccaSendDate ? formatDate(data.doccaSendDate) : '-',
//       'Ground Checking Date': data.groundCheckingCompleteDate ? formatDate(data.groundCheckingCompleteDate) : '-',
//       'DOCCA Accept Date': data.doccaAcceptDate ? formatDate(data.doccaAcceptDate) : '-',
//       'DOCCA Pass Date': data.doccaPassDate ? formatDate(data.doccaPassDate) : '-',
//       'Approve Date': data.approveDate ? formatDate(data.approveDate) : '-',
//     }));

//     const ws = XLSX.utils.json_to_sheet(wsData);
//     XLSX.utils.book_append_sheet(wb, ws, 'DOCCA Report');
//     XLSX.writeFile(wb, 'DOCCA_Report.xlsx');
//   };

//   // useEffect(() => {
//   //   const fetchInitialData = async () => {
//   //     setloading(true);
//   //     try {
//   //       const payload = {
//   //         pageIndex: currentPage - 1,
//   //         pageSize: rowsPerPage
//   //       };
        
//   //       const response = await axiosInstance.post('DOCCA/DOCCAReport', payload);
//   //       setDataList(response.data.data);
//   //       setTotalCount(response.data.totalCount); // added
//   //     } catch (error) {
//   //       console.error('Error fetching initial data:', error);
//   //       setDataList([]);
//   //     } finally {
//   //       setloading(false);
//   //     }
//   //   };
  
//   //   fetchInitialData();
//   // }, [currentPage, rowsPerPage]); // Empty dependency array means this runs once on mount

//   const calculateRowNumber = (index: number) => {
//     return (currentPage - 1 ) * rowsPerPage + index + 1;
//   }

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = dataList.slice(indexOfFirstRow, indexOfLastRow);
  

//   return (
//     <>
//       <div>
//         <Form
//           ref={formRef}
//           name="doccaReportForm"
//           onFinish={onFinish}
//           layout="inline"
//           style={{ marginBottom: '16px' }}
//         >
//           <Form.Item name="fromDate" label="Doca Send From Date">
//             <Input type="date" />
//           </Form.Item>

//           <Form.Item name="toDate" label="Doca Send To Date">
//             <Input type="date" />
//           </Form.Item>

//           <Form.Item name="type" label="Apply Type">
//             <Select style={{ width: 200 }}>
//               <Select.Option value="">-- Select Apply Type --</Select.Option>
//               <Select.Option value="New">New</Select.Option>
//               <Select.Option value="Extension">Extension</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item name="status" label="DOCCA Status">
//             <Select style={{ width: 200 }}>
//             <Select.Option value="">-- Select Doca Status --</Select.Option>
//               <Select.Option value="Approve">Approve</Select.Option>
//               <Select.Option value="Rejected">Reject</Select.Option>
//               <Select.Option value="Pending">Pending</Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item name="state">
//             <Select
//               onChange={handleSelectChangeStateRegion}
//               placeholder="Select State/Region"
//               style={{ width: 200 }}
//             >
//               <Select.Option value="">-- Select State/Region --</Select.Option>
//               {state.map((item: OptionDTO, index) => (
//                 <Select.Option key={index} value={item.value}>
//                   {item.value}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="city">
//             <Select
//               onChange={handleSelectChangeCity}
//               placeholder="Select City"
//               style={{ width: 200 }}
//             >
//               <Select.Option value="">-- Select City --</Select.Option>
//               {city.map((item: OptionDTO, index) => (
//                 <Select.Option key={index} value={item.value}>
//                   {item.value}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item name="township">
//             <Select
//               placeholder="Select Township"
//               style={{ width: 200 }}
//             >
//               <Select.Option value="">-- Select TownShip --</Select.Option>
//               {township.map((item: OptionDTO, index) => (
//                 <Select.Option key={index} value={item.value}>
//                   {item.value}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <div style={{display: 'flex', gap: '8px'}}>
//               <Button type="primary" htmlType="submit">Search</Button>
//               <Button type="primary" onClick={exportToExcel}>Export To Excel</Button>
//             </div>
//           </Form.Item>
//         </Form>
//       </div>

//       <Spin spinning={loading}>
//         <table style={{ width: '100%' }}>
//           <thead>
//             <tr>
//               <th>No</th>
//               <th>Application No</th>
//               <th>Business Name</th>
//               <th>Business Name Myanmar</th>
//               <th>Business Address</th>
//               <th>Status</th>
//               <th>DOCCA Send Date</th>
//               <th>Ground Checking Date</th>
//               <th>DOCCA Accept Date</th>
//               <th>DOCCA Pass Date</th>
//               <th>Approve Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.map((data, index) => (
//               <tr key={index}>
//                 <td>{calculateRowNumber(index)}</td>
//                 <td>{data.applicationNo}</td>
//                 <td>{data.businessName}</td>
//                 <td>{data.businessNameMyanmar}</td>
//                 <td>{data.businessAddress}</td>
//                 <td>{data.status}</td>
//                 <td>{data.doccaSendDate ? formatDate(data.doccaSendDate) : '-'}</td>
//                 <td>{data.groundCheckingCompleteDate ? formatDate(data.groundCheckingCompleteDate) : '-'}</td>
//                 <td>{data.doccaAcceptDate ? formatDate(data.doccaAcceptDate) : '-'}</td>
//                 <td>{data.doccaPassDate ? formatDate(data.doccaPassDate) : '-'}</td>
//                 <td>{data.approveDate ? formatDate(data.approveDate) : '_'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Spin>

//       <div style={{ marginTop: '16px' }}>
//         <Button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(1)}
//         >
//           First
//         </Button>
//         <Button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//         >
//           Previous
//         </Button>
//         {/* <span style={{ margin: '0 10px' }}>
//           Page {currentPage} of {Math.ceil(dataList.length / rowsPerPage)}
//         </span> */}
//         {/* <Button
//           disabled={indexOfLastRow >= dataList.length}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           Next
//         </Button>
//         <Button
//           disabled={indexOfLastRow >= dataList.length}
//           onClick={() => handlePageChange(Math.ceil(dataList.length / rowsPerPage))}
//         >
//           Last
//         </Button> */}
//         <span style={{ margin: '0 10px' }}>
//           Page {currentPage} of {Math.ceil(totalCount / rowsPerPage)}
//         </span>
//         <Button
//           disabled={currentPage === Math.ceil(totalCount / rowsPerPage)}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           Next
//         </Button>
//         <Button
//           disabled={currentPage === Math.ceil(totalCount / rowsPerPage)}
//           onClick={() => handlePageChange(Math.ceil(dataList.length / rowsPerPage))}
//         >
//           Last
//         </Button>
//       </div>
//     </>
//   )
// }

//=================================

import { Button, Form, FormInstance, Input, Select, Spin } from "antd";
import { useRef, useState } from "react";
import axiosInstance from "src/app/services/AxiosInstance";
import region from "src/app/services/MyanmarRegion";
import { OptionDTO } from "src/Models/OptionDTO";
import * as XLSX from 'xlsx';

interface DOCCAReportDTO {
  applicationNo: string;
  businessName: string;
  businessNameMyanmar: string;
  businessAddress: string;
  status: string;
  doccaSendDate: string;
  groundCheckingCompleteDate: string;
  doccaAcceptDate: string;
  doccaPassDate: string;
  approveDate: string;
  createdDate: string;
  approveRemark: string;
}

interface PayloadType {
  pageIndex: number;
  pageSize: number;
  startDate: string | null;
  endDate: string | null;
  type: string | null;
  status: string | null;
  state: string | null;
  city: string | null;
  township: string | null;
  [key: string]: string | number | null;
}

export const DOCCAReport = () => {
  const [dataList, setDataList] = useState<DOCCAReportDTO[]>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const formRef = useRef<FormInstance>(null);
  const [city, setCity] = useState<OptionDTO[]>([]);
  const [township, setTownship] = useState<OptionDTO[]>([]);

  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [state, setStateRegion] = useState<OptionDTO[]>(
    region.map((state) => ({
      id: state.eng,
      value: state.eng,
    })).sort((a, b) => a.value.localeCompare(b.value))
  );
  const [totalCount, setTotalCount] = useState<number>(0);

  const handleSelectChangeStateRegion = (e: string) => {
    const tempDTO = region
      .find(x => x.eng === e)?.districts
      .map(district => ({
        id: district.eng,
        value: district.eng,
      }))
      .sort((a, b) => a.value.localeCompare(b.value)) || [];

    setCity(tempDTO);
    formRef.current?.setFieldsValue({
      city: '',
      township: '',
    });
  };

  const handleSelectChangeCity = (e: string) => {
    const tempDTO = region
      .flatMap(state => 
        state.districts
          .filter(district => district.eng === e)
          .flatMap(district => 
            district.townships.map(township => ({
              id: township.eng,
              value: township.eng,
            }))
          )
      )
      .sort((a, b) => a.value.localeCompare(b.value));

    setTownship(tempDTO);
    formRef.current?.setFieldsValue({
      township: '',
    });
  };

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   if (isNaN(date.getTime())) return '-';
  //   return date.toLocaleDateString('en-GB');
  // };
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
  
    const pad = (num: number) => String(num).padStart(2, '0');
  
    return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };
  
  const fetchData = async (values: any, page: number = currentPage, pageSize: number = rowsPerPage) => {
    setloading(true);
    try {
      const payload: PayloadType = {
        pageIndex: page - 1,
        // pageSize: rowsPerPage,
        pageSize: pageSize,
        startDate: values.fromDate || null,
        endDate: values.toDate || null,
        type: values.type || null,
        status: values.status || null,
        state: values.state || null,
        city: values.city || null,
        township: values.township || null,
      };

      Object.keys(payload).forEach(key => {
        if (!payload[key] && payload[key] !== 0) {
          delete payload[key];
        }
      });

      const response = await axiosInstance.post('DOCCA/DOCCAReport', payload);
      setDataList(response.data.data);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDataList([]);
      setTotalCount(0);
    } finally {
      setloading(false);
    }
  };

  const onFinish = async (values: any) => {
    setCurrentPage(1);
    await fetchData(values, 1);
    setHasSearched(true);
  };
 
  const handlePageSizeChange = async(size: number) => {
    setRowsPerPage(size);
    setCurrentPage(1);
    const currentValues = formRef.current?.getFieldsValue();
    await fetchData(currentValues, 1, size);
  }

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const currentValues = formRef.current?.getFieldsValue();
    await fetchData(currentValues, page);
  };

  // const exportToExcel = () => {
  //   const wsData = dataList.map((data, index) => ({
  //     No: index + 1,
  //     'Application No': data.applicationNo,
  //     'Created Date': formatDate(data.createdDate),
  //     'Business Name': data.businessName,
  //     'Business Name Myanmar': data.businessNameMyanmar,
  //     'Business Address': data.businessAddress,
  //     'Status': data.status,
  //     'DOCCA Send Date': formatDate(data.doccaSendDate),
  //     'Ground Checking Date': formatDate(data.groundCheckingCompleteDate),
  //     'DOCCA Accept Date': formatDate(data.doccaAcceptDate),
  //     'DOCCA Pass Date': formatDate(data.doccaPassDate),
  //     'Approve Date': formatDate(data.approveDate),
  //   }));

  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.json_to_sheet(wsData);
  //   XLSX.utils.book_append_sheet(wb, ws, 'DOCCA Report');
  //   XLSX.writeFile(wb, 'DOCCA_Report.xlsx');
  // };
  const exportToExcel = async () => {
    setloading(true);
    try {
      const currentValues = formRef.current?.getFieldsValue();
      
      // Fetch all filtered data (without pagination)
      const payload: PayloadType = {
        pageIndex: 0, // Fetch from the first page
        pageSize: totalCount, // Get all records
        startDate: currentValues.fromDate || null,
        endDate: currentValues.toDate || null,
        type: currentValues.type || null,
        status: currentValues.status || null,
        state: currentValues.state || null,
        city: currentValues.city || null,
        township: currentValues.township || null,
      };
  
      // Remove empty keys from the payload
      Object.keys(payload).forEach(key => {
        if (!payload[key] && payload[key] !== 0) {
          delete payload[key];
        }
      });
  
      const response = await axiosInstance.post('DOCCA/DOCCAReport', payload);
      const fullDataList = response.data.data;
  
      if (!fullDataList || fullDataList.length === 0) {
        console.warn('No data available for export');
        setloading(false);
        return;
      }
  
      // Format data for Excel
      const wsData = fullDataList.map((data: DOCCAReportDTO, index: number) => ({
        No: index + 1,
        'Application No': data.applicationNo,
        'Created Date': formatDate(data.createdDate),
        'Business Name': data.businessName,
        'Business Name Myanmar': data.businessNameMyanmar,
        'Business Address': data.businessAddress,
        'Status': data.status,
        'DOCCA Send Date': formatDate(data.doccaSendDate),
        'Ground Checking Date': formatDate(data.groundCheckingCompleteDate),
        'DOCCA Accept Date': formatDate(data.doccaAcceptDate),
        'DOCCA Pass Date': formatDate(data.doccaPassDate),
        'Approve Date': formatDate(data.approveDate),
        'State Admin Remark': data.approveRemark,
      }));
  
      // Generate Excel file
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'DOCCA Report');
      XLSX.writeFile(wb, 'DOCCA_Report.xlsx');
  
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setloading(false);
    }
  };
  
  return (
    <>
      <div>
        <Form
          ref={formRef}
          name="doccaReportForm"
          onFinish={onFinish}
          layout="inline"
          style={{ marginBottom: '16px' }}
        >
          
          <Form.Item name="fromDate" label="Doca Send From Date">
            <Input type="date" />
          </Form.Item>

          <Form.Item name="toDate" label="Doca Send To Date">
            <Input type="date" />
          </Form.Item>

          <Form.Item name="state">
            <Select
              onChange={handleSelectChangeStateRegion}
              placeholder="Select State/Region"
              style={{ width: 200 }}
            >
              <Select.Option value="" style={{ color: 'gray' }}>-- Select State/Region --</Select.Option>
              {state.map((item: OptionDTO, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="city">
            <Select
              onChange={handleSelectChangeCity}
              placeholder="Select City"
              style={{ width: 200 }}
            >
              <Select.Option value="" style={{ color: 'gray' }}>-- Select City --</Select.Option>
              {city.map((item: OptionDTO, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="township">
            <Select
              placeholder="Select Township"
              style={{ width: 200 }}
            >
              <Select.Option value="" style={{ color: 'gray' }}>-- Select TownShip --</Select.Option>
              {township.map((item: OptionDTO, index) => (
                <Select.Option key={index} value={item.value}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="type" label="Apply Type" >
            <Select placeholder="-- Select Apply Type --" style={{ width: 200 }}>
              <Select.Option value="" style={{ color: 'gray' }}>-- Select Apply Type --</Select.Option>
              <Select.Option value="New">New</Select.Option>
              <Select.Option value="Extension">Extension</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label="DOCCA Status">
            <Select placeholder="-- Select Doca Status --" style={{ width: 200 }}>
              <Select.Option value="" style={{ color: 'gray' }}>-- Select Doca Status --</Select.Option>
              <Select.Option value="Approve">Approve</Select.Option>
              <Select.Option value="Rejected">Reject</Select.Option>
              <Select.Option value="Pending">Pending</Select.Option>
            </Select>
          </Form.Item>



          <Form.Item>
            <div style={{display: 'flex', gap: '8px'}}>
              <Button type="primary" htmlType="submit">Search</Button>
              <Button type="primary" onClick={exportToExcel}>Export To Excel</Button>
            </div>
          </Form.Item>
        </Form>
      </div>

      <Spin spinning={loading}>
        <div style={{ overflowX: 'auto', background: '#fff', padding: '16px', borderRadius: '8px' }}>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Application No</th>
              <th>Created Date</th>
              <th>Business Name</th>
              <th>Business Name Myanmar</th>
              <th>Business Address</th>
              <th>Status</th>
              <th>DOCCA Send Date</th>
              <th>Ground Checking Date</th>
              <th>DOCCA Accept Date</th>
              <th>DOCCA Pass Date</th>
              <th>Approve Date</th>
              <th>State Admin Remark</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((data, index) => (
              <tr key={index}>
                <td>{((currentPage - 1) * rowsPerPage) + index + 1}</td>
                <td>{data.applicationNo}</td>
                <td>{formatDate(data.createdDate)}</td>
                <td>{data.businessName}</td>
                <td>{data.businessNameMyanmar}</td>
                <td>{data.businessAddress}</td>
                <td>{data.status}</td>
                <td>{formatDate(data.doccaSendDate)}</td>
                <td>{formatDate(data.groundCheckingCompleteDate)}</td>
                <td>{formatDate(data.doccaAcceptDate)}</td>
                <td>{formatDate(data.doccaPassDate)}</td>
                <td>{formatDate(data.approveDate)}</td>
                <td>{data.approveRemark}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Spin>

      <div style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Button
              disabled={!hasSearched || currentPage === 1}
              onClick={() => handlePageChange(1)}
            >
              First
            </Button>
            <Button
              disabled={!hasSearched || currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span style={{ margin: '0 10px' }}>
              Page {currentPage} of {Math.ceil(totalCount / rowsPerPage)}
            </span>
            <Button
              disabled={!hasSearched || currentPage === Math.ceil(totalCount / rowsPerPage)}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
            <Button
              disabled={!hasSearched || currentPage === Math.ceil(totalCount / rowsPerPage)}
              onClick={() => handlePageChange(Math.ceil(totalCount / rowsPerPage))}
            >
              Last
            </Button>
          </div>
          <Select
            value={rowsPerPage}
            onChange={handlePageSizeChange}
            disabled={!hasSearched}
            style={{ width: 120 }}
          >
            <Select.Option value={10}>10 / page</Select.Option>
            <Select.Option value={20}>20 / page</Select.Option>
            <Select.Option value={50}>50 / page</Select.Option>
          </Select>
        </div>
      </div>

{/* 
      <div style={{ marginTop: '16px' }}>
        <Button
          disabled={!hasSearched || currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          First
        </Button>
        <Button
          disabled={!hasSearched || currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {Math.ceil(totalCount / rowsPerPage)}
        </span>
        <Button
          disabled={!hasSearched || currentPage === Math.ceil(totalCount / rowsPerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
        <Button
          disabled={!hasSearched || currentPage === Math.ceil(totalCount / rowsPerPage)}
          onClick={() => handlePageChange(Math.ceil(totalCount / rowsPerPage))}
        >
          Last
        </Button>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Select
          value={rowsPerPage}
          onChange={handlePageSizeChange}
          disabled={!hasSearched}
          style={{ width: 120 }}
        >
          <Select.Option value={10}>10 / page</Select.Option>
          <Select.Option value={20}>20 / page</Select.Option>
          <Select.Option value={50}>50 / page</Select.Option>
        </Select>
      </div>
      </div> */}

    </>
  );



};

import React, { useEffect, useState } from 'react';
import './style.css';
import NameConvert from 'src/app/services/NameConvert';
import {
  Button,
  Col,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { SearchOutlined } from '@ant-design/icons';
import { AnyObject } from 'src/Models/AnyObject';

export interface PaginationTypeClientOnly {
  data: AnyObject[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  sortColumn: string;
  sortOrder: string;
  filterColumn: string;
  filterQuery: string;
  websiteURL: string;
  type: string;
}
export type TableFunctionType = (
  api: string
) => Promise<PaginationTypeClientOnly>;

interface PropsType {
  displayData: string[];
  api: string;
  fetch: (url: string) => Promise<PaginationTypeClientOnly>;
}

export const ClientForShowTBL: React.FC<PropsType> = ({
  displayData,
  api,
  fetch,
}) => {
  const intialValue: PaginationTypeClientOnly = {
    data: [],
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
    sortColumn: '',
    sortOrder: '',
    filterColumn: '',
    filterQuery: '',
    websiteURL: '',
    type: '',
  };

  const [state, setState] = useState({
    loading: false,
    sortColumn: displayData[0],
    sortDirection: 'asc',
    filterColumn: displayData[0],
    filterQuery: '',
    searchValue: '',
    pageIndex: 0,
    pageSize: 5,
    data: intialValue,
    url: '',
    type: '',
    websiteURL: '',
    fromDate: '', // Added fromDate state
    toDate: '', // Added toDate state
  });

  const handleSort = (column: string) => {
    setState((prevState) => ({
      ...prevState,
      sortColumn: column,
      sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  };

  const onChangeTabs = (key: string) => {
    setState((prevState) => ({
      ...prevState,
      type: key,
    }));
  };

  const handleFilterData = () => {
    // When the filter button is clicked, set the filterQuery state
    setState((prevState) => ({
      ...prevState,
      filterQuery: state.searchValue,
    }));
    fetchData();
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      fromDate: e.target.value,
    }));
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      toDate: e.target.value,
    }));
  };
  // eslint-disable-next-line
  // useEffect(() => {
  //   fetchData();
  //   // const temp = `${api}?pageIndex=${state.pageIndex}&pageSize=${state.pageSize}&sortColumn=${state.sortColumn}&sortOrder=${state.sortDirection}&filterColumn=${state.filterColumn}&filterQuery=${state.filterQuery}&websiteURL=${state.websiteURL}&type=${state.type}&fromDate=${state.fromDate}&toDate=${state.toDate}`;
  // }, []);

  useEffect(() => {
    fetchData();
    // const temp = `${api}?pageIndex=${state.pageIndex}&pageSize=${state.pageSize}&sortColumn=${state.sortColumn}&sortOrder=${state.sortDirection}&filterColumn=${state.filterColumn}&filterQuery=${state.filterQuery}&websiteURL=${state.websiteURL}&type=${state.type}&fromDate=${state.fromDate}&toDate=${state.toDate}`;
  }, [
    state.sortColumn,
    state.sortDirection,
    state.pageSize,
    state.pageIndex,
    state.filterColumn,
    state.filterQuery,
    state.websiteURL,
    state.type,
    api,
  ]);

  const fetchData = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const temp = `${api}?pageIndex=${state.pageIndex}&pageSize=${state.pageSize}&sortColumn=${state.sortColumn}&sortOrder=${state.sortDirection}&filterColumn=${state.filterColumn}&filterQuery=${state.filterQuery}&websiteURL=${state.websiteURL}&type=${state.type}&fromDate=${state.fromDate}&toDate=${state.toDate}`;
      const result = await fetch(temp);
      // setState((prevState) => ({ ...prevState, url: temp }));
      //       const result = await fetch(state.url);
      setState((prevState) => ({
        ...prevState,
        data: result,
        loading: false,
      }));
    } catch (ex) {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const { Option } = Select;

  return (
    <Spin tip="Loading..." spinning={state.loading}>
      <Row justify="center" align="middle" className="mb-3">
        <Col style={{ padding: '20px' }}>
          <Select
            style={{ minWidth: '250px' }}
            placeholder="မိမိရှာဖွေချင်သော အရာကိုရွေးရန်"
            onChange={(e) => {
              setState((prevState) => ({ ...prevState, filterColumn: e }));
            }}
          >
            {displayData.map((display: string, index) => {
              if (
                display !== 'id' &&
                display !== 'issuedDate' &&
                display !== 'validDate' &&
                display !== 'status'
              ) {
                return (
                  <Option key={index} value={display}>
                    {NameConvert(display)}
                  </Option>
                );
              } else {
                return null;
              }
            })}
          </Select>
        </Col>
        <Col style={{ padding: '20px' }}>
          <Space.Compact block>
            <Input
              onChange={(e) => {
                if (state.filterColumn === 'websiteUrl') {
                  setState((prevState) => ({
                    ...prevState,
                    websiteURL: e.target.value,
                  }));
                } else {
                  setState((prevState) => ({
                    ...prevState,
                    searchValue: e.target.value,
                  }));
                }
              }}
            />
          </Space.Compact>
        </Col>
      </Row>

      {/* <Row justify="center" align="middle" className="mb-3">
        <Col style ={{ padding: '20px'}}>
          <Space.Compact block>
      
            <Input
              style={{ width: '35%' }}
              value={'From Date'}
              color="red"
              readOnly
              disabled
            />
            <Input
              type="datetime-local"
              value={state.fromDate}
              onChange={handleFromDateChange}
            />
          </Space.Compact>
        </Col>
        <Col style = {{padding: '20px'}}>
        <Space.Compact block >
            <Input
              style={{ width: '35%' }}
              value={'To Date'}
              color="red"
              readOnly
              disabled
            />
            <Input
             
              type="datetime-local"
              value={state.toDate}
              onChange={handleToDateChange}
            />
          </Space.Compact>
        </Col>
        <Button
          style={{ backgroundColor: '#bb5b67' }}
          onClick={handleFilterData}
        >
          <SearchOutlined style={{ color: 'white' }} />
        </Button>
      </Row> */}

      <Row justify="center" align="middle" className="mb-3">
        <Col style={{ padding: '20px' }}>
          <Input
            style={{ width: '300px' }}
            addonBefore="From Date"
            type="datetime-local"
            value={state.fromDate}
            onChange={handleFromDateChange}
          />
        </Col>
        <Col style={{ padding: '20px' }}>
          <Input
            style={{ width: '300px' }}
            addonBefore="To Date"
            type="datetime-local"
            value={state.toDate}
            onChange={handleToDateChange}
          />
        </Col>
        <Col style={{ padding: '20px' }}>
          <Button
            style={{ backgroundColor: '#bb5b67' }}
            onClick={handleFilterData}
          >
            <SearchOutlined style={{ color: 'white' }} />
          </Button>
        </Col>
      </Row>

      <div className="table-container">
        <Tabs onChange={onChangeTabs} type="card">
          <TabPane tab="All" key="all"></TabPane>
          <TabPane
            tab="ကုမ္ပဏီ (သို့မဟုတ်) စီးပွားရေးအဖွဲ့အစည်းများ"
            key="company"
          ></TabPane>
          <TabPane tab="Individual စီးပွားရေးများ" key="individual"></TabPane>
        </Tabs>
        <table>
          <thead>
            <tr>
              <td>No</td>
              {displayData.map((display: string, i) => {
                if (display !== 'id') {
                  return (
                    <td key={i} onClick={() => handleSort(display)}>
                      {NameConvert(display)}
                      {state.sortColumn === display && (
                        <span>{state.sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </td>
                  );
                } else {
                  return null;
                }
              })}
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {state.data.data.map((row, index) => {
              const data = displayData.map((display: string, i) => {
                if (display !== 'id') {
                  return <td key={`${i}`}>{row[display]}</td>;
                } else {
                  return '';
                }
              });
              const action = <td key={`${row.id}-action`}>{row['id']}</td>;
              return (
                <tr key={row.id}>
                  <td>{index + 1 + state.pageIndex * state.pageSize}</td>
                  {data}
                  {action}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50, 100]}
          defaultPageSize={5}
          onShowSizeChange={(current) => {
            setState((prevState) => ({ ...prevState, pageSize: current }));
          }}
          defaultCurrent={+state.pageIndex + 1}
          total={state.data.totalCount}
          onChange={(page, pageSize) => {
            setState((prevState) => ({
              ...prevState,
              pageIndex: page - 1,
              pageSize,
            }));
          }}
        />
      </div>
    </Spin>
  );
};

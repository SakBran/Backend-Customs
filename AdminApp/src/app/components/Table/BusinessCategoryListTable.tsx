import React, { useEffect, useState } from 'react';
import { Tag, Pagination, Select, Button, Input, Space, Spin } from 'antd';
import { PaginationType } from 'src/Models/PaginationType';
import NameConvert from 'src/app/services/NameConvert';
import TableAction from '../TableAction/TableAction';
import './style.css';

type AnyObject = Record<string, any>;
interface PropsType {
  displayData: string[];
  api: string;
  allData: AnyObject[];
}

export const BusinessCategoryListTable: React.FC<PropsType> = ({
  displayData,
  api,
  allData,
}) => {
  const initialValue: PaginationType = {
    data: [],
    pageIndex: 1,
    pageSize: 5,
    totalCount: allData.length,
    totalPages: Math.ceil(allData.length / 5),
    hasPreviousPage: false,
    hasNextPage: true,
    sortColumn: '',
    sortOrder: '',
    filterColumn: '',
    filterQuery: '',
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState('sortOrder');
  const [sortDirection, setSortDirection] = useState('asc'); // Default to ascending
  const [filterColumn, setFilterColumn] = useState(displayData[0]);
  const [filterQuery, setFilterQuery] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState<PaginationType>(initialValue);

  const filteredData = allData.filter((item) => {
    if (filterQuery === '') return true;
    return item[filterColumn].toString().toLowerCase().includes(filterQuery.toLowerCase());
  });

  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const sortData = (data: AnyObject[]) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const valueA = sortColumn === 'businessTypeId' ? a[sortColumn][0].props.children : a[sortColumn];
      const valueB = sortColumn === 'businessTypeId' ? b[sortColumn][0].props.children : b[sortColumn];
  
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sortedData;
  };
  
  const sortedData = sortData(filteredData);
  const displayedData = sortedData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

  useEffect(() => {
    const call = async () => {
      setLoading(true);  // Move setLoading here to ensure it is only set once at the start
      try {
        // Set data only if it's different from the current state to avoid unnecessary re-renders
        if (JSON.stringify(data) !== JSON.stringify({ ...initialValue, data: displayedData })) {
          setData({ ...initialValue, data: displayedData });
        }
      } catch (ex) {
        console.error(ex);  // It's good to log the error for debugging purposes
      } finally {
        setLoading(false);  // Ensure loading is set to false regardless of the outcome
      }
    };
  
    call();
  }, [pageIndex, pageSize, filterQuery, allData, sortedData, displayedData]);  // Ensure that dependencies include only what needs to be watched
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc'); // Default to ascending when changing the sort column
    }
  };

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Space.Compact block size="small" className="antdFormContainer">
        <Select style={{ minWidth: '150px' }} onChange={(e) => setFilterColumn(e)}>
          {displayData.map((display: string) => (
            <Select.Option key={display} value={display}>
              {NameConvert(display)}
            </Select.Option>
          ))}
        </Select>
        <Input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <Button onClick={() => {
          setFilterQuery(searchValue);
          setPageIndex(1);
        }}>
          Search
        </Button>
      </Space.Compact>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <td>No</td>
              {displayData.map((display: string, i) => {
                if (display === 'businessTypeId') {
                  return (
                    <td key={i} onClick={() => handleSort(display)} style={{ cursor: 'pointer' }}>
                      {NameConvert(display)}
                      <span style={{ marginLeft: '5px' }}>
                        {sortColumn === display ? (sortDirection === 'asc' ? '▲' : '▼') : '▲'}
                      </span>
                    </td>
                  );
                } else if (display !== 'id') {
                  return (
                    <td key={i} onClick={() => handleSort(display)} style={{ cursor: 'pointer' }}>
                      {NameConvert(display)}
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
            {displayedData.map((row, index) => {
              const rowData = displayData.map((display: string, i) => {
                if (display !== 'id') {
                  return <td key={i}>{row[display]}</td>;
                } else {
                  return null;
                }
              });

              const action = <TableAction id={row['id']} />;

              return (
                <tr key={row['id']}>
                  <td key={row['id'] + 'No'}>{index + 1 + (pageIndex - 1) * pageSize}</td>
                  {rowData}
                  {action}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <Pagination
          current={pageIndex}
          total={totalCount}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50, 100]}
          onChange={(page, pageSize) => {
            setPageIndex(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </Spin>
  );
};

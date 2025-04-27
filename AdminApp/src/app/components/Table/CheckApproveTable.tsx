import React, { useEffect, useState } from 'react';
import './style.css';
import NameConvert from 'src/app/services/NameConvert';
import { Button, Input, Pagination, Select, Space, Spin } from 'antd';
import { PaginationType } from 'src/Models/PaginationType';
import CheckAction from '../TableAction/CheckAction';
import { format } from 'date-fns';

export type TableFunctionType = (api: string) => Promise<PaginationType>;

interface PropsType {
  displayData: string[];
  api: string;
  fetch: (url: string) => Promise<PaginationType>;
  actionColumn?: (record: any) => React.ReactNode;
  columnLabels?: {[key: string]: string};
  isRestricted?: boolean;
}

export const CheckApproveTable: React.FC<PropsType> = ({
  displayData,
  api,
  fetch,
  actionColumn,
  columnLabels,
  isRestricted = false,
}) => {
  const formatEntryDate = (dateString: any) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '';
    }
    //const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
    const formattedDate = format(date, 'dd-MM-yyyy HH:mm:ss');
    return formattedDate;
  };
  const intialValue: PaginationType = {
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
  };

  const [loading, setloading] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState(displayData[0]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterColumn, setFilterColumn] = useState(displayData[0]);
  const [filterQuery, setFilterQuery] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState<PaginationType>(intialValue);
  const [url, setUrl] = useState('');

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    let temp = `${api}?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    if (sortColumn !== '') {
      temp = temp + `&sortColumn=${sortColumn}&sortOrder=${sortDirection}`;
    }
    if (filterQuery !== '' && filterColumn !== '') {
      temp = temp + `&filterColumn=${filterColumn}&filterQuery=${filterQuery}`;
    }
    setUrl(temp);
  }, [
    sortColumn,
    sortDirection,
    pageSize,
    pageIndex,
    filterColumn,
    filterQuery,
    api,
    fetch,
    url,
  ]);

  useEffect(() => {
    setloading(true);
    const call = async () => {
      try {
        setData(await fetch(url));
        setloading(false);
      } catch (ex) {
        setloading(false);
      }
    };
    call();
  }, [fetch, url]);

  const { Option } = Select;

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Space.Compact block size="small" className="antdFormContainer">
        <Select
          style={{ minWidth: '150px' }}
          onChange={(e) => setFilterColumn(e)}
        >
          {displayData.map((display: string) => {
            return (
              <Option key={display} value={display}>
                {NameConvert(display)}
              </Option>
            );
          })}
        </Select>
        <Input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            setFilterQuery(searchValue);
          }}
        >
          Search
        </Button>
      </Space.Compact>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <td>No</td>
              {displayData.map((display: string, i) => {
                if (display !== 'id') {
                  return (
                    <td key={i} onClick={() => handleSort(display)}>
                      {columnLabels && columnLabels[display] ? NameConvert(columnLabels[display]) : NameConvert(display)}
                      {/* {NameConvert(display)} */}
                      {sortColumn === display && (
                        <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </td>
                  );
                } else {
                  return '';
                }
              })}
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, index) => {
              const rowData = displayData.map((display: string, i) => {
                const isReSubmitColumn =
                  display === 'isReSubmit' ? 'red-text' : ''; // Apply red-text class for "IsReSubmit" column
                if (display !== 'id') {
                  let formattingData;

                  if (display === 'createdDate') {
                    formattingData = formatEntryDate(row[display]);
                  } else if (display === 'checkDate') {
                    formattingData = formatEntryDate(row[display]);
                  } else if (display === 'approveDate') {
                    formattingData = formatEntryDate(row[display]);
                  } else if (display === 'turnDownDate') {
                    formattingData = formatEntryDate(row[display]);
                  } else if (display === 'doccaSendDate') {
                    formattingData = formatEntryDate(row[display]);
                  } else if (display === 'doccaPassDate') {
                    formattingData = formatEntryDate(row[display]);
                  } else if (display === 'doccaAcceptDate') {
                    formattingData = formatEntryDate(row[display]);
                  } else {
                    formattingData = row[display];
                  }

                  return (
                    <td
                      key={i}
                      onClick={() => handleSort(display)}
                      className={isReSubmitColumn}
                    >
                      {formattingData}
                      {/* {display === 'createdDate'
                        ? formatEntryDate(row[display])
                        : row[display]} */}

                      {sortColumn === display && (
                        <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </td>
                  );
                } else {
                  return '';
                }
              });

              const defaultAction = (row: any) => !isRestricted? <CheckAction id={row['id']} />:<td>
              Action
            </td>;
              const action = actionColumn ? actionColumn(row) : defaultAction(row);
              // const action = <CheckAction id={row['id']} />;

              const template = (
                <tr key={row['id']}>
                  <td key={row['id'] + 'No'}>
                    {index + 1 + pageIndex * pageSize}
                  </td>
                  {rowData}
                  {action}
                </tr>
              );
              return template;
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <Pagination
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50, 100]}
          defaultPageSize={5}
          onShowSizeChange={(current) => setPageSize(current)}
          defaultCurrent={+pageIndex}
          total={data.totalCount}
          onChange={(page, pageSize) => {
            setPageIndex(page - 1);
            setPageSize(pageSize);
          }}
        />
      </div>
    </Spin>
  );
};

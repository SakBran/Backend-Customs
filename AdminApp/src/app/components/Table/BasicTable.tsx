import React, { useEffect, useState } from 'react';
import './style.css';
import NameConvert from 'src/app/services/NameConvert';
import TableAction from '../TableAction/TableAction';
import { Button, Input, Pagination, Select, Space, Spin } from 'antd';
import { PaginationType } from 'src/Models/PaginationType';
//ဒီနေရမှာ Ant Designက Table သုံးလဲရတယ် Depedencyနဲနိုင်သမျှနဲအောင် လုပ်သာအကောင်းဆုံးပဲ
//Fetch လုပ်တာလဲ ပြချင်တဲ့ Column ကို Display Dataထဲထည့်ပေးရုံပဲ
//Fetch ကထွက်လာတဲ့ Databindingကလဲ အဆင်ပြေအောင် Componentအပြင်ပဲထုတ်ထားတယ်

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableFunctionType = (api: string) => Promise<PaginationType>;
interface PropsType {
  displayData: string[];
  api: string;
  fetch: (url: string) => Promise<PaginationType>;
  actionComponent?: React.FC<{id: string}>;  // add this props for userTableAction
}

export const BasicTable: React.FC<PropsType> = ({
  displayData,
  api,
  fetch,
  actionComponent, // add this props for userTableAction
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

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
  const [sortColumn, setSortColumn] = useState(displayData[1]);
  const [sortDirection, setSortDirection] = useState('desc');

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

  //ဒီထဲကParameterက Dotnet Core ထဲကPagination Getနဲ့ညှိပေးထားတာ
  //တကယ်လို့ပြင်ချင်ရင် Parameter တွေပြင်သုံးပေါ့
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
           //addonBefore={selectBefore}
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
                      {NameConvert(display)}
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
          {/* <tbody>
            {data.data.map((row, index) => {
              const data = displayData.map((display: string, i) => {
                if (display !== 'id') {
                  return <td key={i}>{row[display].toString()}</td>;
                } else {
                  return '';
                }
              });

              const action = <TableAction id={row['id']} />;

              const template = (
                <tr key={row['id']}>
                  <td key={row['id'] + 'No'}>
                    {index + 1 + pageIndex * pageSize}
                  </td>
                  {data}
                  {action}
                </tr>
              );
              return template;
            })}
          </tbody> */}
          <tbody>
  {data.data?.map((row, index) => {
    const data = displayData.map((display: string, i) => {
      if (display !== 'id') {
        const cellValue = row[display];
        return <td key={i}>{cellValue?.toString() ?? 'N/A'}</td>;
      } else {
        return '';
      }
    });

    return (
      <tr key={row['id']}>
        <td>{index + 1 + pageIndex * pageSize}</td>
        {data}
        {/* <TableAction id={row['id']} /> */}
        {actionComponent ? actionComponent({id: row['id']}) : <TableAction id={row['id']} /> }
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      <div className="pagination">
        <Pagination
          //size="small"
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

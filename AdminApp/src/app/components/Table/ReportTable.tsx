import { useEffect, useState } from 'react';
import './style.css';
import NameConvert from 'src/app/services/NameConvert';
import { Button, Input, Pagination, Select, Space, Spin } from 'antd';
import { PaginationType } from 'src/Models/PaginationType';
import { AnyObject } from 'src/Models/AnyObject';
//ဒီနေရမှာ Ant Designက Table သုံးလဲရတယ် Depedencyနဲနိုင်သမျှနဲအောင် လုပ်သာအကောင်းဆုံးပဲ
//Fetch လုပ်တာလဲ ပြချင်တဲ့ Column ကို Display Dataထဲထည့်ပေးရုံပဲ
//Fetch ကထွက်လာတဲ့ Databindingကလဲ အဆင်ပြေအောင် Componentအပြင်ပဲထုတ်ထားတယ်

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableFunctionType = (api: string) => Promise<PaginationType>;
interface PropsType {
  displayData: string[];
  api: string;
  filterData: AnyObject;
  fetch: (url: string, data: AnyObject) => Promise<PaginationType>;
}

export const ReportTable: React.FC<PropsType> = ({
  displayData,
  api,
  fetch,
  filterData,
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
        setData(await fetch(url, filterData));
        setloading(false);
      } catch (ex) {
        console.log(ex);
        setloading(false);
      }
    };
    call();
  }, [fetch, filterData, url]);

  const { Option } = Select;

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Space.Compact block size="small" className="antdFormContainer">
        <Select
          style={{ minWidth: '250px' }}
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
          // addonBefore={selectBefore}
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
        <table id="reportTable">
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
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, index) => {
              const data = displayData
                .filter((x) => x !== 'id')
                .map((display: string, i) => {
                  return <td key={i}>{row[display]}</td>;
                });

              const template = (
                <tr key={row['id']}>
                  <td key={row['id'] + 'No'}>
                    {index + 1 + pageIndex * pageSize}
                  </td>
                  {data}
                </tr>
              );
              return template;
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <Pagination
          //size="small"
          showSizeChanger
          pageSizeOptions={[5, 10, 20, 50, 100, 1000, 10000, 100000, 1000000]}
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

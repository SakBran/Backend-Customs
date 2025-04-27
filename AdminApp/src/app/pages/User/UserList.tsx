import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import UserTableAction from 'src/app/components/TableAction/UserTableAction';
import { Get } from 'src/app/services/BasicHttpServices';
import { PaginationType } from 'src/Models/PaginationType';

//#region တကယ်လို့ Dataကို Manual Bind ချင်ရင်ဒါနဲ့ရေးလို့ရတယ်။

// const fetch = async (url: string): Promise<PaginationType> => {
//   return await axiosInstance
//     .get(url)
//     .then((response) => {
//       const responseData: PaginationType = JSON.parse(
//         JSON.stringify(response.data)
//       );
//       return responseData;
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

//#endregion

// const UserList: React.FC = () => (
//   <BasicTable
//     //ဒါကခေါ်သုံးမယ့် API Urlမှာ api/ ရဲ့နောက်ကပါတဲ့ URLထည့်ရုံပဲ Parameterထည့်ရန်မလို
//     api={'User'}
//     //ဒါကTableမှာပေါ်မယ့်Column ထည့်ပေးရုံပဲ
//     //idက ထည့်ပေးရမယ် Edit Delete Detailအတွက်
//     //id မပါရင် Edit Delete Detail အလုပ်မလုပ်
//     displayData={['name', 'password', 'permission', 'isActive', 'id']}
//     fetch={Get}
//     actionComponent={UserTableAction} // add this props for userTableAction

//   ></BasicTable>
// );

const UserList: React.FC = () => {
  const transformUserData = (data: PaginationType): PaginationType => {
    return {
      ...data,
      data: data.data.map(item => ({
        ...item,
        isActive: item.isActive == 'True' ? 'Active' :
          item.isActive == 'False' ? 'InActive' :
            'N/A',
      }))
    };
  };

  return (
    <BasicTable
      api={'User'}
      displayData={['name', 'password', 'permission', 'isActive', 'id']}
      fetch={async (url) => {
        const response = await Get(url);
        return transformUserData(response);
      }}
      actionComponent={UserTableAction}
    />
  );
};


export default UserList;

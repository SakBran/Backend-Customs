import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

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
const QuesttionList: React.FC = () => (
  <BasicTable
    //ဒါကခေါ်သုံးမယ့် API Urlမှာ api/ ရဲ့နောက်ကပါတဲ့ URLထည့်ရုံပဲ Parameterထည့်ရန်မလို
    api={'Question'}
    //ဒါကTableမှာပေါ်မယ့်Column ထည့်ပေးရုံပဲ
    //idက ထည့်ပေးရမယ် Edit Delete Detailအတွက်
    //id မပါရင် Edit Delete Detail အလုပ်မလုပ်
    displayData={['displayOrder', 'question', 'isDeleted', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default QuesttionList;

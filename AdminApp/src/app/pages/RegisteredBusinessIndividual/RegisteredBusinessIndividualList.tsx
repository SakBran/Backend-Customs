import React from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import { RegisteredTable } from 'src/app/components/Table/RegisteredBusinessTable';
import axiosInstance from 'src/app/services/AxiosInstance';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

//#region တကယ်လို့ Dataကို Manual Bind ချင်ရင်ဒါနဲ့ရေးလို့ရတယ်။

const fetch = async (url: string): Promise<PaginationType> => {
  return await axiosInstance
    .get(url)
    .then((response) => {
      const responseData: PaginationType = JSON.parse(
        JSON.stringify(response.data)
      );
      console.log('', responseData);
      responseData.data.forEach((data) => {
        data['issuedDate'] = data['issuedDate'].split('T')[0];
        data['validDate'] = data['validDate'].split('T')[0];

        const tempArray: string[] = [];

        if (data['websiteUrls']) {
          const websiteUrls: string[] = JSON.parse(data['websiteUrls']);
          if (websiteUrls) {
            websiteUrls.forEach((websiteUrl) => {
              if (websiteUrl !== 'undefined' && websiteUrl !== '') {
                tempArray.push(websiteUrl);
              }
            });
          }
        }
        if (data['socialMediaUrls']) {
          const socialMediaUrls: string[] = JSON.parse(data['socialMediaUrls']);
          if (socialMediaUrls) {
            socialMediaUrls.forEach((websiteUrl) => {
              if (websiteUrl !== 'undefined' && websiteUrl !== '') {
                tempArray.push(websiteUrl);
              }
            });
          }
        }

        if (data['mobileApplicationUrl']) {
          const mobileApplicationUrl: string[] = JSON.parse(
            data['mobileApplicationUrl']
          );
          if (mobileApplicationUrl) {
            mobileApplicationUrl.forEach((websiteUrl) => {
              if (websiteUrl !== 'undefined' && websiteUrl !== '') {
                tempArray.push(websiteUrl);
              }
            });
          }
        }

        data['websiteUrl'] = tempArray.map((x, index) => (
          <>
            <Tag key={x + index} color="blue">
              <a href={x}> {x}</a>
            </Tag>
            <br />
          </>
        ));
        const id = data['id'];
        console.log(data['id']);
        data['id'] = <Link to={'/CertificateForIndividual/' + id}>Detail</Link>;
      });

      return responseData;
    })
    .catch((error) => {
      throw error;
    });
};
const RegisteredBusinessIndividualList: React.FC = () => {
  return (
    <RegisteredTable
      api={'Business/GetIndividual'}
      displayData={[
        'businessName',
        'websiteUrl',
        'certificateNo',
        'issuedDate',
        'validDate',
        'status',
        'id',
      ]}
      fetch={fetch}
    ></RegisteredTable>
  );
};

export default RegisteredBusinessIndividualList;

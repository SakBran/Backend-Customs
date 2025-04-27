import React, { useEffect, useRef, useState } from 'react';
import { PaginationType } from 'src/Models/PaginationType';
import axiosInstance from 'src/app/services/AxiosInstance';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CheckApproveTable } from 'src/app/components/Table/CheckApproveTable';
import { Get } from 'src/app/services/BasicHttpServices';
import axios from 'axios';
import envConfig from 'src/app/config';
//#region á€á€€á€šá€ºá€œá€­á€¯á€· Dataá€€á€­á€¯ Manual Bind á€á€»á€„á€ºá€›á€„á€ºá€’á€«á€”á€²á€·á€›á€±á€¸á€œá€­á€¯á€·á€›á€á€šá€ºá‹

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
        data['id'] = <Link to={'/CertificateForCompany/' + id}>Detail</Link>;
      });

      return responseData;
    })
    .catch((error) => {
      throw error;
    });
};
const CheckedExtensionList: React.FC = () => {
 /* return (
    <CheckApproveTable
      api={'BusinessRegistration/GetCheckedApplicationExtension'}
      displayData={[
        'applicationNo',
        'createdDate',
        'checkDate',        
        'companyOrIndividualType',
        'businessName',
        'businessNameMyanmar',
        // 'approveCheckUserId',
        'checkedBy',
        'companyRegNo',
        'smeRegNo',
        'eirRegNo',
        'isReSubmit',
        'takeBy',
        'id',
      ]}
      // columnLabels={{
      //   'approveCheckUserId': 'Checked By'
      // }}
      fetch={Get}
    ></CheckApproveTable>
  );
};*/

const [columns, setColumns] = useState<string[]>([
    'applicationNo',
        'createdDate',
        'checkDate',        
        'companyOrIndividualType',
        'businessName',
        'businessNameMyanmar',
        // 'approveCheckUserId',
        'checkedBy',
        'companyRegNo',
        'smeRegNo',
        'eirRegNo',
        'isReSubmit',
        'id',
  ]);
const [loading, setLoading] = useState(true);
  const roleFetched = useRef(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get<string>(
          `${envConfig.baseUrl}BusinessRegistration/GetCurrentUserRole`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If user is "Approve User", add the column
        if (!roleFetched.current && response.data === 'Approve User') {
          setColumns(prevColumns => {
            if (!prevColumns.includes('takeBy')) {
              return [...prevColumns, 'takeBy'];
            }
            return prevColumns;
          });
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CheckApproveTable
      api={'BusinessRegistration/GetCheckedApplicationExtension'}
      displayData={columns}
      fetch={Get}
    />
  );
};

export default CheckedExtensionList;

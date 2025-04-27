import React, { useEffect, useState } from 'react';
import axiosInstance from 'src/app/services/AxiosInstance';
import './Registered.Module.style.css';
import { Modal, Space, Tag, message as antdMessage } from 'antd';
import { Link, useParams } from 'react-router-dom';
import {
  ClientForShowTBL,
  PaginationTypeClientOnly,
} from 'src/app/components/Table/ClientForShowTBL';
import attachment from 'src/Models/Attachment';
import { format } from 'date-fns';
import TextArea from 'antd/es/input/TextArea';

//#region တကယ်လို့ Dataကို Manual Bind ချင်ရင်ဒါနဲ့ရေးလို့ရတယ်။
const RegisteredBusinessList: React.FC = () => {
  // const [fromDate, setFromDate] = useState(''); // Add fromDate state
  // const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const { id: paramID } = useParams();
  const [checkedMessage, setCheckedMessage] = useState('');

  let id = '';
  if (paramID) {
    id = paramID;
  }
  const showConfirmDialog = (id: any) => {
    setSelectedUserId(id);
    setConfirmDialogVisible(true);
  };

  const handleConfirmNo = () => {
    setConfirmDialogVisible(false);
  };

  const handleCancel = () => {
    setRejectMessage('');
    setIsModalOpen(false);
  };

  const fetch = async (url: string): Promise<PaginationTypeClientOnly> => {
    return await axiosInstance
      .get(url, {
        params: {
          //: fromDate ? new Date(fromDate).toISOString() : null,
          fromDate: fromDate ? new Date(fromDate).toISOString() : null,
          toDate: toDate ? new Date(toDate).toISOString() : null,
        },
      })
      .then((response) => {
        const responseData: PaginationTypeClientOnly = JSON.parse(
          JSON.stringify(response.data)
        );
        console.log('', responseData);
        responseData.data.forEach((data) => {
          data['issuedDate'] = formatEntryDate(data['issuedDate']);

          // data['issuedDate'] = data['issuedDate'];
          data['validDate'] = data['validDate'].split('T')[0];

          const tempArray: attachment[] = [];

          if (data['websiteUrls']) {
            const websiteUrls: attachment[] = JSON.parse(data['websiteUrls']);
            if (websiteUrls) {
              websiteUrls.forEach((websiteUrl) => {
                if (websiteUrl) {
                  tempArray.push(websiteUrl);
                }
              });
            }
          }
          if (data['socialMediaUrls']) {
            const socialMediaUrls: attachment[] = JSON.parse(
              data['socialMediaUrls']
            );
            if (socialMediaUrls) {
              socialMediaUrls.forEach((websiteUrl) => {
                if (websiteUrl) {
                  tempArray.push(websiteUrl);
                }
              });
            }
          }

          if (data['mobileApplicationUrl']) {
            const mobileApplicationUrl: attachment[] = JSON.parse(
              data['mobileApplicationUrl']
            );
            if (mobileApplicationUrl) {
              mobileApplicationUrl.forEach((websiteUrl) => {
                if (websiteUrl) {
                  tempArray.push(websiteUrl);
                }
              });
            }
          }

          data['websiteUrl'] = tempArray.map((x, index) => {
            if (x.attachment !== '') {
              return (
                <>
                  <Tag key={`${x.attachment.toLowerCase}-${index}`} color="red">
                    <a
                      key={`link-${x.attachment.toLowerCase}-${index}`}
                      href={x.file}
                    >
                      {x.attachment}
                    </a>
                  </Tag>
                  <br key={`br${x.attachment.toLowerCase}-${index}`} />
                </>
              );
            } else {
              return '';
            }
          });

          const id = data['id'];
          const status = data['status'];
          const isSuspended = status === 'Suspensed';
          console.log(data['companyOrIndividualType']);
          if (data['companyOrIndividualType'] === 'company') {
            data['id'] = (
              <Space>
                <Link key={`${id}GUID`} to={'/CertificateForCompany/' + id}>
                  Detail
                </Link>
                <br />
                {/* <a
                  key={`${id}Suspend`}
                  onClick={() => handleSuspendClick(id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                >
                  Suspend
                </a> */}
                {isSuspended ? (
                  <span style={{ color: 'gray', cursor: 'not-allowed' }}>
                    Suspend
                  </span>
                ) : (
                  <a
                    key={`${id}Suspend`}
                    onClick={() => handleSuspendClick(id)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  >
                    Suspend
                  </a>
                )}
              </Space>
            );
          } else {
            data['id'] = (
              <Space>
                <Link key={`${id}GUID`} to={'/CertificateForIndividual/' + id}>
                  Detail
                </Link>
                <br />
                {/* <a
                  key={`${id}Suspend`}
                  onClick={() => handleSuspendClick(id)}
                  style={{ cursor: 'pointer', color: 'red' }}
                >
                  Suspend
                </a> */}
                {isSuspended ? (
                  <span style={{ color: 'gray', cursor: 'not-allowed' }}>
                    Suspend
                  </span>
                ) : (
                  <a
                    key={`${id}Suspend`}
                    onClick={() => handleSuspendClick(id)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  >
                    Suspend
                  </a>
                )}
              </Space>
            );
          }
        });

        return responseData;
      })
      .catch((error) => {
        throw error;
      });
  };
  const handleSuspendClick = (id: any) => {
    setSelectedUserId(id);
    setIsModalOpen(true); // Open the modal
  };
  const handleOk = async () => {
    if (!rejectMessage.trim()) {
      antdMessage.error('Reject message cannot be empty');
      return;
    }

    if (selectedUserId === null) {
      antdMessage.error('No user ID selected for suspension');
      return;
    }

    const data = { message: rejectMessage };

    try {
      //ok
      await axiosInstance.put(
        // `Business/SuspendApplication?id=${selectedUserId}&status=Valid&message=${rejectMessage}`,
        `Business/SuspendApplication?id=${selectedUserId}&message=${rejectMessage}`,

        data
      );

      antdMessage.success('User suspended successfully');
      setRefreshKey((prevKey) => prevKey + 1);
      //setRejectMessage('');
      setIsModalOpen(false);

      //await axiosInstance.put(`Business/SuspendEmail?id=${selectedUserId}&message=${rejectMessage}`)
    } catch (error) {
      console.error('Error suspending user:', error);
      antdMessage.error('Error suspending user');
    }
  };

  const formatEntryDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, 'dd-MM-yyyy HH:mm:ss'); // Use 'HH' for 24-hour format
  };
  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    setToDate(date);
  };
  return (
    <div className="custom">
      <h1 className="text text-lg-center">Registered Business</h1>
      <div className="text text-justify mt-5 mb-3">
        မိမိတို့စီးပွားရေးနှင့်ကူးသန်းရောင်းဝယ်ရေးဝန်ကြီးဌာန၏ eCommerce
        Registration (Online Sales Registration)စနစ်တွင် မှတ်ပုံတင်ထားသော Online
        Sales စီးပွားရေးလုပ်ငန်းများ၏ စာရင်းဖြစ်ပါသည်
      </div>

      <ClientForShowTBL
        api={'Business/GetAllwithMembers'}
        displayData={[
          'businessName',
          'memberName',
          'websiteUrl',
          'certificateNo',
          'issuedDate',
          'validDate',
          'status',
          'id',
        ]}
        fetch={fetch}
        key={refreshKey}
      ></ClientForShowTBL>
      <div>
        <Modal
          title="Suspend Message"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <TextArea
              onChange={(e) => setRejectMessage(e.target.value)}
              showCount
              placeholder="Enter suspend message"
              value={rejectMessage}
            ></TextArea>
          </div>
          <br />
        </Modal>
      </div>
    </div>
  );
};

export default RegisteredBusinessList;

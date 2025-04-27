import './CompanyDetailRegisteredInformation.style.css';
import { Radio } from 'antd';
import GetCertificateCompany from './CompanyDetailRegisteredInfoAPIAction';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Business from 'src/Models/Business';
import envConfig from 'src/app/config';
import TextBreaker from '../TextBreaker/TextBreaker';
import axiosInstance from 'src/app/services/AxiosInstance';
import { format } from 'date-fns';

const CompanyRegisteredInfo: React.FC = () => {
  const { id: paramID } = useParams();
  type attachment = {
    attachment: string;
    file: string;
  };
  let id = '';
  if (paramID) {
    id = paramID;
  }
  const [data, setData] = useState<Business>();
  const [onlineSaleLogo, setOnlineSaleLogo] = useState<string | undefined>('');
  const [url, setURL] = useState<attachment[]>([]);
  const [business, setBusiness] = useState<string[]>([]);
  const [NewIssuedDate, setNewIssuedDate] = useState('');

  useEffect(() => {
    const response = async () => {
      try {
        const result = await GetCertificateCompany(id);
        if (result) {
          const temp = JSON.parse(JSON.stringify(result));
          setData(temp);
          const websiteUrls = parseJSON(temp.websiteUrls);
          const socialMediaUrls = parseJSON(temp.socialMediaUrls);
          const mobileApplicationUrls = parseJSON(temp.mobileApplicationUrl);

          const combinedArray = [
            ...websiteUrls,
            ...socialMediaUrls,
            ...mobileApplicationUrls,
          ].filter((item) => item.attachment !== '');

          setURL(combinedArray);

          const category = JSON.parse(temp.businessCategory);
          setBusiness(category);

          const onlineSaleLogoList = parseJSON(temp.websiteLogo);
          if (onlineSaleLogoList.length > 0) {
            setOnlineSaleLogo(
              onlineSaleLogoList[0]?.fileName || onlineSaleLogoList[0]?.name
            );
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    };

    response();
  }, [id]);

  useEffect(() => {
    if (id) {
      const fetchMessage = async () => {
        try {
          const response = await axiosInstance.get<string[]>(
            `BusinessRegistration/GetNewIssuedDate?id=${id}`
          );
          const resultMessage = response.data;
          if (resultMessage !== null) {
            setNewIssuedDate(resultMessage.toString());
          }
        } catch (error) {
          console.error('Error fetching the message:', error);
        }
      };
      fetchMessage();
    }
  }, [id]);

  // Helper function to parse JSON and handle errors
  const parseJSON = (jsonString: any) => {
    try {
      return JSON.parse(jsonString) || [];
    } catch (ex) {
      console.error(ex);
      return [];
    }
  };

  return (
    <div className="p-5 ml-5 mr-5">
      <div className="text text-lg-center">
        <p>
          <b>
            <h1 className="text text-center ">Detail Registered Information</h1>
          </b>
        </p>
      </div>

      <div className="text text-center mt-5 pyidaungsu">
        <p>
          ဖော်ပြပါ အွန်လိုင်းစီးပွားရေးလုပ်ငန်းသည်
          စီးပွားရေးနှင့်ကူးသန်းရေးဝန်ကြီးဌာန၏ eCommerce Registration (Online
          Sales Registartion)စနစ်တွင်မှတ်ပုံတင်ထားသော အချက်အလက်များ ဖြစ်ပါသည်။
        </p>
      </div>

      <div className="text text-center mt-5 pyidaungsu">
        <Radio.Group value={'company'}>
          <Radio value="company" checked={true}>
            <h6>ကုမ္ပဏီ (သို့မဟုတ်) စီးပွားရေးအဖွဲ့အစည်းအတွက် လျှောက်ထားရန်</h6>
          </Radio>
          <Radio value="individual">
            <h6>Individual စီးပွားရေးအတွက် လျှောက်ထားရန်</h6>
          </Radio>
        </Radio.Group>
      </div>

      <div className="card mt-1 ml-5 mr-5" style={{ background: '#f2f2f2' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="font-weight-bold">
                Online Business Name (English)
              </div>
              <div className="text ">{data?.businessName}</div>
            </div>
            <div className="col-6">
              <div className="font-weight-bold ">
                Online Business Name (Myanmar)
              </div>
              <div className="text ">{data?.businessNameMyanmar}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-1 ml-5 mr-5" style={{ background: '#f2f2f2' }}>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-4">
              <div className="font-weight-bold ">Business Name</div>
              <div className="text ">{data?.businessName}</div>
            </div>
            <div className="col-4">
              <div className="font-weight-bold ">Company Registration No.</div>
              <div className="text ">{data?.companyRegNo}</div>
            </div>
            <div className="col-4">
              <div className="font-weight-bold ">EIR Registration No.</div>
              <div className="text ">{data?.eirRegNo}</div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <div className="font-weight-bold ">Owner Name</div>
              <div className="text ">{data?.businessOwnerName}</div>
            </div>
            <div className="col-4">
              <div className="font-weight-bold ">NRC Number</div>
              <div className="text ">
                {/*{data?.nrcCode}/{data?.nrcPrefix}
                {data?.nrcType}
                {data?.nrcNo?.replace(/.{4}$/, 'XXXX')}*/}

                {data?.businessOwnerCitizenType !== 'Foreigner'
                  ? `${data?.nrcCode}/${data?.nrcPrefix} ${
                      data?.nrcType
                    } ${data?.nrcNo?.replace(/.{4}$/, 'XXXX')}`
                  : `${data?.businessOwnerPassportNumber?.slice(0, 3)}XXXXXX`}
              </div>
            </div>

            <div className="col-4">
              <div className="font-weight-bold ">Online Business Address</div>
              <div className="text ">
                <TextBreaker
                  text={data?.businessAddress}
                  chunkSize={20}
                ></TextBreaker>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="font-weight-bold ">Business Category</div>
                <div className="text ">
                  {business.map((x) => {
                    return x + '၊';
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-1 ml-5 mr-5" style={{ background: '#f2f2f2' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <div className="font-weight-bold ">Online Sales Reg No</div>
              <div className="text">
                {data?.certificateNo}({NewIssuedDate?.split('T')[0]})
              </div>
            </div>
            <div className="col-4">
              <div className="font-weight-bold "> Issued Date</div>
              <div className="text ">{data?.issuedDate?.split('T')[0]}</div>
            </div>
            <div className="col-4">
              <div className="font-weight-bold ">Valid Date</div>
              <div className="text ">{data?.validDate?.split('T')[0]}</div>
            </div>

            <div className="col-12">
              <div className="font-weight-bold">Registered URLs</div>
              {/* <div className="text text-left">
                {url.map((x) => {
                  return x.attachment + ',';
                })}
              </div> */}
              <div className="text text-left">
                {url.map((x, index) => (
                  <span key={index}>
                    {x.attachment}
                    <br />
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="row text text-center ">
          <div className="col m-5">
            <p>Online Sales Business Logo</p>
            <img
              src={envConfig.imageUrl + onlineSaleLogo}
              alt="Online Sales Business Logo"
              className="QRLogo"
            ></img>
          </div>
          <div className="col m-5">
            <p>Registered QR Code</p>
            <img
              src={envConfig.qrUrl + data?.certificateNo + '.png'}
              alt="Registered QR Code"
              className="QRLogo"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyRegisteredInfo;

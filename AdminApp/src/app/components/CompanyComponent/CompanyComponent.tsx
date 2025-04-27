import { Radio } from 'antd';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Business from 'src/Models/Business';
import envConfig from 'src/app/config';
import GetCertificateCompany from './APIAction';

const CompanyComponent: React.FC = () => {
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
  const [, setBusiness] = useState<string[]>([]);

  useEffect(() => {
    const response = async () => {
      try {
        const result = await GetCertificateCompany(id);
        if (result) {
          const temp = JSON.parse(JSON.stringify(result));
          console.log('result', result);
          setData(temp);
          console.log('json result', temp);
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
            const lastLogo = onlineSaleLogoList[onlineSaleLogoList.length - 1];
             setOnlineSaleLogo(lastLogo?.fileName || lastLogo?.name);
            //setOnlineSaleLogo(
              //onlineSaleLogoList[0]?.fileName || onlineSaleLogoList[0]?.name
            //);
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    };

    response();
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

      <div className="text text-justify mt-5 pyidaungsu">
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

      <div className="card mt-5" style={{ background: '#f2f2f2' }}>
        <div className="card-body">
          <div className="row mb-5">
            <div className="col-3">
              <div className="text text-center">
                <b>Company Name (English)</b>
              </div>
              <div className="text text-center">{data?.businessName}</div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>Company Name (Myanmar)</b>
              </div>
              <div className="text text-center">
                {data?.businessNameMyanmar}
              </div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>Company Registration No.</b>
              </div>
              <div className="text text-center">{data?.companyRegNo}</div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>EIR Registration No.</b>
              </div>
              <div className="text text-center">{data?.eirRegNo}</div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-3">
              <div className="text text-center">
                <b>Owner Name</b>
              </div>
              <div className="text text-center">{data?.businessOwnerName}</div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>NRC Number</b>
              </div>
              <div className="text text-center">
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
            <div className="col-3">
              <div className="text text-center">
                <b>Online Business Name</b>
              </div>
              <div className="text text-center">{data?.businessName}</div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>Online Business Address</b>
              </div>
              <div className="text text-center">{data?.businessAddress}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-5" style={{ background: '#f2f2f2' }}>
        <div className="card-body">
          <div className="row mb-5">
            <div className="col-3">
              <div className="text text-center">
                <b>Registered URLs</b>
              </div>
              <div className="text text-left">
                <ul>
                  {url.map((x) => {
                    return <li>{x.attachment}</li>;
                  })}
                </ul>
              </div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>Online Sales Registration No</b>
              </div>
              <div className="text text-center">{data?.certificateNo}</div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>Issued Date</b>
              </div>
              <div className="text text-center">
                {data?.issuedDate?.split('T')[0]}
              </div>
            </div>
            <div className="col-3">
              <div className="text text-center">
                <b>Valid Date</b>
              </div>
              <div className="text text-center">
                {data?.validDate?.split('T')[0]}
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

      <div className="Message">
        <p>
          The certificate is issued by issued by Ministry of Commerce for Online
          Business,has been registered under the notification No.(.../2023) of
          Ministry of Commerce
        </p>
      </div>

      <br />
      <span className="note">Note:</span>
      <span className="footerCertificate">
        The certificate is generated on the basis of the information provided by
        applicant.
      </span>
    </div>
  );
};
export default CompanyComponent;

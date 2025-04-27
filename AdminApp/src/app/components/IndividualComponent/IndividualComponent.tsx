import { Row, Col, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import './IndividualComponent.Module.css';
import { useParams } from 'react-router-dom';
import Business from 'src/Models/Business';
import GetCertificateIndividual from './IndividualAPIAction';
import envConfig from 'src/app/config';

const IndividaulComponent: React.FC = () => {
  const { id: paramID } = useParams();
  let id = '';
  if (paramID) {
    id = paramID;
  }
  const [data, setData] = useState<Business>();
  const [url, setURL] = useState<string[]>([]);
  const [business, setBusiness] = useState<string[]>([]);
  useEffect(() => {
    const response = async () => {
      const result = await GetCertificateIndividual(id);
      if (result) {
        const temp: Business = JSON.parse(JSON.stringify(result));
        setData(temp);
        const websiteUrls: string[] = JSON.parse(temp.websiteUrls);
        const socialMediaUrls: string[] = JSON.parse(temp.socialMediaUrls);
        const mobileApplicationUrl: string[] = JSON.parse(
          temp.mobileApplicationUrl
        );
        const combinedArray = [
          ...websiteUrls,
          ...mobileApplicationUrl,
          ...socialMediaUrls,
        ].filter((item) => item !== '');
        setURL(combinedArray);

        const category: string[] = JSON.parse(temp.businessCategory);
        setBusiness(category);
      }
    };
    response();
  }, [id]);

  return (
    <Card>
      <div>
        <div className="main-heading">
          Certificate Of Online Sales Registration for Individual <br />
          {/* <span>(Sample Certificate)</span> */}
        </div>
        <br />
        <div className="certificate_container">
          <img
            src="/images/moc_onlineshop_registration.png"
            alt="Certificate Logo"
            style={{ maxHeight: '150px', padding: '20px' }}
            className="certificate-logo"
          />
          <h2 className="blue-text">
            <span>Government of the Republic of the Union of Myanmar</span>{' '}
            <br />
            <br />
            Ministry of Commerce <br /> Department of Trade
            <br />
            <br />
            <span className="title">
              CERTIFICATE OF ONLINE SALES REGISTRATION FOR COMPANY{' '}
            </span>
          </h2>
          <div className="dateinfo">
            <Row justify="end">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div className="label">Registration No</div>
              </Col>
              <Col xs={0} sm={0} md={0} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div className="RegistrationNo">{data?.certificateNo}</div>
              </Col>
            </Row>
            <Row justify="end">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div className="label">Issued Date</div>
              </Col>
              <Col xs={0} sm={0} md={0} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div className="IssuedDate">
                  {data?.issuedDate?.split('T')[0]}
                </div>
              </Col>
            </Row>
            <Row justify="end">
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div className="label">Valid Date</div>
              </Col>
              <Col xs={0} sm={0} md={0} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div className="ValidDate">
                  {' '}
                  {data?.validDate?.split('T')[0]}
                </div>
              </Col>
            </Row>
          </div>

          <div className="formdata">
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label">Name of Online Business</div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness">{data?.businessName}</div>
              </Col>
            </Row>
            <br />
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label">Type of Business</div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness">{data?.businessType}</div>
              </Col>
            </Row>
            <br />
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label">Category of Online Business</div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness">
                  {' '}
                  {business.map((x) => (
                    <div className="NameBusiness">{x}</div>
                  ))}
                </div>
              </Col>
            </Row>
            <br />
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label">Url</div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness">
                  {url.map((x) => (
                    <div className="NameBusiness">{x}</div>
                  ))}
                </div>
              </Col>
            </Row>
            <br />
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label">Owner Name</div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness">{data?.businessOwnerName}</div>
              </Col>
            </Row>
            <br />
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label">NRC Number.</div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness">
                  {/*data?.businessOwnerNrc?.replace(/\d{4}$/, 'XXXX')*/}
                  {data?.businessOwnerNrc?.replace(/.{4}$/, 'XXXX')}
                </div>
              </Col>
            </Row>
            <br />
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label">Contace eMail Address</div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">-</div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness">{data?.businessOwnerEmail}</div>
              </Col>
            </Row>
            <br />
            <Row justify="end">
              <Col xs={24} sm={7} md={7} lg={7} xl={7}>
                <div className="label"></div>
              </Col>
              <Col xs={0} sm={1} md={1} lg={1} xl={1}>
                <div className="label">
                  <img
                    src={data?.passportUrl}
                    alt="Owner"
                    style={{ maxHeight: '150px', padding: '20px' }}
                    className="Owner-Img"
                  />
                </div>
              </Col>
              <Col xs={24} sm={15} md={15} lg={15} xl={15}>
                <div className="NameBusiness"></div>
              </Col>
            </Row>
            <br />
          </div>
          <div className="Message">
            <p>
              The certificate is issued by issued by Ministry of Commerce for
              Online Business,has been registered under the notification
              No.(.../2023) of Ministry of Commerce
            </p>
          </div>
          <div className="QR">
            <Row gutter={[16, 16]}>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                className="left-column "
              >
                <Row>
                  <img
                    style={{ maxWidth: '250px' }}
                    src={envConfig.qrUrl + data?.certificateNo}
                    alt="QR Logo"
                  />
                </Row>
                <Row>Verify Here</Row>
                <Row>This QR Code is recognized by Ministry of Commerce</Row>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                className="right-column"
              >
                <Row>
                  <img
                    style={{ maxWidth: '250px' }}
                    src={envConfig.qrUrl + 'Sign.png'}
                    alt="Sign Logo"
                  />
                </Row>
                <Row>Director General</Row>
                <Row>Department of Trade</Row>
                <Row>Ministry of Commerce</Row>
              </Col>
            </Row>
          </div>
          <br />
          <span className="note">Note:</span>
          <span className="footerCertificate">
            The certificate is generated on the basis of the information
            provided by applicant.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default IndividaulComponent;

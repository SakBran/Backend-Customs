
import { Row, Col } from 'antd';
import './DetailRegComponent.Module.css';

const DetailRegComponent: React.FC = () => {
  return (
    <div>
      <div className='Head'>
          Detail Registered Information
      </div>
      <br/>
      <div>
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <div className="label">Name of Online Business</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="NameBusiness">ABC Online Shop</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <div className="label">Type of Business</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="Type">Goods</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <div className="label">Category of Online Business</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="category">Commerical Goods</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <div className="label">Online Business Address</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="address">Goods</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <div className="label">Registered URLs</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="url">www.abcshop.com</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="url">www.facebook.com/ABCOnline-shop/</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
            <div className="label">Company Name</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="company">ABC Skyblue Co ltd</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
            <div className="label">Company Registration No</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="Coregno">1000000001</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
            <div className="label">EIR Registration No</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="regno">1000000001</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              <div className="label">Owner Name</div>
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="url">U Kyaw Soe Min</div>
            </Col>
          </Row><br />
          <Row justify="end">
            <Col xs={24} sm={7} md={7} lg={7} xl={7}>
              NRC No
            </Col>
            <Col xs={0} sm={1} md={1} lg={1} xl={1}>
              <div className="label">-</div>
            </Col>
            <Col xs={24} sm={15} md={15} lg={15} xl={15}>
              <div className="url">7/PaMaNo(N)878585</div>
            </Col>
          </Row><br />
      </div>
      <div className="QR">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='left-column '>
              <Row>
                <img src="test.jpg" alt="QR Logo" />
              </Row>
              <Row>
                The certificate is issued
              </Row>
              <Row>
                The certificate is issued
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className='right-column' >
              <Row>
                <img src="test.jpg" alt="Sign Logo" />
              </Row>
              <Row>
                The certificate is issued
              </Row>
              <Row>
                The certificate is issued
              </Row>
            </Col>
          </Row>
        </div>
        <br />
    </div>
  );
};


export default DetailRegComponent;

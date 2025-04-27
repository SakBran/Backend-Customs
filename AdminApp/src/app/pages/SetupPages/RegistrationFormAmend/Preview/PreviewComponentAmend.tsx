import { Link, useParams } from 'react-router-dom';
import { Button, Checkbox, Divider, Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { GetStatus } from '../../RegistrationForm/GetStatusAPIService';
import RegistraionProps from '../../RegistrationForm/PropsType';
import BusinessInformationAmend from '../BusinessInformation/BusinessInformationAmend';
import EcommercePlatformAmend from '../EcommercePlatform/eCommercePlatformAmend';
import OwnerInformationAmend from '../OwnerInformation/OwnerInformationAmend';

const PreviewComponentAmend = ({
  next,
  prev,
  applyType,
  registrationType,
  setRegistrationType,
  includeButton,
  setId,
}: RegistraionProps) => {
  const { id: paramID } = useParams();
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [status, setStatus] = useState('');

  let id = '';
  if (paramID) {
    id = paramID;
  }

  const GetStatusFromAPI = useMemo(async () => await GetStatus(id), [id]);

  const onHandleNext = () => {
    next();
  };

  useEffect(() => {
    const APIAction = async () => {
      const status = await GetStatusFromAPI;

      if (status !== 'Reject' && status !== '') {
        setAgreeTerms(false);
      }
      setStatus(status);
    };
    APIAction();
  }, [GetStatusFromAPI]);

  return (
    <>
       {/*<div style={{ pointerEvents: 'none' }}>*/}
       <div>
        <BusinessInformationAmend
          next={next}
          prev={prev}
          id={id}
          setId={setId}
          applyType={'Amend'}
          includeButton={false}
          registrationType={registrationType}
          setRegistrationType={setRegistrationType}
        ></BusinessInformationAmend>
        <OwnerInformationAmend
          next={next}
          prev={prev}
          id={id}
          setId={setId}
          applyType={'Amend'}
          registrationType={registrationType}
          includeButton={false}
          setRegistrationType={setRegistrationType}
        ></OwnerInformationAmend>
        <EcommercePlatformAmend
          next={next}
          prev={prev}
          id={id}
          setId={setId}
          applyType={'Amend'}
          registrationType={registrationType}
          includeButton={false}
          setRegistrationType={setRegistrationType}
        ></EcommercePlatformAmend>
      </div>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
        onFinish={onHandleNext}
      >
        {/* <StepButtons
          next={onHandleNext}
          prev={prev}
          id={id ? id : ''}
        ></StepButtons> */}

        <Divider></Divider>
        <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
          {status === 'Reject' || status === '' ? (
            <>
              <Checkbox
                id="confrimBox"
                onChange={(e: CheckboxChangeEvent) => {
                  if (e.target.checked) {
                    setAgreeTerms(false);
                  } else {
                    setAgreeTerms(true);
                  }
                }}
              >
                I agree to{' '}
                <Link to="/TermsAndConditions">Terms & Conditions</Link>
              </Checkbox>
              <br />
              <br />
            </>
          ) : (
            ''
          )}

          {/*<Button type="primary" onClick={() => prev()}>
            Previous
          </Button>
          {'   '}

          <Button type="primary" htmlType="submit" disabled={agreeTerms}>
            {status === 'Reject' || status === '' ? 'Next' : 'Next'}
        </Button>*/}
        </Form.Item>
      </Form>
    </>
  );
};

export default PreviewComponentAmend;

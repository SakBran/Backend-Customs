import { useParams } from 'react-router-dom';
import BusinessInformation from '../BusinessInformation/BusinessInformation';
import EcommercePlatform from '../EcommercePlatform/eCommercePlatform';
import OwnerInformation from '../OwnerInformation/OwnerInformation';
import RegistraionProps from '../PropsType';
import { Form } from 'antd';

const PreviewComponent = ({
  next,
  prev,
  applyType,
  registrationType,
  setRegistrationType,
  includeButton,
  setId,
}: RegistraionProps) => {
  const { id: paramID } = useParams();

  let id = '';
  if (paramID) {
    id = paramID;
  }

  const onHandleNext = () => {
    next();
  };

  return (
    <>
      {/*<div style={{ pointerEvents: 'none' }}>*/}
      <div>
        <BusinessInformation
          next={next}
          prev={prev}
          id={id}
          setId={setId}
          applyType={'New'}
          includeButton={false}
          registrationType={registrationType}
          setRegistrationType={setRegistrationType}
        ></BusinessInformation>
        <OwnerInformation
          next={next}
          prev={prev}
          id={id}
          setId={setId}
          applyType={'New'}
          registrationType={registrationType}
          includeButton={false}
          setRegistrationType={setRegistrationType}
        ></OwnerInformation>
        <EcommercePlatform
          next={next}
          prev={prev}
          id={id}
          setId={setId}
          applyType={'New'}
          registrationType={registrationType}
          includeButton={false}
          setRegistrationType={setRegistrationType}
        ></EcommercePlatform>
      </div>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
        onFinish={onHandleNext}
      ></Form>
    </>
  );
};

export default PreviewComponent;

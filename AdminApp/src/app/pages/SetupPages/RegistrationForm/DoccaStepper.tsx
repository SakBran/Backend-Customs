import React, { useEffect, useState } from 'react';
import {
  Button,
  Empty,
  Modal,
  Radio,
  RadioChangeEvent,
  Steps,
  theme,
  message as antdMessage,
  Checkbox,
  Input,
} from 'antd';
import BusinessInformation from './BusinessInformation/BusinessInformation';
import OwnerInformation from './OwnerInformation/OwnerInformation';
import EcommercePlatform from './EcommercePlatform/eCommercePlatform';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PreviewComponent from './Preview/PreviewComponent';
import { GetApplyType, GetStatus } from './GetStatusAPIService';
import ApproveButton from 'src/app/components/ApproveButton/ApproveButton';
import { DocaSendDTO, RejectDTO } from 'src/Models/RejectDTO';
import { ApproveAPI, RejectAPI, SendToDOCCAAPI } from './APIAction';
import AppContext from 'src/app/components/Context/Context';
import TextArea from 'antd/es/input/TextArea';
import { GetMessageWithAll } from './GetMessageAPIService';
import { GetCheckedMessage } from './GetChedkedMessageAPIService';
import { GetApprovedMessage } from './GetApprovedMessageAPIService';
import PreviewComponentAmend from '../RegistrationFormAmend/Preview/PreviewComponentAmend';
import EcommercePlatformAmend from '../RegistrationFormAmend/EcommercePlatform/eCommercePlatformAmend';
import OwnerInformationAmend from '../RegistrationFormAmend/OwnerInformation/OwnerInformationAmend';
import BusinessInformationAmend from '../RegistrationFormAmend/BusinessInformation/BusinessInformationAmend';
import {
  GetFromValidDate,
  GetValidDate,
} from './GetValidDateForExtensionAPIService';
import DOCCAButton from 'src/app/components/DOCCAButton/DOCCAButton';

const DoccaStepper: React.FC = () => {
  const [registrationType, setRegistrationType] = useState('company');
  const [applyType, setApplyType] = useState('');
  const navigate = useNavigate();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const [ID, setID] = useState('');
  const [rejectMessage, setRejectMessage] = useState('');
  const [approvedMessage, setApprovedMessage] = useState('');
  const [message, setMessage] = useState('');
  const [checkedMessage, setCheckedMessage] = useState('');
  const [approveMessage, setApproveMessage] = useState('');
  const [extensionFromDate, setExtensionFromDate] = useState('');
  const [extensionToDate, setExtensionToDate] = useState('');
  const { id: paramID } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen_Approve, setIsModalOpen_Approve] = useState(false);
  const { data: contextData } = React.useContext(AppContext);
  const [isReject, setIsReject] = useState(false);
  const [isModalOpen_Docca, setIsModalOpen_Docca] = useState(false);
  const [doccaMessage, setDoccaMessage] = useState('');

  const location = useLocation();
  const isDoccaApprovedList = location.state?.source === 'DoccaApprovedList';

  // Add modal show function
  const showModal_Docca = () => {
    setIsModalOpen_Docca(true);
  };

  // Add handle OK function for DOCCA
  const handleOk_Docca = () => {
    if (!doccaMessage.trim()) {
      antdMessage.error('Docca message cannot be empty');
      return;
    }

    const data: DocaSendDTO = {
      id: id,
      // message: doccaMessage,
      message: '',
      userId: contextData?.userId ?? '' //add the user id from context
    };

    const response = async () => {
      await SendToDOCCAAPI(id, data);
      navigate('/RegistrationForm/RegistrationApproveList');
    };
    response();
    setIsModalOpen_Docca(false);
  };

  // Add cancel handler
  const handleCancel_Docca = () => {
    setDoccaMessage('');
    setIsModalOpen_Docca(false);
  };

  const SendToDOCCA = () => {
    showModal_Docca();
  };



  const handleCheckboxChange = (e: any) => {
    setIsReject(e.target.checked);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showModal_Approve = () => {
    setIsModalOpen_Approve(true);
  };

  const handleOk = () => {
    if (!rejectMessage.trim()) {
      antdMessage.error('Reject message cannot be empty');
      return;
    }

    const data: RejectDTO = {
      id: id,
      message: rejectMessage,
      isReject: isReject,
    };

    const response = async () => {
      await RejectAPI(id, data);
      if (contextData?.role) {
        const permission = contextData?.role;
        if (permission === 'Check User') {
          navigate('/RegistrationForm/RegistrationList');
        } else if (permission === 'Approve User') {
          navigate('/RegistrationForm/RegistrationApproveList');
        }
      }
    };
    response();
    setIsModalOpen(false);
  };

  const handleOk_Approve = () => {
    if (!approveMessage.trim()) {
      antdMessage.error('Approve message cannot be empty');
      return;
    }

    const data: RejectDTO = {
      id: id,
      message: approveMessage,
    };

    const response = async () => {
      await ApproveAPI(id, data);
      if (contextData?.role) {
        const permission = contextData?.role;
        if (permission === 'Check User') {
          navigate('/RegistrationForm/RegistrationList');
        } else if (permission === 'Approve User') {
          navigate('/RegistrationForm/RegistrationApproveList');
        }
      }
    };
    response();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setRejectMessage('');
    setIsModalOpen(false);
  };

  const handleCancel_Approve = () => {
    setApproveMessage('');
    setIsModalOpen_Approve(false);
  };

  let id = '';
  if (paramID) {
    id = paramID;
  }

  const Approve = () => {
    showModal_Approve();
  };

  const Reject = () => {
    showModal();
  };

  const steps = [
    {
      title: 'Business Information',
      content: (
        <>
          <BusinessInformation
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'New'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></BusinessInformation>
          <Button type="primary" onClick={() => next()}>
            {id === '' ? 'Submit' : 'Next'}
          </Button>
        </>
      ),
    },
    {
      title: 'Owner Information',
      content: (
        <>
          <OwnerInformation
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'New'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></OwnerInformation>
          <Button type="primary" onClick={() => prev()}>
            Previous
          </Button>
          {'   '}
          <Button type="primary" onClick={() => next()}>
            {id === '' ? 'Submit' : 'Next'}
          </Button>
        </>
      ),
    },
    {
      title: 'eCommerce Platform',
      content: (
        <>
          <EcommercePlatform
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'New'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></EcommercePlatform>
          <Button type="primary" onClick={() => prev()}>
            Previous
          </Button>
          {'   '}
          <Button type="primary" onClick={() => next()}>
            {id === '' ? 'Submit' : 'Next'}
          </Button>
        </>
      ),
    },
    {
      title: 'Preview',
      content: (
        <>
          <PreviewComponent
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'New'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></PreviewComponent>
          <Button type="primary" onClick={() => prev()}>
            Previous
          </Button>
          {'   '}

          {isDoccaApprovedList ? (
            <ApproveButton Approve={Approve} Turndown={Reject} />
          ) : (
            <DOCCAButton SendToDocca={SendToDOCCA} />
          )}
        </>
      ),
    },
  ];
  const stepsAmend = [
    {
      title: 'Business Information',
      content: (
        <>
          <BusinessInformationAmend
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'Amend'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></BusinessInformationAmend>
          <Button type="primary" onClick={() => next()}>
            {id === '' ? 'Submit' : 'Next'}
          </Button>
        </>
      ),
    },
    {
      title: 'Owner Information',
      content: (
        <>
          <OwnerInformationAmend
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'Amend'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></OwnerInformationAmend>
          <Button type="primary" onClick={() => prev()}>
            Previous
          </Button>
          {'   '}
          <Button type="primary" onClick={() => next()}>
            {id === '' ? 'Submit' : 'Next'}
          </Button>
        </>
      ),
    },
    {
      title: 'eCommerce Platform',
      content: (
        <>
          <EcommercePlatformAmend
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'Amend'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></EcommercePlatformAmend>
          <Button type="primary" onClick={() => prev()}>
            Previous
          </Button>
          {'   '}
          <Button type="primary" onClick={() => next()}>
            {id === '' ? 'Submit' : 'Next'}
          </Button>
        </>
      ),
    },
    {
      title: 'Preview',
      content: (
        <>
          <PreviewComponentAmend
            next={next}
            prev={prev}
            id={ID}
            setId={setID}
            applyType={'Amend'}
            includeButton={false}
            registrationType={registrationType}
            setRegistrationType={setRegistrationType}
          ></PreviewComponentAmend>
          <Button type="primary" onClick={() => prev()}>
            Previous
          </Button>
          {'   '}

          <ApproveButton Approve={Approve} Turndown={Reject} />
        </>
      ),
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const itemsAmend = stepsAmend.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    paddingTop: 16,
  };
  const noStyle: React.CSSProperties = {
    textAlign: 'center',
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: 16,
    paddingBottom: 16,
  };

  const onChange = (e: RadioChangeEvent) => {
    setRegistrationType(e.target.value);
  };

  //Don't need to add this step if it is Admin
  // useEffect(() => {
  //   if (id) {
  //     setID(id);
  //     const response = async () => {
  //       const result = await GetStatus(id);
  //       if (result === 'Payment Ready') {
  //         setCurrent(4);
  //       }
  //     };
  //     response();
  //   }
  // }, [id]);

  useEffect(() => {
    if (id) {
      const response = async () => {
        const resultCheckedMessage = await GetCheckedMessage(id);
        if (resultCheckedMessage !== '' || resultCheckedMessage !== null) {
          setCheckedMessage(resultCheckedMessage);
        }
      };
      response();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const response = async () => {
        const resultFromValidDate = await GetFromValidDate(id);
        if (resultFromValidDate !== null) {
          const formattedDate = new Date(
            resultFromValidDate
          ).toLocaleDateString('en-US');
          setExtensionFromDate(formattedDate);
        }
      };
      response();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const response = async () => {
        const resultValidDate = await GetValidDate(id);
        if (resultValidDate !== null) {
          const formattedDate = new Date(resultValidDate).toLocaleDateString(
            'en-US'
          );
          setExtensionToDate(formattedDate);
        }
      };
      response();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const response = async () => {
        const applyTypeTemp = await GetApplyType(id);
        if (applyTypeTemp === '' || applyTypeTemp === null) {
          setApplyType('New');
          console.log('Work');
        } else {
          setApplyType(applyTypeTemp);
          console.log('Work');
        }

        const resultApprovedMessage = await GetApprovedMessage(id);
        if (resultApprovedMessage !== '' || resultApprovedMessage !== null) {
          setApprovedMessage(resultApprovedMessage);
        }
      };
      response();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const response = async () => {
        const resultMessage = await GetMessageWithAll(id);
        if (resultMessage !== '' || resultMessage !== null) {
          setMessage(resultMessage);
        }
      };
      response();
    }
  }, [id]);

  /*useEffect(() => {
    if(checkedMessage === '' || checkedMessage === null)
    {
    if (id) {
      const response = async () => {
        const resultMessage = await GetMessage(id);
        console.log('Message',resultMessage);

        if(resultMessage !== '' || resultMessage !== null)
        {
          setCheckedMessage(resultMessage);
        }
      };
      response();
    }
  }
  }, [id]);*/

  const checkedMessageElement =
    checkedMessage !== '' || message !== '' || approvedMessage !== '' ? (
      <div>
        <p>Message : {message ? message : '-'}</p>
        <p>CheckedMessage : {checkedMessage ? checkedMessage : '-'}</p>
        <p>ApprovedMessage : {approveMessage ? approveMessage : '-'}</p>
        <p>DoccaMessage : {doccaMessage ? doccaMessage : '-'}</p>
      </div>
    ) : (
      ''
    );

  useEffect(() => {
    const dom = document.getElementById('forCompanySection');
    const companyName = document.getElementById('companyName');
    const individualName = document.getElementById('individualName');
    if (dom) {
      if (registrationType === 'company') {
        dom.style.display = 'block';
      } else {
        dom.style.display = 'none';
      }
    }

    if (companyName) {
      if (registrationType === 'company') {
        companyName.style.display = 'block';
      } else {
        companyName.style.display = 'none';
      }
    }
    if (individualName) {
      if (registrationType === 'company') {
        individualName.style.display = 'none';
      } else {
        individualName.style.display = 'block';
      }
    }
  }, [registrationType, current]);

  return (
    <>
      <Modal
        title="Reject Message"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <TextArea
            onChange={(e) => setRejectMessage(e.target.value)}
            showCount
            placeholder="Enter reject message"
            value={rejectMessage}
          ></TextArea>
        </div>
        <br />
        {applyType === 'New' && (
          <div style={{ marginBottom: 24 }}>
            <Checkbox onChange={handleCheckboxChange} checked={isReject}>
              {' '}
              Is Reject
            </Checkbox>
          </div>
        )}
      </Modal>

      <Modal
        title="Message"
        open={isModalOpen_Approve}
        onOk={handleOk_Approve}
        onCancel={handleCancel_Approve}
      >
        <div>
          <TextArea
            onChange={(e) => setApproveMessage(e.target.value)}
            showCount
            placeholder="Enter a message"
            value={approveMessage}
          ></TextArea>
        </div>
        <br />
      </Modal>
      {/* // Add Modal component in your JSX */}
      <Modal
        title="Send to DOCCA"
        open={isModalOpen_Docca}
        onOk={handleOk_Docca}
        onCancel={handleCancel_Docca}
      >
        <Input.TextArea
          value={doccaMessage}
          onChange={(e) => setDoccaMessage(e.target.value)}
          placeholder="Enter message for DOCCA"
        />
      </Modal>
      <br />
      <div
        className="text text-center"
        style={{ width: '100%', textAlign: 'center' }}
      >
        {checkedMessageElement}
        <h1 style={{ width: '100%', textAlign: 'center' }}>
          Online Sales Registration Form
        </h1>

        <br />

        <Radio.Group onChange={onChange} value={registrationType}>
          <Radio value="company" checked={true}>
            ကုမ္ပဏီ (သို့မဟုတ်) စီးပွားရေးအဖွဲ့အစည်းအတွက် လျှောက်ထားရန်
          </Radio>
          <Radio value="individual">
            Individual စီးပွားရေးအတွက် လျှောက်ထားရန်
          </Radio>
        </Radio.Group>
      </div>
      <br />
      <br />
      {applyType === 'Extension' ? (
        <>
          <h5 style={{ width: '100%', textAlign: 'center' }}>
            သက်တမ်း {extensionFromDate} မှ {extensionToDate} ထိ
            သက်တမ်းတိုးလျှောက်ထားပါသည်။
          </h5>
          <br />
          <br />
        </>
      ) : null}

      <Steps
        responsive={true}
        progressDot
        current={current}
        items={applyType === 'Amend' ? itemsAmend : items}
      />

      <div style={current !== 4 ? contentStyle : noStyle}>
        {applyType === 'Amend'
          ? stepsAmend[current].content
          : steps[current].content}
      </div>
    </>
  );
};

export default DoccaStepper;

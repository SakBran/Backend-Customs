import {
  Form,
  Input,
  Button,
  Upload,
  Space,
  UploadFile,
  Spin,
  FormInstance,
  Radio,
  RadioChangeEvent,
  Typography,
  Modal,
  Select,
  Card,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import AmendComponent from 'src/app/components/AmendComponent/AmendComponent';
import { ReactNode, useEffect, useState } from 'react';
import useFileUploadNoCrop from 'src/app/Hooks/useFileUploadWithoutCrop';
import { AnyObject } from 'src/Models/AnyObject';
import React from 'react';
import useFileUpload from 'src/app/Hooks/useFileUpload';
import ImgCrop from 'antd-img-crop';
import { useParams } from 'react-router-dom';
import envConfig from 'src/app/config';
import useReadOnly from 'src/app/Hooks/useReadonly';
import NRCComponent from 'src/app/components/NRCComponent/NRCComponent';
import AttachmentSetup from 'src/Models/AttachmentSetup';
import RegistraionProps from '../../RegistrationForm/PropsType';
import { GetAttachmentSetup } from '../../RegistrationForm/BusinessInformation/APIActions';
import {
  Step2Get,
  Step2Put,
} from '../../RegistrationForm/OwnerInformation/APIActions';
import StepButtons from '../../RegistrationForm/StepButtomComponent';
import Step2DtoAmend from '../Model/Step2DTOAmend';
import MultipleForDoubleAmendComponent from 'src/app/components/AmendComponent/MultipleForDoubleAmendComponent';
import MultipleCheckMarkAmendComponent from 'src/app/components/AmendComponent/MultipleCheckMarkAmendComponent';
import DynamicTooltip, {
  GetHistoryRequestDTO,
} from 'src/app/components/DynamicTooltip/DynamicTooltipComponent';
import axiosInstance from 'src/app/services/AxiosInstance';
import './PhotoLink.css'

const { Text } = Typography;
const { Option } = Select;
const OwnerInformationAmend = ({
  next,
  prev,
  applyType,
  registrationType,
  setRegistrationType,
  includeButton,
}: RegistraionProps) => {
  const { id: paramID } = useParams();
  let id = '';
  if (paramID) {
    id = paramID;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [ownerInfo, setOwnerInfo] = useState<boolean>(false);
  const [ownerAddress, setOwnerAddress] = useState<boolean>(false);
  const { readOnly } = useReadOnly();

  //New Code Added for attachment
  type attachment = {
    attachment: string;
    file: string;
  };
  type Photofile ={
    uid: string;
    name: string;
    status: string;
    url: string;
  }
  const defaultAttachment = { attachment: '', file: '' };
  const [attachSetup, setAttachSetup] = useState<AttachmentSetup[]>([]);
  useEffect(() => {
    const response = async () => {
      const result = await GetAttachmentSetup();
      console.log(result);
      if (result) {
        const temp: AttachmentSetup[] = result.filter(
          (x) => x.step === 'Step 2' && x.registrationType === registrationType
        );
        setAttachSetup(temp);
      }
    };
    response();
  }, [registrationType]);

  const [attachments, setAttachments] = useState<attachment[]>([
    defaultAttachment,
  ]);
  const handleAddAttachment = () => {
    const updatedUrls = [...attachments].map((data, index) => {
      if (index === attachments.length - 1) {
        const temp = data;
        temp.file = fileList_Attachment[fileList_Attachment.length - 1]?.name;
        return temp;
      } else {
        return data;
      }
    });

    setAttachments([...updatedUrls, defaultAttachment]);
    setFileList([]);
  };
  const handleAttachmentChange = (e: string) => {
    const updatedUrls = [...attachments].map((data, index) => {
      if (index === attachments.length - 1) {
        const temp = data;
        temp.attachment = e;
        return temp;
      } else {
        return data;
      }
    });
    setAttachments(updatedUrls);
  };

  const CheckIsOtherAttachmentValid = (): boolean => {
    console.log(attachments);
    // Filter the required attachments
    const requiredAttachments = attachSetup.filter(
      (x) => x.isRequired === true
    );

    // Check if there are any required attachments
    if (requiredAttachments.length > 0) {
      // Use Array.every to check if all required attachments are in the attachments array
      return requiredAttachments.every((attachment) => {
        return attachments.some(
          (x) => x.attachment === attachment.title && x.file !== ''
        );
      });
    } else {
      // If there are no required attachments, return true
      return true;
    }
  };

  //New Code Added for attachment

  const formRef = React.useRef<FormInstance>(null);
  const imageFilter = (data: AnyObject, fileList: AnyObject) => {
    const datalist: UploadFile[] = [];
    try {
      data.fileList.forEach((file: UploadFile) => {
        if (!file.response) {
          datalist.push(file);
        }
      });
      return datalist;
    } catch (ex) {
      //console.error(ex);
      return fileList;
    }
  };

  const newEdit = (values: AnyObject) => {
    const data: Step2DtoAmend = JSON.parse(JSON.stringify(values));
    const response = async () => {
      const result = await Step2Put(id, data);
      if (result) {
        setLoading(false);
        next();
      }
    };
    response();
  };
  const showWarning = (content: string) => {
    Modal.warn({
      title: 'Invalid',
      content,
    });
    setLoading(false);
  };

  const onFinish = (values: AnyObject) => {
    // if (applyType === 'New' || applyType === 'Amend') {
    if (fileListPhotoFile.length === 0) {
      showWarning('Passport size Photoတွဲပေးရန် လိုအပ်ပါသည်။');
      return;
    }
    if (values.businessOwnerCitizenType === 'Citizen') {
      if (fileList_Nrcf.length === 0 || fileList_Nrcb.length === 0) {
        showWarning('မှတ်ပုံတင် Scan တွဲပေးရန် လိုအပ်ပါသည်။');
        return;
      }

      if (
        !values.nrcCode ||
        !values.nrcPrefix ||
        !values.nrcType ||
        !values.nrcNo
      ) {
        showWarning('မှတ်ပုံတင် နံပါတ်ထည့်ပေးရန် လိုအပ်ပါသည်။');
        return;
      }
    }

    if (values.businessOwnerCitizenType === 'Foreigner') {
      if (!values.passportNumber || values.passportNumber === '') {
        showWarning('You need to add passport number');
        return;
      }

      if (fileList_Passport.length === 0 || !fileList_Passport) {
        showWarning('You need to attach passport scan');
        return;
      }
    }

    if (!values.ownerNameEnglish && !values.ownerNameMyanmar) {
      showWarning(
        'Owner Name အားEnlgish(သို့မဟုတ်)မြန်မာလိုဖြည့်ပေးရန် လိုအပ်ပါသည်။'
      );
      return;
    }

    if (values.ownerNameEnglish === '' && values.ownerNameMyanmar === '') {
      showWarning(
        'Owner Name အားEnlgish(သို့မဟုတ်)မြန်မာလိုဖြည့်ပေးရန် လိုအပ်ပါသည်။'
      );
      return;
    }
    //Check new Attachment
    if (CheckIsOtherAttachmentValid() === false) {
      showWarning('Attachmentsများ တွဲပေးရန် လိုအပ်ပါသည်။');
      return;
    }
    //Check new Attachment
    if (values['ownerAddress'] !== '' && Address_fileList.length === 0) {
      showWarning(
        ' ပိုင်ရှင်လိပ်စာမှန်ကန်ကြောင်းရပ်ကွက်ထောက်ခံစာ Attachment တွဲပေးရန် လိုအပ်ပါသည်။'
      );
      return;
    }
    values['passportPhoto'] = JSON.stringify(
      imageFilter(values['passportPhoto'], fileListPhotoFile)
    );
    values['nrcScan'] = JSON.stringify(
      imageFilter(values['nrcScan'], fileList_Nrcf)
    );

    values['nrcCode'] = values['nrcCode']?.toString();
    values['nrcScanBack'] = JSON.stringify(
      imageFilter(values['nrcScanBack'], fileList_Nrcb)
    );
    values['passportScanAttachment'] = JSON.stringify(
      imageFilter(values['passportScanAttachment'], fileList_Passport)
    );
    values['attachment'] = JSON.stringify(attachments);

    values['ownerAddressAttachment'] = JSON.stringify(
      imageFilter(values['ownerAddressAttachment'], Address_fileList)
    );

    setLoading(true);
    const passData: Step2DtoAmend = JSON.parse(JSON.stringify(values));
    passData.companyOrIndividualType = registrationType;

    newEdit(passData);
  };
  // };

  const {
    fileList: fileListPhotoFile,
    setFileList: setFileListPhotoFile,
    imageCropFunction: beforeUploadPhotoFile,
    onPreview: onPreviewPhotoFile,
    onChange: onChangePhotoFile,
  } = useFileUpload();

  const {
    fileList: fileList_Attachment,
    beforeUpload: beforeUpload_Attachment,
    onPreview: onPreview_Attachment,
    setFileList,
    onChange: onChange_Attachment,
  } = useFileUploadNoCrop();

  const {
    fileList: fileList_Nrcf,
    setFileList: setFileList_Nrcf,
    imageCropFunction: beforeUpload_Nrcf,
    onPreview: onPreview_Nrcf,
    onChange: onChange_Nrcf,
  } = useFileUpload();

  const {
    fileList: fileList_Nrcb,
    setFileList: setFileList_Nrcb,
    imageCropFunction: beforeUpload_Nrcb,
    onPreview: onPreview_Nrcb,
    onChange: onChange_Nrcb,
  } = useFileUpload();

  const {
    fileList: fileList_Passport,
    setFileList: setfileList_Passport,
    beforeUpload: beforeUpload_Passport,
    onPreview: onPreview_Passport,
    onChange: onChange_Passport,
  } = useFileUploadNoCrop();

  const {
    fileList: Address_fileList,
    setFileList: Address_setFileList,
    beforeUpload: Address_imageCropFunction,
    onPreview: Address_onPreview,
    onChange: Address_onChange,
  } = useFileUploadNoCrop();

  const hideAndShow = (temp: string) => {
    if (temp === 'Citizen') {
      const citizenDom = document.getElementById('citizen');
      const foreignerDom = document.getElementById('foreigner');
      if (citizenDom) {
        citizenDom.style.display = 'block';
      }
      if (foreignerDom) {
        foreignerDom.style.display = 'none';
      }
    } else {
      const citizenDom = document.getElementById('citizen');
      const foreignerDom = document.getElementById('foreigner');
      if (citizenDom) {
        citizenDom.style.display = 'none';
      }
      if (foreignerDom) {
        foreignerDom.style.display = 'block';
      }
    }
  };

  useEffect(() => {
    if (id !== '') {
      setLoading(true);
      const response = async () => {
        const result = await Step2Get(id);
        fetchOriginalAttachmentData();
        fetchOriginalPhotoData();
        fetchNrcForiginalData(); // nrcf
        fetchNrcBackOriginalData(); // nrcb
        fetchAddressFileOriginalData(); // addressfile
        fetchBusinessOwnerAttachmentData(); //attachement
        fetchOriginalPassportScan();//PassportScanAttachemt



        if (result) {
          formRef.current?.setFieldsValue(result);
          const temp: Step2DtoAmend = JSON.parse(JSON.stringify(result));
          setRegistrationType(temp.companyOrIndividualType);
          try {
            if (result['passportPhoto'] !== null) {
              setFileListPhotoFile(JSON.parse(result['passportPhoto']));
            }
            if (result['nrcScan'] !== null) {
              setFileList_Nrcf(JSON.parse(result['nrcScan']));
            }
            if (result['nrcScanBack'] !== null) {
              setFileList_Nrcb(JSON.parse(result['nrcScanBack']));
            }
            if (result['attachment'] !== null) {
              //setFileList_Attachment(JSON.parse(result['attachment']));
              setAttachments(JSON.parse(result['attachment']));
            }

            if (result['ownerAddressAttachment'] !== null) {
              Address_setFileList(JSON.parse(result['ownerAddressAttachment']));
            }

            if (result['passportScanAttachment'] !== null) {
              if (result['passportScanAttachment'] !== null) {
                setfileList_Passport(
                  JSON.parse(result['passportScanAttachment'])
                );
              }
            }
            if (result['businessOwnerCitizenType'] !== null) {
              hideAndShow(result['businessOwnerCitizenType']);
            }
            if (!result['businessOwnerCitizenType']) {
              formRef.current?.setFieldsValue({
                businessOwnerCitizenType: 'Citizen',
              });
            }
          } catch (ex) {
            const error = ex;
            console.log(error);
          }

          setLoading(false);
        } else {
          formRef.current?.setFieldsValue({
            businessOwnerCitizenType: 'Citizen',
          });
        }
      };
      response();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChangeRadio = (e: RadioChangeEvent) => {
    hideAndShow(e.target.value);
  };

  useEffect(() => {
    const companyName = document.getElementById('companyName');
    const individualName = document.getElementById('individualName');

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

    const foreignerDom = document.getElementById('foreigner');
    if (foreignerDom) {
      foreignerDom.style.display = 'none';
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [buttonComponent, setButtonComponent] = useState<ReactNode>('');
  const setButton = () => {
    if (includeButton) {
      setButtonComponent(
        <StepButtons next={next} prev={prev} id={id}></StepButtons>
      );
    } else {
      setButtonComponent('');
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  //Attachment Check Region Start
  const [original, setOriginal] = useState<attachment[]>([]);
  const fetchOriginalAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'businessOwnerAttachment',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setOriginal(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setOriginal([]);
    } finally {
      setLoading(false);
    }
  };
  const checkIsOriginal = (url: string): string => {
    let result = 'green';
    original?.forEach((item: attachment) => {
      if (item.file === url) {
        result = 'blue';
      }
    });

    return result;
  };
  //Attachment Check Region End

  //#region Photo Check Region Start
  const [photooriginal, setphotoOriginal] = useState<Photofile[]>([]);
  const fetchOriginalPhotoData = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        'Common/GetAttachmentDifference?id=' +
          id +
          '&fieldName=PassportSizePhoto'
      );
      console.log("Response Data log",response.data);
      setphotoOriginal(JSON.parse(response.data.passportSizePhoto)); // Adjust according to your API response
    } catch (error) {
      setphotoOriginal([]);
    } finally {
      setLoading(false);
    }
  };
    const checkIsPhotoOriginal = (url: string): boolean => {
      console.log("Check url",url);
      let result = true;
      console.log("Check valuelist",photooriginal);
      photooriginal?.forEach((item: Photofile) => {
        
        if (item.name === url) {
          result = false;
        }
        console.log("Check value",item.name);
    });
    console.log("Check file",photooriginal);
    console.log("Check result",result);
    return result;
    
  };
  //#endregion Photo Check Region End

  //#region PassportScan Check Region Start
  const [PassportScanoriginal, setPassportScanOriginal] = useState<Photofile[]>([]);
  const fetchOriginalPassportScan = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        'Common/GetAttachmentDifference?id=' +
          id +
          '&fieldName=PassportUrl'
      );
      console.log("Response Data log",response.data);
      setPassportScanOriginal(JSON.parse(response.data.PassportUrl)); // Adjust according to your API response
    } catch (error) {
      setPassportScanOriginal([]);
    } finally {
      setLoading(false);
    }
  };
    const checkIsPassportScanOriginal = (url: string): boolean => {
      console.log("Check url",url);
      let result = true;
      console.log("Check valuelist",PassportScanoriginal);
      PassportScanoriginal?.forEach((item: Photofile) => {
        
        if (item.name === url) {
          result = false;
        }
        console.log("Check value",item.name);
    });
    console.log("Check file",PassportScanoriginal);
    console.log("Check result",result);
    return result;
    
  };
  //#endregion PassportScan Check Region End

  //#region NrcF Check Start
  const [nrcForiginal, setNrcForiginal] = useState<Photofile[]>([]);
  const fetchNrcForiginalData = async () => {
    setLoading(true);

    try {
      const resp = await axiosInstance.get(
        'Common/GetAttachmentDifference?id=' + id + '&fieldName=nrcFrontUrl'
      );
      console.log("Response Data log",resp.data);
      const mappedData = {
        ...resp.data,
        nrcScan: resp.data.nrcFrontUrl
      };
      setNrcForiginal(JSON.parse(mappedData.nrcScan));
    } catch (error) {
      setNrcForiginal([]);
    } finally {
      setLoading(false);
    }
  }

  const checkIsNrcForiginal = (url: string): boolean => {
    let result = true;
    nrcForiginal?.forEach((item: Photofile) => {
      if (item.name === url){
        result = false;
      }
    });
    return result;
  }
  //#endregion NrcF Check End

  //#region NrcB Check Start
  const [nrcBackOriginal, setNrcBackOriginal] = useState<Photofile[]>([]);
  const fetchNrcBackOriginalData = async () => {
  setLoading(true);

    try{
      const response = await axiosInstance.get(
        'Common/GetAttachmentDifference?id=' + id+ '&fieldName=nrcBackUrl'
      );
      console.log('Response Nrc Back Data log', response.data);
      const mappedData = {
        ...response.data,
        nrcScanBack: response.data.nrcBackUrl
      };
      setNrcBackOriginal(JSON.parse(mappedData.nrcScanBack));
    } catch (error) {
      setNrcBackOriginal([]);
    } finally {
      setLoading(false);
    }
  }

//? nrcScanBack

const checkIsNrcBackOriginal = (url: string) : boolean => {
  let result = true;
  nrcBackOriginal?.forEach((item: Photofile) => {
    if (item.name === url) {
      result = false;
    }
  });
  console.log("check result :", result);
  return result;
}
  //#endregion NrcB Check End

    //#region address Check Region Start 
const [AddressFileOriginal, setAddressFileOriginal] = useState<Photofile[]>([]);
const fetchAddressFileOriginalData = async () => {
  setLoading(true);

  try {
    const response = await axiosInstance.get(
      'Common/GetAttachmentDifference?id=' + id+ '&fieldName=ownerAddressAttachment'
    );
    console.log('Response Nrc Data log', response.data);
    const mappedData = {
      ...response.data,
      addressFile: response.data.ownerAddressAttachment
    };
    setAddressFileOriginal(JSON.parse(mappedData.addressFile));
  }catch (error) {
    setAddressFileOriginal([]);
  } finally {
    setLoading(false);
  }
};

const checkIsAddressFileOriginal = (url: string) : boolean => {
  let result = true;
  AddressFileOriginal?.forEach((item: Photofile) => {
    if (item.name === url) {
      result = false;
    }
  });
  console.log("Result for AddressFileOriginal",result);
  return result;
}
  //#endregion address Check Region End

    //#region "businessOwnerAttachment" Check Region Start
const [BusinessOwnerAttachment, setBusinessOwnerAttachment] = useState<Photofile[]>([]);
const fetchBusinessOwnerAttachmentData = async () => {
  setLoading(true);
  try{
    const resp = await axiosInstance.get(
      'Common/GetAttachmentDifference?id=' + id+ '&fieldName=businessOwnerAttachment'
    );
    console.log('Response BusinessOwnerAttachment log' , resp.data);
    const mappedData = {
      ...resp.data,
      attachment: resp.data.businessOwnerAttachment
    }
    setBusinessOwnerAttachment(JSON.parse(mappedData.attachment));
     
    }catch (error) {
      setBusinessOwnerAttachment([]);
      } finally {
        setLoading(false);
  }
};

const checkIsBusinessOwnerAttachment = (url: string) : boolean => {
  let result = true;
  BusinessOwnerAttachment?.forEach((item: Photofile) => {
    if (item.name === url) {
      result = false;
    }
  });
  console.log("Result for AddressFileOriginal",result);
  return result;
}
  //#endregion "businessOwnerAttachment" Check Region End
  useEffect(() => {
    setButton();
  }, []);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Form
        ref={formRef}
        onFinish={onFinish}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
      >
        {/* <div id="companyName">
          <Form.Item
            label={
              <>
                <Text type="danger">*</Text>Managing Director Name/Director Name
              </>
            }
          >
            <Space direction="horizontal">
              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameEnglish'}
              >
                <Form.Item name="ownerNameEnglish">
                  <Space>
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="(in English)"
                    />
                    <DynamicTooltip
                      fieldName={'businessOwnerName'}
                      id={+id}
                    ></DynamicTooltip>
                  </Space>
                </Form.Item>
              </MultipleForDoubleAmendComponent>

              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameMyanmar'}
              >
                <Form.Item name="ownerNameMyanmar">
                  <Space>
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="(in Myanmar)"
                    />
                    <DynamicTooltip
                      fieldName={'businessOwnerNameMyanmar'}
                      id={+id}
                    ></DynamicTooltip>
                  </Space>
                </Form.Item>
              </MultipleForDoubleAmendComponent>
            </Space>
          </Form.Item>
        </div>

        <div id="individualName">
          <Form.Item
            label={
              <>
                <Text type="danger">*</Text>Business Owner Name
              </>
            }
          >
            <Space direction="horizontal">
              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameEnglish'}
              >
                <Form.Item name="ownerNameEnglish">
                  <Space>
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="(in English)"
                    />
                    <DynamicTooltip
                      fieldName={'businessOwnerName'}
                      id={+id}
                    ></DynamicTooltip>
                  </Space>
                </Form.Item>
              </MultipleForDoubleAmendComponent>

              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameMyanmar'}
              >
                <Form.Item name="ownerNameMyanmar">
                  <Space>
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="(in Myanmar)"
                    />
                    <DynamicTooltip
                      fieldName={'businessOwnerNameMyanmar'}
                      id={+id}
                    ></DynamicTooltip>
                  </Space>
                </Form.Item>
              </MultipleForDoubleAmendComponent>
            </Space>
          </Form.Item>
        </div> */}

        <div id="companyName">
          <Form.Item
            label={
              <>
                <Text type="danger">*</Text>Managing Director Name/Director Name
              </>
            }
          >
            <Space direction="horizontal">
              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameEnglish'}
              >
                <Form.Item name="ownerNameEnglish">
                  <Input prefix={<UserOutlined />} placeholder="(in English)" />
                </Form.Item>
              </MultipleForDoubleAmendComponent>
              <Form.Item>
                <DynamicTooltip
                  fieldName={'businessOwnerName'}
                  id={+id}
                ></DynamicTooltip>
              </Form.Item>

              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameMyanmar'}
              >
                <Form.Item name="ownerNameMyanmar">
                  <Input prefix={<UserOutlined />} placeholder="(in Myanmar)" />
                </Form.Item>
              </MultipleForDoubleAmendComponent>
              <Form.Item>
                <DynamicTooltip
                  fieldName={'businessOwnerNameMyanmar'}
                  id={+id}
                ></DynamicTooltip>
              </Form.Item>
            </Space>
          </Form.Item>
        </div>

        <div id="individualName">
          <Form.Item
            label={
              <>
                <Text type="danger">*</Text>Business Owner Name
              </>
            }
          >
            <Space direction="horizontal">
              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameEnglish'}
              >
                <Form.Item name="ownerNameEnglish">
                  <Input prefix={<UserOutlined />} placeholder="(in English)" />
                </Form.Item>
              </MultipleForDoubleAmendComponent>
              <Form.Item>
                <DynamicTooltip
                  fieldName={'businessOwnerName'}
                  id={+id}
                ></DynamicTooltip>
              </Form.Item>

              <MultipleForDoubleAmendComponent
                amendName="isOwnerInfo"
                check={ownerInfo}
                setCheck={setOwnerInfo}
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameMyanmar'}
              >
                <Form.Item name="ownerNameMyanmar">
                  <Input prefix={<UserOutlined />} placeholder="(in Myanmar)" />
                </Form.Item>
              </MultipleForDoubleAmendComponent>
              <Form.Item>
                <DynamicTooltip
                  fieldName={'businessOwnerName'}
                  id={+id}
                ></DynamicTooltip>
              </Form.Item>
            </Space>
          </Form.Item>
        </div>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'businessOwnerCitizenType'}
          label="Citizen Type"
        >
          <Form.Item
            noStyle
            name="businessOwnerCitizenType"
            rules={[
              {
                required: true,
                message: 'Please select',
              },
            ]}
          >
            <Radio.Group onChange={onChangeRadio} disabled={true}>
              <Radio value={'Citizen'} checked={true}>
                Citizen
              </Radio>
              <Radio value={'Foreigner'}>Foreigner</Radio>
            </Radio.Group>
          </Form.Item>
        </AmendComponent>

        <MultipleCheckMarkAmendComponent
          amendName="isOwnerInfo"
          check={ownerInfo}
          setCheck={setOwnerInfo}
          readOnly={readOnly}
          applyType={applyType}
          name={'passportPhoto'}
          label="Passport Size Photo"
        >
          <Form.Item noStyle name="passportPhoto">
            <ImgCrop beforeCrop={beforeUploadPhotoFile}>
              <Upload
                accept="image/jpg,image/png,image/jpeg"
                fileList={fileListPhotoFile}
                onChange={onChangePhotoFile}
                action={
                  envConfig.baseUrl +
                  'Upload/Postupload?filename=' +
                  fileListPhotoFile[fileListPhotoFile.length - 1]?.name
                }
                onPreview={onPreviewPhotoFile}
                showUploadList={{ showRemoveIcon: false }}

                itemRender={(originNode, file) => {
                  const isOriginal = checkIsPhotoOriginal(file.name);
                  const className = isOriginal ? 'new-file-color' : ''; // Apply class conditionally
        
                  return (
                    <div className={className}>
                      {originNode} {/* Render the original node with the conditional class */}
                    </div>
                  );
                }}
              >
                <Button icon={<UploadOutlined />}>
                  Upload Passport Size Photo
                </Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
        </MultipleCheckMarkAmendComponent>

        <div id="citizen">
          <NRCComponent
            check={ownerInfo}
            setCheck={setOwnerInfo}
            amendName="isOwnerInfo"
            applyType={applyType}
            formRef={formRef}
          />

          <MultipleCheckMarkAmendComponent
            amendName="isOwnerInfo"
            check={ownerInfo}
            setCheck={setOwnerInfo}
            readOnly={readOnly}
            applyType={applyType}
            name={'nrcScan'}
            label="NRC Scan-Attachment (Frontside)"
          >
            <Form.Item noStyle name="nrcScan">
              <ImgCrop
                cropShape="rect"
                zoomSlider={true}
                aspectSlider={true}
                beforeCrop={beforeUpload_Nrcf}
              >
                <Upload
                  accept="image/jpg,image/png,image/jpeg"
                  fileList={fileList_Nrcf}
                  onChange={onChange_Nrcf}
                  action={
                    envConfig.baseUrl +
                    'Upload/Postupload?filename=' +
                    fileList_Nrcf[fileList_Nrcf.length - 1]?.name
                  }
                  onPreview={onPreview_Nrcf}
                  itemRender={(original, file) => {
                    const isOriginal = checkIsNrcForiginal(file.name);
                    const className = isOriginal ? 'new-file-color' : "";

                    return (
                      <div className={className}>
                        {original}{/* Render the original node with the conditional class */}
                      </div>
                    )
                  }}
                  // showUploadList={{ showRemoveIcon: false }}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload NRC Scan-Attachment (Front)
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </MultipleCheckMarkAmendComponent>

          <MultipleCheckMarkAmendComponent
            amendName="isOwnerInfo"
            check={ownerInfo}
            setCheck={setOwnerInfo}
            readOnly={readOnly}
            applyType={applyType}
            name={'nrcScanBack'}
            label="NRC Scan-Attachment (Backside)"
          >
            <Form.Item noStyle name="nrcScanBack">
              <ImgCrop
                cropShape="rect"
                zoomSlider={true}
                aspectSlider={true}
                beforeCrop={beforeUpload_Nrcb}
              >
                <Upload
                  accept="image/jpg,image/png,image/jpeg"
                  fileList={fileList_Nrcb}
                  onChange={onChange_Nrcb}
                  action={
                    envConfig.baseUrl +
                    'Upload/Postupload?filename=' +
                    fileList_Nrcb[fileList_Nrcb.length - 1]?.name
                  }
                  onPreview={onPreview_Nrcb}
                  itemRender={(originalNode, file) => {
                    const isOriginal = checkIsNrcBackOriginal(file.name);
                    const className = isOriginal ? 'new-file-color' : '';

                    return (
                      <div className={className}>
                        {originalNode} {/* Render the original node with the conditional class */}
                      </div>
                    )
                  }}
                  
                  showUploadList={{ showRemoveIcon: false }}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload NRC Scan-Attachment (Back)
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </MultipleCheckMarkAmendComponent>
        </div>

        <div id="foreigner">
          <MultipleCheckMarkAmendComponent
            amendName="isOwnerInfo"
            check={ownerInfo}
            setCheck={setOwnerInfo}
            readOnly={readOnly}
            applyType={applyType}
            name={'passportNumber'}
            label={
              <>
                <DynamicTooltip
                  fieldName={'businessOwnerNameMyanmar'}
                  id={+id}
                ></DynamicTooltip>
                &nbsp;Passport Number
              </>
            }
          >
            <Form.Item noStyle name="passportNumber">
              <Input
                prefix={<UserOutlined />}
                placeholder="Business Owner passport number"
              />
            </Form.Item>
          </MultipleCheckMarkAmendComponent>

          <MultipleCheckMarkAmendComponent
            amendName="isOwnerInfo"
            check={ownerInfo}
            setCheck={setOwnerInfo}
            readOnly={readOnly}
            applyType={applyType}
            name={'passportScanAttachment)'}
            label={
              <span>
                Passport Scan Attachement <br />
                (Passport Page 1)
              </span>
            }
          >
            <Form.Item noStyle name="passportScanAttachment">
              <ImgCrop
                cropShape="rect"
                zoomSlider={true}
                aspectSlider={true}
                beforeCrop={beforeUpload_Passport}
              >
                <Upload
                  accept="image/jpg,image/png,image/jpeg"
                  //beforeUpload={beforeUpload_Passport}
                  fileList={fileList_Passport}
                  onChange={onChange_Passport}
                  action={
                    envConfig.baseUrl +
                    'Upload/Postupload?filename=' +
                    fileList_Passport[fileList_Passport.length - 1]?.name
                  }
                  onPreview={onPreview_Passport}
                  itemRender={(originalNode, file) => {
                    const isOriginal = checkIsPassportScanOriginal(file.name);
                    const className = isOriginal ? 'new-file-color' : '';

                    return (
                      <div className={className}>
                        {originalNode} {/* Render the original node with the conditional class */}
                      </div>
                    )
                  }}
                  showUploadList={{ showRemoveIcon: false }}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Passport Page 1
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </MultipleCheckMarkAmendComponent>
        </div>

        <MultipleCheckMarkAmendComponent
          amendName="isOwnerAddress"
          check={ownerAddress}
          setCheck={setOwnerAddress}
          readOnly={readOnly}
          applyType={applyType}
          name={'ownerAddress'}
          label={
            <>
              <DynamicTooltip
                fieldName={'businessOwnerAddress'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>Business Owner Address
            </>
          }
        >
          <Form.Item
            noStyle
            name="ownerAddress"
            rules={[
              {
                required: true,
                message: 'Please enter the business owner address',
              },
            ]}
          >
            <Input.TextArea placeholder="Business Owner Address" />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>

        <MultipleCheckMarkAmendComponent
          amendName="isOwnerAddress"
          check={ownerAddress}
          setCheck={setOwnerAddress}
          readOnly={readOnly}
          applyType={applyType}
          name={'addressFile'}
          label={
            <span>
              ပိုင်ရှင်လိပ်စာမှန်ကန်ကြောင်း
              <br /> ရပ်ကွက်ထောက်ခံစာ
              <br />
              Attachment တွဲပေးရန်
              <br />
              ...
            </span>
          }
        >
          <Form.Item noStyle name="addressFile">
            {/* <ImgCrop beforeCrop={imageCropFunction}> */}
            <Upload
              accept="image/jpg,image/png,image/jpeg,.pdf"
              beforeUpload={Address_imageCropFunction}
              fileList={Address_fileList}
              onChange={Address_onChange}
              action={
                envConfig.baseUrl +
                'Upload/Postupload?filename=' +
                Address_fileList[Address_fileList.length - 1]?.name
              }
              onPreview={Address_onPreview}
              itemRender={(originalNode, file) => {
                const isOriginal = checkIsAddressFileOriginal(file.name);
                const className = isOriginal ? 'new-file-color' : '';

                return (
                  <div className={className}>
                    {originalNode} {/* Render the original node with the conditional class */}
                  </div>
                )
              }}
              showUploadList={{ showRemoveIcon: false }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {/* </ImgCrop> */}
          </Form.Item>
        </MultipleCheckMarkAmendComponent>

        <MultipleCheckMarkAmendComponent
          amendName="isOwnerAddress"
          check={ownerAddress}
          setCheck={setOwnerAddress}
          readOnly={readOnly}
          applyType={applyType}
          name={'permanantAddress'}
          label={
            <>
              <DynamicTooltip
                fieldName={'permanantAddress'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>Business Owner Permanent Address
            </>
          }
        >
          <Form.Item noStyle name="permanantAddress">
            <Input.TextArea placeholder="Address" />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>

        <MultipleCheckMarkAmendComponent
          amendName="isOwnerAddress"
          check={ownerAddress}
          setCheck={setOwnerAddress}
          readOnly={readOnly}
          applyType={applyType}
          name={'contactEmail'}
          label={
            <>
              <DynamicTooltip
                fieldName={'businessOwnerEmail'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>Contact e-mail
            </>
          }
        >
          <Form.Item
            noStyle
            name="contactEmail"
            rules={[
              { required: true, message: 'Please enter the contact e-mail' },
              { type: 'email', message: 'Please enter a valid e-mail address' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Contact e-mail" />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>

        <MultipleCheckMarkAmendComponent
          amendName="isOwnerAddress"
          check={ownerAddress}
          setCheck={setOwnerAddress}
          readOnly={readOnly}
          applyType={applyType}
          name={'contactPhoneNumber'}
          label={
            <>
              <DynamicTooltip
                fieldName={'businessOwnerPhoneNo'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>Contact Phone Number
            </>
          }
        >
          <Form.Item
            noStyle
            name="contactPhoneNumber"
            rules={[
              {
                required: true,
                message: 'Please enter the contact phone number',
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Contact Phone Number"
            />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'attachment'}
          label="ပိုင်ရှင် (ထပ်မံလိုအပ်သည့် အချက်အလက်များ တွဲရန်)"
        >
          <Form.Item
            noStyle
            name="attachment"
            // rules={[{ required: true, message: 'Please upload attachments' }]}
          >
            <div style={{ width: '100%' }}>
              {attachments.map((url, index) => (
                <>
                  <div className="row" style={{ width: '100%' }}>
                    {index !== attachments.length - 1 && (
                      <div className="col-12" key={index}>
                        <a
                          target="blank"
                          style={{ color: checkIsOriginal(url.file) }}
                          href={envConfig.imageUrl + url.file}
                        >
                          {index + 1} . {url.attachment}
                        </a>

                        <Button
                          disabled={true}
                          onClick={() => {
                            const updatedUrls = [...attachments].filter(
                              (data, i) => i !== index
                            );
                            setAttachments(updatedUrls);
                          }}
                          type="ghost"
                          icon={<DeleteOutlined />}
                          size={'small'}
                        />
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-12">
                      {index === attachments.length - 1 && (
                        <Space.Compact>
                          <Select
                            disabled={true}
                            onChange={handleAttachmentChange}
                            placeholder="Select Type of Online Business"
                          >
                            {attachSetup.map((x, index) => {
                              let tempLabel = `${x.title}`;
                              if (x.isRequired === true) {
                                tempLabel = tempLabel + ' *';
                              }
                              return (
                                <Option key={index} value={x.title}>
                                  {tempLabel}
                                </Option>
                              );
                            })}
                          </Select>
                          <Upload
                            accept="image/jpg,image/png,image/jpeg,.pdf"
                            beforeUpload={beforeUpload_Attachment}
                            fileList={fileList_Attachment}
                            onChange={onChange_Attachment}
                            //showUploadList={false}
                            action={
                              envConfig.baseUrl +
                              'Upload/Postupload?filename=' +
                              fileList_Attachment[
                                fileList_Attachment.length - 1
                              ]?.name
                            }
                            onPreview={onPreview_Attachment}
                            itemRender={(originalNode, file) => {
                              const isOriginal = checkIsBusinessOwnerAttachment(file.name);
                              const className = isOriginal ? 'new-file-color' : '';
          
                              console.log('File:', file.name, 'IsOriginal:', isOriginal, 'Class Applied:', className);
          
                              return (
                                <div className={className}>
                                  {originalNode} {/* Render the original node with the conditional class */}
                                </div>
                              );
                            }}
                            showUploadList={{ showRemoveIcon: false }}
                            //disabled={fileList.length === 0 ? false : true}
                          >
                            <Button disabled={true} icon={<UploadOutlined />}>
                              Upload
                            </Button>
                          </Upload>
                          <Button
                            disabled={true}
                            onClick={handleAddAttachment}
                            icon={<PlusOutlined />}
                          >
                            Click To Add
                          </Button>
                        </Space.Compact>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </Form.Item>
        </AmendComponent>

        {buttonComponent}
      </Form>
    </Spin>
  );
};

export default OwnerInformationAmend;

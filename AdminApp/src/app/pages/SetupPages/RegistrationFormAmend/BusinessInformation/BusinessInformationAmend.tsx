import { ReactNode, useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  FormInstance,
  InputNumber,
  UploadFile,
  Space,
  Spin,
  Modal,
  Divider,
  Radio,
  Typography,
  Checkbox,
  Tooltip,
} from 'antd';
import {
  UserOutlined,
  NumberOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { AnyObject } from 'src/Models/AnyObject';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OptionDTO } from 'src/Models/OptionDTO';
import AmendComponent from 'src/app/components/AmendComponent/AmendComponent';
import AddressAmendComponent from 'src/app/components/AmendComponent/AddressAmendComponent';
import region from 'src/app/services/MyanmarRegion';
import DoubleAmendComponent from 'src/app/components/AmendComponent/DoubleAmendComponent';
import useFileUploadNoCrop from 'src/app/Hooks/useFileUploadWithoutCrop';
import TextArea from 'antd/es/input/TextArea';

import envConfig from 'src/app/config';
import useReadOnly from 'src/app/Hooks/useReadonly';
import AttachmentSetup from 'src/Models/AttachmentSetup';
import ImgCrop from 'antd-img-crop';
import useFileUpload from 'src/app/Hooks/useFileUpload';
import './PhotoLink.css';

import {
  GetAttachmentSetup,
  GetDeliveryMethod,
  GetEcommerceType,
  GetOnlineBusinessCategory,
  GetOnlineBusinessType,
  GetPaymentMethod,
  Step1Get,
  Step1Post,
  Step1Put,
} from '../../RegistrationForm/BusinessInformation/APIActions';
import StepButtons from '../../RegistrationForm/StepButtomComponent';
import RegistraionProps from '../../RegistrationForm/PropsType';
import Step1DtoAmend from '../Model/Step1DTOAmend';
import MultipleCheckMarkAmendComponent from 'src/app/components/AmendComponent/MultipleCheckMarkAmendComponent';
import DynamicTooltip, {
  GetHistoryRequestDTO,
} from 'src/app/components/DynamicTooltip/DynamicTooltipComponent';
import axiosInstance from 'src/app/services/AxiosInstance';

const { Option } = Select;
const { Text } = Typography;
const BusinessInformationAmend = ({
  next,
  prev,
  applyType,
  setId,
  registrationType,
  setRegistrationType,
  includeButton,
}: RegistraionProps) => {
  const { id: paramID } = useParams();
  let id = '';
  if (paramID) {
    id = paramID;
  }
  const formRef = React.useRef<FormInstance>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [amendAddress, setAmendAddress] = useState<boolean>(false);
  const [amendContact, setAmendContact] = useState<boolean>(false);
  const [amendEmployee, setAmendEmployee] = useState<boolean>(false);
  const [
    amendOnlineBusinessTypeAndCategory,
    setAmendOnlineBusinessTypeAndCategory,
  ] = useState<boolean>(false);
  const [amendProductOwner, setamendProductOwner] = useState<boolean>(false);
  const [amendSME, setAmendSME] = useState<boolean>(false);

  //New Code Added for attachment
  type attachment = {
    attachment: string;
    file: string;
  
  };

  type attachmentfile = {
    attachment: string;
    name: string;
    file: string;
    url: string;
  };
  const defaultAttachment = { attachment: '', file: '' };
  const [attachSetup, setAttachSetup] = useState<AttachmentSetup[]>([]);
  useEffect(() => {
    const response = async () => {
      const result = await GetAttachmentSetup();
      console.log(result);
      if (result) {
        const temp: AttachmentSetup[] = result.filter(
          (x) => x.step === 'Step 1' && x.registrationType === registrationType
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
        temp.file = fileList[fileList.length - 1]?.name;
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

  const [Websiteoriginal, setWebsiteOriginal] = useState<attachmentfile[]>([]);
  const fetchOriginalWebsiteAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'websiteLogo',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setWebsiteOriginal(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setWebsiteOriginal([]);
    } finally {
      setLoading(false);
    }
  };

  const [Eiroriginal, setEirOriginal] = useState<attachmentfile[]>([]);
  const fetchOriginalEirAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'eirRegFile',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setEirOriginal(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setEirOriginal([]);
    } finally {
      setLoading(false);
    }
  };

  const [Smeoriginal, setSmeOriginal] = useState<attachmentfile[]>([]);
  const fetchOriginalSmeAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'smeAttachment',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setSmeOriginal(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setSmeOriginal([]);
    } finally {
      setLoading(false);
    }
  };

  const [Crnooriginal, setCrnoOriginal] = useState<attachmentfile[]>([]);
  const fetchOriginalCrnoAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'crnoAttachment',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setCrnoOriginal(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setCrnoOriginal([]);
    } finally {
      setLoading(false);
    }
  };

  const [Addressfileoriginal, setAddressfileOriginal] = useState<attachmentfile[]>([]);
  const fetchOriginalAddressfileAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'addressFile',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setAddressfileOriginal(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setAddressfileOriginal([]);
    } finally {
      setLoading(false);
    }
  };

  const checkIsOriginalWebsite = (url: string): boolean => {
    let result = true;
    console.log("Checking URL:", url, "against originals:", Websiteoriginal);
    console.log("Original file names:", Websiteoriginal.map(item => item.name));

    Websiteoriginal?.forEach((item: attachmentfile) => {
      console.log(`Comparing: ${url.toLowerCase()} with ${item.name.toLowerCase()}`);

      if (item.name.toLowerCase() === url.toLowerCase()) {
        result = false;
      }
    });

    return result;
  };
  

  const checkIsOriginalEir = (url: string): boolean => {
    let result = true;
    Eiroriginal?.forEach((item: attachmentfile) => {
      if (item.name === url) {
        result = false;
      }
    });

    return result;
  };

  const checkIsOriginalSme = (url: string): boolean => {
    let result = true;
    Smeoriginal?.forEach((item: attachmentfile) => {
      if (item.name === url) {
        result = false;
      }
    });
    return result;
  };

  const checkIsOriginalCrno = (url: string): boolean => {
    let result = true;
    Crnooriginal?.forEach((item: attachmentfile) => {
      if (item.name === url) {
        result = false;
      }
    });

    return result;
  };


  const checkIsOriginalAddress = (url: string): boolean => {
    let result = true;
    Addressfileoriginal?.forEach((item: attachmentfile) => {
      if (item.name === url) {
        result = false;
      }
    });

    return result;
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
  const { readOnly } = useReadOnly();

  const newSave = (values: AnyObject) => {
    if (
      fileList.length !== 0 ||
      Eireg_fileList.length !== 0 ||
      Address_fileList.length !== 0 ||
      Crno_fileList.length !== 0 ||
      Sme_fileList.length !== 0
    ) {
      const data: Step1DtoAmend = JSON.parse(JSON.stringify(values));
      const response = async () => {
        const result = await Step1Post(data);
        if (result) {
          setLoading(false);
          setId(result.id);
          navigate('/Registration/' + result.id);
          next();
        }
      };
      response();
    } else {
      setLoading(false);
      values['businessInformationAttachment'] = fileList;
      values['addressFile'] = Address_fileList;
      values['eirRegFile'] = Eireg_fileList;
      values['crnoAttachment'] = Crno_fileList;
      values['smeAttachment'] = Sme_fileList;
      alert('Please upload require attachments');
    }
  };

  const newEdit = (values: AnyObject) => {
    if (
      fileList.length !== 0 ||
      Eireg_fileList.length !== 0 ||
      Address_fileList.length !== 0
    ) {
      const data: Step1DtoAmend = JSON.parse(JSON.stringify(values));
      const response = async () => {
        const result = await Step1Put(id, data);
        if (result) {
          setLoading(false);
          setId(result.id);
          navigate('/Registration/' + result.id);
          next();
        }
      };
      response();
    } else {
      setLoading(false);
      values['businessInformationAttachment'] = fileList;
      values['addressFile'] = Address_fileList;
      values['eirRegFile'] = Eireg_fileList;
      alert('Please upload require attachments');
    }
  };

  const onFinish = (values: AnyObject) => {
    // if (applyType === 'New' || applyType === 'Amend') {
    setLoading(true);
    if (!values.businessName && !values.businessNameMyanmar) {
      showWarning(
        'Business Name အားEnlgish(သို့မဟုတ်)မြန်မာလိုဖြည့်ပေးရန် လိုအပ်ပါသည်။'
      );
      return;
    }

    if (fileList_WebsiteLogo.length === 0) {
      showWarning('Business logo တွဲပေးရန် လိုအပ်ပါသည်။');
      return;
    }
    if (CheckIsOtherAttachmentValid() === false) {
      //Check new Attachment
      showWarning('Attachmentsများ တွဲပေးရန် လိုအပ်ပါသည်။');
      return;
    }
    //Check new Attachment
    if (
      values.isProductOwner === true &&
      (!values.productDetail || values.productDetail === '')
    ) {
      showWarning('Product Detailပေးရန် လိုအပ်ပါသည်။');
      return;
    }

    const isCompanyRegistration = registrationType === 'company';
    if (values['businessAddress'] !== '' && Address_fileList.length === 0) {
      showWarning(
        'လိပ်စာမှန်ကန်ကြောင်းရပ်ကွက်ထောက်ခံစာ Attachment တွဲပေးရန် လိုအပ်ပါသည်။'
      );
      return;
    }
    if (isCompanyRegistration) {
      if (values.companyRegNumber === '' || !values.companyRegNumber) {
        showWarning(
          'Company Registration No (or) အခြား အသင်းအဖွဲ့အမှတ် သည်ဖြည့်ပေးရန် လိုအပ်ပါသည်။'
        );
        return;
      }
      if (values.eirRegNumber) {
        if (values.eirRegNumber !== '' && Eireg_fileList.length === 0) {
          showWarning(
            'EIR-Exporter Importer Registration Number Attachment တွဲပေးရန်'
          );
          return;
        }
      }

      if (values.companyRegNumber !== '' && Crno_fileList.length === 0) {
        showWarning(
          'ကုမ္ပဏီမှတ်ပုံတင်လက်မှတ် (Certificate of Incorporation) Attachment တွဲပေးရန်'
        );
        return;
      }
      if (values.smeRegNumber) {
        if (values.smeRegNumber !== '' && Sme_fileList.length === 0) {
          showWarning('SMEမှတ်ပုံတင်လက်မှတ် Attachment တွဲပေးရန်');
          return;
        }
      }
    }
    if (!isCompanyRegistration) {
      if (values.smeRegNumber) {
        if (values.smeRegNumber !== '' && Sme_fileList.length === 0) {
          showWarning('SMEမှတ်ပုံတင်လက်မှတ် Attachment တွဲပေးရန်');
          return;
        }
      }
    }

    if (values.city === '' || values.township === '') {
      showWarning("'*' ပြထားသောအချက်များ ဖြည့်ပေးပါ။");
    }

    if (!isCompanyRegistration) {
      values.companyRegNumber = '';
      //values.smeRegNumber = '';
      values.eirRegNumber = '';
    }

    if (
      isCompanyRegistration &&
      values.companyRegNumber === '' &&
      values.eirRegFile === ''
    ) {
      showWarning(
        'ကုမ္ပဏီမှတ်ပုံတင်လက်မှတ် (Certificate of Incorporation) Attachment တွဲပေးရန်'
      );
      setLoading(false);
    } else {
      values.onlineBusinessCategory = JSON.stringify(
        values.onlineBusinessCategory
      );
      values.businessInformationAttachment = JSON.stringify(attachments);
      values.addressFile = JSON.stringify(Address_fileList);
      values.eirRegFile = JSON.stringify(Eireg_fileList);
      values.websiteLogo = JSON.stringify(fileList_WebsiteLogo);
      values.crnoAttachment = JSON.stringify(Crno_fileList);
      values.smeAttachment = JSON.stringify(Sme_fileList);
      values.eCommerceModel = JSON.stringify(values.eCommerceModel);
      values.deliveryMethod = JSON.stringify(values.deliveryMethod);
      values.paymentMethod = JSON.stringify(values.paymentMethod);

      const passData = { ...values };
      passData.companyOrIndividualType = registrationType;
      console.log(passData);
      console.log(applyType);
      if (applyType === 'New' || applyType === '') {
        if (id !== '') {
          passData['applyType'] = 'New';
          newEdit(passData);
        } else {
          passData['applyType'] = 'New';
          newSave(passData);
        }
      }
      if (applyType === 'Amend') {
        passData['applyType'] = 'Amend';
        newEdit(passData);
      }
    }
  };

  const showWarning = (content: string) => {
    Modal.warn({
      title: 'Invalid',
      content,
    });
    setLoading(false);
  };

  const {
    fileList,
    beforeUpload: imageCropFunction,
    onPreview,
    setFileList,
    onChange,
  } = useFileUploadNoCrop();

  const {
    fileList: Eireg_fileList,
    setFileList: Eireg_setFileList,
    beforeUpload: Eireg_imageCropFunction,
    onPreview: Eireg_onPreview,
    onChange: Eireg_onChange,
  } = useFileUploadNoCrop();

  const {
    fileList: Crno_fileList,
    setFileList: Crno_setFileList,
    beforeUpload: Crno_imageCropFunction,
    onPreview: Crno_onPreview,
    onChange: Crno_onChange,
  } = useFileUploadNoCrop();

  const {
    fileList: Sme_fileList,
    setFileList: Sme_setFileList,
    beforeUpload: Sme_imageCropFunction,
    onPreview: Sme_onPreview,
    onChange: Sme_onChange,
  } = useFileUploadNoCrop();

  const {
    fileList: Address_fileList,
    setFileList: Address_setFileList,
    beforeUpload: Address_imageCropFunction,
    onPreview: Address_onPreview,
    onChange: Address_onChange,
  } = useFileUploadNoCrop();

  const {
    fileList: fileList_WebsiteLogo,
    setFileList: setFileList_WebsiteLogo,
    imageCropFunction: beforeUpload_WebsiteLogo,
    onPreview: onPreview_WebsiteLogo,
    onChange: onChange_WebsiteLogo,
  } = useFileUpload();

  const [onlineBusinessTypeList, setOnlineBusinessTypeList] = useState<
    OptionDTO[]
  >([]);
  const [onlineBusinessCategoryList, setOnlineBusinessCategoryList] = useState<
    OptionDTO[]
  >([]);
  const [paymentMethodList, setPaymentMethodList] = useState<OptionDTO[]>([]);
  const [deliveryMethodList, setDeliveryMethodList] = useState<OptionDTO[]>([]);
  const [ecommerceList, setEcommerceList] = useState<OptionDTO[]>([]);

  const [stateRegion, setStateRegion] = useState<OptionDTO[]>([]);
  const [city, setCity] = useState<OptionDTO[]>([]);
  const [township, setTownship] = useState<OptionDTO[]>([]);
  const [buttonComponent, setButtonComponent] = useState<ReactNode>('');
  const setButton = () => {
    if (includeButton) {
      setButtonComponent(
        <StepButtons next={next} first={true} prev={prev} id={id}></StepButtons>
      );
    } else {
      setButtonComponent('');
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setButton(), []);

  const handleSelectChangeOB = async (e: string) => {
    const onlineBusinessCategoryResult = await GetOnlineBusinessCategory();
    const tempDTO: OptionDTO[] = [];
    onlineBusinessCategoryResult.forEach((x) => {
      if (x.businessTypeId.find((x) => x === e)) {
        tempDTO.push({
          id: x.id,
          value: x.value,
        });
      }
    });
    if (onlineBusinessCategoryResult) {
      setOnlineBusinessCategoryList(tempDTO);
    }
  };

  const handleSelectChangeStateRegion = async (e: string) => {
    const tempDTO: OptionDTO[] = [];
    region.forEach((x) => {
      if (x.eng === e) {
        x.districts.forEach((districts) => {
          tempDTO.push({
            id: districts.eng,
            value: districts.eng,
          });
        });
      }
    });

    setCity(tempDTO);
    formRef.current?.setFieldsValue({
      city: '',
      township: '',
    });
  };

  const handleSelectChangeCity = async (e: string) => {
    const tempDTO: OptionDTO[] = [];
    region.forEach((State) => {
      State.districts.forEach((districts) => {
        if (districts.eng === e) {
          districts.townships.forEach((townships) => {
            tempDTO.push({
              id: townships.eng,
              value: townships.eng,
            });
          });
        }
      });
    });

    setTownship(tempDTO);
    formRef.current?.setFieldsValue({
      township: '',
    });
  };

  //Attachment Check Region Start
  const [original, setOriginal] = useState<attachment[]>([]);
  const fetchOriginalAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'businessInformationAttachment',
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

  useEffect(() => {
    const optionAsync = async () => {
      const onlineBusinessTypeResult = await GetOnlineBusinessType();
      const paymentMethodResult = await GetPaymentMethod();
      const deliveryMethodResult = await GetDeliveryMethod();
      const ecommerceResult = await GetEcommerceType();

      if (onlineBusinessTypeResult) {
        setOnlineBusinessTypeList(onlineBusinessTypeResult);
      }
      if (paymentMethodResult) {
        setPaymentMethodList(paymentMethodResult);
      }
      if (deliveryMethodResult) {
        setDeliveryMethodList(deliveryMethodResult);
      }
      if (ecommerceResult) {
        setEcommerceList(ecommerceResult);
      }
    };
    optionAsync();
    if (id !== '') {
      setLoading(true);

      const response = async () => {
        const result = await Step1Get(id);
        fetchOriginalAttachmentData();
        fetchOriginalWebsiteAttachmentData();
        fetchOriginalEirAttachmentData();
        fetchOriginalSmeAttachmentData();
        fetchOriginalCrnoAttachmentData();
        fetchOriginalAddressfileAttachmentData();
        if (result) {
          await handleSelectChangeOB(result['onlineBusinessType']);
          await handleSelectChangeStateRegion(result['stateRegion']);
          await handleSelectChangeCity(result['city']);
          const temp: Step1DtoAmend = JSON.parse(JSON.stringify(result));
          setRegistrationType(temp.companyOrIndividualType);
          formRef.current?.setFieldsValue(result);

          formRef.current?.setFieldsValue({
            eCommerceModel: JSON.parse(result['eCommerceModel']),
            onlineBusinessCategory: JSON.parse(
              result['onlineBusinessCategory']
            ),
            deliveryMethod: JSON.parse(result['deliveryMethod']),
            paymentMethod: JSON.parse(result['paymentMethod']),
          });

          if (result['addressFile']) {
            const Address_imageUrl: UploadFile[] = JSON.parse(
              result['addressFile']
            );
            Address_setFileList(Address_imageUrl);
          }

          if (result['crnoAttachment']) {
            const Crno_imageUrl: UploadFile[] = JSON.parse(
              result['crnoAttachment']
            );
            Crno_setFileList(Crno_imageUrl);
          }

          if (result['websiteLogo']) {
            const filelistWeb: UploadFile[] = JSON.parse(result['websiteLogo']);
            setFileList_WebsiteLogo(filelistWeb);
          }

          if (result['smeAttachment']) {
            const Sme_imageUrl: UploadFile[] = JSON.parse(
              result['smeAttachment']
            );
            Sme_setFileList(Sme_imageUrl);
          }
          if (result['eirRegFile']) {
            const Eireg_imageUrl: UploadFile[] = JSON.parse(
              result['eirRegFile']
            );
            Eireg_setFileList(Eireg_imageUrl);
          }
          if (result['businessInformationAttachment']) {
            // const imageUrl: UploadFile[] = JSON.parse(
            //   result['businessInformationAttachment']
            // );
            // setFileList(imageUrl);
            setAttachments(JSON.parse(result['businessInformationAttachment']));
          }

          setLoading(false);
        }
      };

      response();
    }
    const stateList: OptionDTO[] = [];
    region.forEach((x) =>
      stateList.push({
        id: x.eng,
        value: x.eng,
      })
    );
    setStateRegion(stateList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Form
        ref={formRef}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
        onFinish={onFinish}
      >
        {/* <Form.Item label="Name of Business" required={true}>
          <Space direction={'horizontal'}>
            <DoubleAmendComponent
              readOnly={true}
              applyType={applyType}
              name={'businessName'}
            >
              <Form.Item
                name="businessName"
                help={
                  <span>
                    လုပ်ငန်းအမည်အား English လိုဖြည့်ပေးပါရန်
                    <Text type="danger">*</Text>
                  </span>
                }
              >
                <Space>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Name of Business"
                  />
                  <DynamicTooltip
                    fieldName={'businessName'}
                    id={+id}
                  ></DynamicTooltip>
                </Space>
              </Form.Item>
            </DoubleAmendComponent>

            <DoubleAmendComponent
              readOnly={true}
              applyType={applyType}
              name={'businessNameMyanmar'}
            >
              <Form.Item
                name="businessNameMyanmar"
                help={<span>လုပ်ငန်းအမည်အား မြန်မာ လိုဖြည့်ပေးပါရန် </span>}
              >
                <Space>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Name of Business Myanmar"
                  />
                  <DynamicTooltip
                    fieldName={'businessNameMyanmar'}
                    id={+id}
                  ></DynamicTooltip>
                </Space>
              </Form.Item>
            </DoubleAmendComponent>
          </Space>
        </Form.Item> */}

        <Form.Item label="Name of Business" required={true}>
          <Space direction={'horizontal'}>
            <DoubleAmendComponent
              readOnly={true}
              applyType={applyType}
              name={'businessName'}
            >
              <Form.Item
                name="businessName"
                help={
                  <span>
                    လုပ်ငန်းအမည်အား English လိုဖြည့်ပေးပါရန်
                    <Text type="danger">*</Text>
                  </span>
                }
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Name of Business"
                />
              </Form.Item>
            </DoubleAmendComponent>

            <DoubleAmendComponent
              readOnly={true}
              applyType={applyType}
              name={'businessNameMyanmar'}
            >
              <Form.Item
                name="businessNameMyanmar"
                help={<span>လုပ်ငန်းအမည်အား မြန်မာ လိုဖြည့်ပေးပါရန် </span>}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Name of Business Myanmar"
                />
              </Form.Item>
            </DoubleAmendComponent>
          </Space>
        </Form.Item>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'websiteLogo'}
          label="Business logo attachment"
        >
        <Button>
              <Form.Item noStyle valuePropName="checked" name="isName">
                <Checkbox></Checkbox>
              </Form.Item>
            </Button>
        {/*<Form.Item label="Business logo attachment" name="websiteLogo">*/}
        <Form.Item name="websiteLogo">
          <ImgCrop beforeCrop={beforeUpload_WebsiteLogo}>
            <Upload
              accept="image/jpg,image/png,image/jpeg,.pdf"
              fileList={fileList_WebsiteLogo}
              onChange={onChange_WebsiteLogo}
              action={
                envConfig.baseUrl +
                'Upload/Postupload?filename=' +
                fileList_WebsiteLogo[fileList_WebsiteLogo.length - 1]?.name
              }
              onPreview={onPreview_WebsiteLogo}
              showUploadList={{ showRemoveIcon: false }}
              itemRender={(originNode, file) => {
                const isOriginal = checkIsOriginalWebsite(file.name);
                const className = isOriginal ? 'new-file-color' : ''; // Apply class conditionally

                return (
                  <div className={className}>
                    {originNode}{' '}
                    {/* Render the original node with the conditional class */}
                  </div>
                );
              }}
            >
              <Button icon={<UploadOutlined />} disabled={true}>
                Upload Website Logo Attachment
              </Button>
            </Upload>
          </ImgCrop>
        </Form.Item>
        </AmendComponent>

        <div id="forCompanySection">
          <AmendComponent
            readOnly={true}
            applyType={applyType}
            name={'companyRegNumber'}
            label={
              <span>
                Company Registration No
                <br />
                (or) အခြား အသင်းအဖွဲ့အမှတ်
              </span>
            }
          >
            <Form.Item noStyle name="companyRegNumber">
              <Input
                prefix={<NumberOutlined />}
                placeholder="Company Registration Number"
              />
            </Form.Item>
          </AmendComponent>

          <AmendComponent
            readOnly={readOnly}
            applyType={applyType}
            name={'crnoAttachment'}
            label={
              <span>
                ကုမ္ပဏီမှတ်ပုံတင်လက်မှတ်
                <br /> (Certificate of Incorporation)
                <br />
                Attachment တွဲပေးရန်
                <br />
                ...
              </span>
            }
          >
            <Button>
              <Form.Item
                noStyle
                valuePropName="checked"
                name="isCrnoAttachment"
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Button>
            <Form.Item noStyle name="crnoAttachment">
              {/* <ImgCrop beforeCrop={imageCropFunction}> */}
              <Upload
                accept="image/jpg,image/png,image/jpeg,.pdf"
                beforeUpload={Crno_imageCropFunction}
                fileList={Crno_fileList}
                onChange={Crno_onChange}
                action={
                  envConfig.baseUrl +
                  'Upload/Postupload?filename=' +
                  Crno_fileList[Crno_fileList.length - 1]?.name
                }
                onPreview={Crno_onPreview}
                showUploadList={{ showRemoveIcon: false }}
                itemRender={(originNode, file) => {
                  const isOriginal = checkIsOriginalCrno(file.name);
                  const className = isOriginal ? 'new-file-color' : ''; // Apply class conditionally

                  return (
                    <div className={className}>
                      {originNode}{' '}
                      {/* Render the original node with the conditional class */}
                    </div>
                  );
                }}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              {/* </ImgCrop> */}
            </Form.Item>
          </AmendComponent>

          <AmendComponent
            readOnly={true}
            applyType={applyType}
            name={'eirRegNumber'}
            label={'EIR-Exporter Importer Registration Number'}
          >
            <Form.Item noStyle name="eirRegNumber">
              <Input
                prefix={<NumberOutlined />}
                placeholder="EIR-Exporter Importer Registration Number"
              />
            </Form.Item>
          </AmendComponent>

          <AmendComponent
            readOnly={readOnly}
            applyType={applyType}
            name={'eirRegFile'}
            label={
              <span>
                EIR-Exporter Importer
                <br /> Registration Number
                <br />
                Attachment တွဲပေးရန်
                <br />
                ...
              </span>
            }
          >
            <Button>
              <Form.Item noStyle valuePropName="checked" name="isEIRRegFile">
                <Checkbox></Checkbox>
              </Form.Item>
            </Button>
            <Form.Item noStyle name="eirRegFile">
              {/* <ImgCrop beforeCrop={imageCropFunction}> */}
              <Upload
                accept="image/jpg,image/png,image/jpeg,.pdf"
                beforeUpload={Eireg_imageCropFunction}
                fileList={Eireg_fileList}
                onChange={Eireg_onChange}
                action={
                  envConfig.baseUrl +
                  'Upload/Postupload?filename=' +
                  Eireg_fileList[Eireg_fileList.length - 1]?.name
                }
                onPreview={Eireg_onPreview}
                showUploadList={{ showRemoveIcon: false }}
                itemRender={(originNode, file) => {
                  const isOriginal = checkIsOriginalEir(file.name);
                  const className = isOriginal ? 'new-file-color' : ''; // Apply class conditionally

                  return (
                    <div className={className}>
                      {originNode}{' '}
                      {/* Render the original node with the conditional class */}
                    </div>
                  );
                }}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              {/* </ImgCrop> */}
            </Form.Item>
          </AmendComponent>
        </div>
        <MultipleCheckMarkAmendComponent
          amendName="isSmeAttachment"
          check={amendSME}
          setCheck={setAmendSME}
          readOnly={readOnly}
          applyType={applyType}
          name={'isSmeAttachment'}
          label={
            <>
              <DynamicTooltip fieldName={'smeRegNo'} id={+id}></DynamicTooltip>
              &nbsp; SME Registration Number
            </>
          }
        >
          <Form.Item noStyle name="smeRegNumber">
            <Input
              prefix={<NumberOutlined />}
              placeholder="SME Registration Number"
            />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <MultipleCheckMarkAmendComponent
          amendName="isSmeAttachment"
          check={amendSME}
          setCheck={setAmendSME}
          readOnly={readOnly}
          applyType={applyType}
          name={'isSmeAttachment'}
          label={
            <span>
              SMEမှတ်ပုံတင်လက်မှတ်
              <br />
              Attachment တွဲပေးရန်
              <br />
              ...
            </span>
          }
        >
          <Form.Item noStyle name="smeAttachment">
            {/* <ImgCrop beforeCrop={imageCropFunction}> */}
            <Upload
              accept="image/jpg,image/png,image/jpeg,.pdf"
              beforeUpload={Sme_imageCropFunction}
              fileList={Sme_fileList}
              onChange={Sme_onChange}
              action={
                envConfig.baseUrl +
                'Upload/Postupload?filename=' +
                Sme_fileList[Sme_fileList.length - 1]?.name
              }
              onPreview={Sme_onPreview}
              showUploadList={{ showRemoveIcon: false }}
              itemRender={(originNode, file) => {
                const isOriginal = checkIsOriginalSme(file.name);
                const className = isOriginal ? 'new-file-color' : ''; // Apply class conditionally

                return (
                  <div className={className}>
                    {originNode}{' '}
                    {/* Render the original node with the conditional class */}
                  </div>
                );
              }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {/* </ImgCrop> */}
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <Divider></Divider>
        <MultipleCheckMarkAmendComponent
          amendName="isOnlineBusinessTypeAndCategory"
          check={amendOnlineBusinessTypeAndCategory}
          setCheck={setAmendOnlineBusinessTypeAndCategory}
          readOnly={readOnly}
          applyType={applyType}
          name={'isOnlineBusinessTypeAndCategory'}
          label={
            <>
              <DynamicTooltip
                fieldName={'businessType'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>Type of Online Business
            </>
          }
        >
          <Form.Item noStyle name="onlineBusinessType">
            <Select
              //disabled={OnlineBusiness.length > 0}
              onChange={handleSelectChangeOB}
              placeholder="Select Type of Online Business"
            >
              {onlineBusinessTypeList.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <MultipleCheckMarkAmendComponent
          check={amendOnlineBusinessTypeAndCategory}
          setCheck={setAmendOnlineBusinessTypeAndCategory}
          readOnly={readOnly}
          applyType={applyType}
          amendName="isOnlineBusinessTypeAndCategory"
          name={'isOnlineBusinessTypeAndCategory'}
          label={
            <>
              <DynamicTooltip
                fieldName={'businessCategory'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Online Business Category
            </>
          }
        >
          <Form.Item
            noStyle
            name="onlineBusinessCategory"
            rules={[
              {
                required: true,
                message: 'Please select the type of online business',
              },
            ]}
          >
            {/* <Space> */}
            <Select
              // style={{ minWidth: 300 }}
              mode="multiple"
              // onChange={handleSelectChange}
            >
              {onlineBusinessCategoryList.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <MultipleCheckMarkAmendComponent
          //<AmendComponent

          check={amendProductOwner}
          setCheck={setamendProductOwner}
          readOnly={readOnly}
          applyType={applyType}
          amendName="isProductOwnerAmend"
          name={'isProductOwnerAmend'}
          /*readOnly={readOnly}
          applyType={applyType}
          name={'isProductOwner'}*/
          label={
            <>
              <DynamicTooltip
                fieldName={'isProductOwner'}
                id={+id}
              ></DynamicTooltip>
              &nbsp; ကိုယ်ပိုင်ထုတ်ကုန်ရှိပါသလား
            </>
          }
        >
          {/*<Button>
            <Form.Item noStyle name="isProductOwnerAmend">
              <Checkbox></Checkbox>
            </Form.Item>
          </Button>*/}{' '}
          &nbsp;
          <Form.Item
            noStyle
            name="isProductOwner"
            initialValue={'true'}
            rules={[{ required: true, message: 'Please select one' }]}
          >
            <Radio.Group
            // onChange={onChangeRadio}
            >
              <Radio
                value={'true'}
                onClick={() => {
                  const dom = document.getElementById('productDetail');
                  if (dom) {
                    dom.style.display = 'block';
                  }
                }}
              >
                Yes
              </Radio>
              <Radio
                value={'false'}
                onClick={() => {
                  const dom = document.getElementById('productDetail');
                  if (dom) {
                    dom.style.display = 'none';
                  }
                }}
              >
                No
              </Radio>
            </Radio.Group>
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <div id="productDetail">
          <AmendComponent
            readOnly={readOnly}
            applyType={applyType}
            name={'productDetail'}
            label="Product Detail"
          >
            <Form.Item noStyle name="productDetail">
              <TextArea placeholder="Product Details....." />
            </Form.Item>
          </AmendComponent>
        </div>
        <AmendComponent
          readOnly={true}
          applyType={applyType}
          name={'eCommerceModel'}
          label={
            <>
              <Text type="danger">*</Text>
              Type of e-Commerce Model
            </>
          }
        >
          <Form.Item
            noStyle
            name="eCommerceModel"
            rules={[
              {
                required: true,
                message: 'Please select the type of e-commerce model',
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              disabled={true}
              placeholder="Select Type of e-Commerce Model"
            >
              {ecommerceList.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </AmendComponent>
        <Divider></Divider>
        <AddressAmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'businessAddress'}
          label={
            <>
              <DynamicTooltip
                fieldName={'businessAddress'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Business Address
            </>
          }
          check={amendAddress}
          setCheck={setAmendAddress}
        >
          <Form.Item
            noStyle
            name="businessAddress"
            rules={[
              { required: true, message: 'Please enter the business address' },
            ]}
          >
            <Input
              prefix={<EnvironmentOutlined />}
              placeholder="Business Address"
            />
          </Form.Item>
        </AddressAmendComponent>
        <AddressAmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'businessAddress'}
          label={
            <>
              <DynamicTooltip fieldName={'state'} id={+id}></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              State/Region
            </>
          }
          check={amendAddress}
          setCheck={setAmendAddress}
        >
          <Form.Item
            noStyle
            name="stateRegion"
            rules={[
              { required: true, message: 'Please enter the state/region' },
            ]}
          >
            <Select
              onChange={handleSelectChangeStateRegion}
              placeholder="Select State/Region"
            >
              {stateRegion.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </AddressAmendComponent>
        <AddressAmendComponent
          readOnly={readOnly}
          check={amendAddress}
          setCheck={setAmendAddress}
          applyType={applyType}
          name={'city'}
          label={
            <>
              <DynamicTooltip fieldName={'city'} id={+id}></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              City
            </>
          }
        >
          <Form.Item
            noStyle
            name="city"
            rules={[{ required: true, message: 'Please enter the city' }]}
          >
            <Select onChange={handleSelectChangeCity} placeholder="Select City">
              {city.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </AddressAmendComponent>
        <AddressAmendComponent
          readOnly={readOnly}
          check={amendAddress}
          setCheck={setAmendAddress}
          applyType={applyType}
          name={'township'}
          label={
            <>
              <DynamicTooltip fieldName={'township'} id={+id}></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Township
            </>
          }
        >
          <Form.Item
            noStyle
            name="township"
            rules={[{ required: true, message: 'Please enter the township' }]}
          >
            <Select placeholder="Select Township">
              {township.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </AddressAmendComponent>
        <AddressAmendComponent
          readOnly={readOnly}
          check={amendAddress}
          setCheck={setAmendAddress}
          applyType={applyType}
          name={'postalCode'}
          label={
            <>
              <DynamicTooltip
                fieldName={'postalCode'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;Postal Code
            </>
          }
        >
          <Form.Item noStyle name="postalCode">
            <Input prefix={<NumberOutlined />} placeholder="Postal Code" />
          </Form.Item>
        </AddressAmendComponent>
        <AddressAmendComponent
          readOnly={readOnly}
          setCheck={setAmendAddress}
          applyType={applyType}
          name={'addressFile'}
          label={
            <span>
              လုပ်ငန်းတည်ရှိရာ လိပ်စာ
              <br /> မှန်ကန်ကြောင်း ရပ်ကွက်ထောက်ခံစာ
              <br />
              Attachment တွဲပေးရန်
              <br />
              ...
            </span>
          }
          check={amendAddress}
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
              showUploadList={{ showRemoveIcon: false }}
              itemRender={(originNode, file) => {
                const isOriginal = checkIsOriginalAddress(file.name);
                const className = isOriginal ? 'new-file-color' : ''; // Apply class conditionally

                return (
                  <div className={className}>
                    {originNode}{' '}
                    {/* Render the original node with the conditional class */}
                  </div>
                );
              }}
              //disabled={fileList.length === 0 ? false : true}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {/* </ImgCrop> */}
          </Form.Item>
        </AddressAmendComponent>
        <Divider></Divider>
        <MultipleCheckMarkAmendComponent
          check={amendContact}
          setCheck={setAmendContact}
          readOnly={readOnly}
          applyType={applyType}
          amendName="isContactAttachment"
          name={'contactPerson'}
          label={
            <>
              <DynamicTooltip
                fieldName={'contactPersonName'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Contact Person
            </>
          }
        >
          <Form.Item
            noStyle
            name="contactPerson"
            rules={[
              { required: true, message: 'Please enter the contact person' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Contact Person" />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <MultipleCheckMarkAmendComponent
          amendName="isContactAttachment"
          check={amendContact}
          setCheck={setAmendContact}
          readOnly={readOnly}
          applyType={applyType}
          name={'contactEmail'}
          label={
            <>
              <DynamicTooltip
                fieldName={'contactPersonEmail'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Contact Email
            </>
          }
        >
          <Form.Item
            noStyle
            name="contactEmail"
            rules={[
              { required: true, message: 'Please enter the contact email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Contact Email" />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <MultipleCheckMarkAmendComponent
          amendName="isContactAttachment"
          check={amendContact}
          setCheck={setAmendContact}
          readOnly={readOnly}
          applyType={applyType}
          name={'contactPhoneNumber'}
          label={
            <>
              <DynamicTooltip
                fieldName={'contactPersonPhone'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Contact Phone Number
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
        <Divider></Divider>
        <MultipleCheckMarkAmendComponent
          check={amendEmployee}
          amendName="isEmployeePaymentDelivery"
          setCheck={setAmendEmployee}
          readOnly={readOnly}
          applyType={applyType}
          name={'numberOfEmployee'}
          label={
            <>
              <DynamicTooltip
                fieldName={'employeeNumber'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Number of Employee
            </>
          }
        >
          <Form.Item
            noStyle
            name="numberOfEmployee"
            rules={[
              { required: true, message: 'Please enter number of employee' },
            ]}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              placeholder="Number of Employee"
            />
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <MultipleCheckMarkAmendComponent
          check={amendEmployee}
          amendName="isEmployeePaymentDelivery"
          setCheck={setAmendEmployee}
          readOnly={readOnly}
          applyType={applyType}
          name={'paymentMethod'}
          label={
            <>
              <DynamicTooltip
                fieldName={'paymentMethod'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              Payment Method
            </>
          }
        >
          <Form.Item
            noStyle
            name="paymentMethod"
            rules={[
              { required: true, message: 'Please enter the payment method' },
            ]}
          >
            <Select mode="multiple" placeholder="Select Payment Method">
              {paymentMethodList.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <MultipleCheckMarkAmendComponent
          check={amendEmployee}
          amendName="isEmployeePaymentDelivery"
          setCheck={setAmendEmployee}
          readOnly={readOnly}
          applyType={applyType}
          name={'deliveryMethod'}
          label={
            <>
              <DynamicTooltip
                fieldName={'deliveryMethod'}
                id={+id}
              ></DynamicTooltip>
              &nbsp;
              <Text type="danger">*</Text>
              User of Delivery Method
            </>
          }
        >
          <Form.Item
            noStyle
            name="deliveryMethod"
            rules={[
              {
                required: true,
                message: 'Please enter the user of delivery method',
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select User of Delivery Method"
            >
              {deliveryMethodList.map((item: OptionDTO, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.value}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </MultipleCheckMarkAmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'businessInformationAttachment'}
          label={
            <span>
              လုပ်ငန်း(ထပ်မံလိုအပ်သည့်အချက်အလက်များတွဲရန်)
              {/*Attachments
              <br /> အခြားသတ်မှတ်ထားသည့်
              <br />
          လုပ်ငန်းလိုင်စင်များ*/}
            </span>
          }
        >
          <Form.Item noStyle name="businessInformationAttachment">
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
                          {' '}
                          {url.file}
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

                  <div className="row" style={{ width: '100%' }}>
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
                            beforeUpload={imageCropFunction}
                            fileList={fileList}
                            onChange={onChange}
                            //showUploadList={false}
                            action={
                              envConfig.baseUrl +
                              'Upload/Postupload?filename=' +
                              fileList[fileList.length - 1]?.name
                            }
                            onPreview={onPreview}

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

export default BusinessInformationAmend;

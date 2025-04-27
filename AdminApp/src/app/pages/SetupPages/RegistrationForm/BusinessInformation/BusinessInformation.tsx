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
} from '@ant-design/icons';
import { AnyObject } from 'src/Models/AnyObject';
import Step1Dto from 'src/Models/Step1DTO';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OptionDTO } from 'src/Models/OptionDTO';
import RegistraionProps from '../PropsType';
import AmendComponent from 'src/app/components/AmendComponent/AmendComponent';
import AddressAmendComponent from 'src/app/components/AmendComponent/AddressAmendComponent';
import region from 'src/app/services/MyanmarRegion';
import DoubleAmendComponent from 'src/app/components/AmendComponent/DoubleAmendComponent';
import useFileUploadNoCrop from 'src/app/Hooks/useFileUploadWithoutCrop';
import TextArea from 'antd/es/input/TextArea';
import {
  Step1Post,
  Step1Put,
  GetOnlineBusinessCategory,
  GetOnlineBusinessType,
  GetPaymentMethod,
  GetDeliveryMethod,
  GetEcommerceType,
  Step1Get,
  GetAttachmentSetup,
} from './APIActions';
import StepButtons from '../StepButtomComponent';
import envConfig from 'src/app/config';
import useReadOnly from 'src/app/Hooks/useReadonly';
import AttachmentSetup from 'src/Models/AttachmentSetup';
import ImgCrop from 'antd-img-crop';
import useFileUpload from 'src/app/Hooks/useFileUpload';

const { Option } = Select;
const { Text } = Typography;
const BusinessInformation = ({
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

  //New Code Added for attachment
  type attachment = {
    attachment: string;
    file: string;
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
      const data: Step1Dto = JSON.parse(JSON.stringify(values));
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
      const data: Step1Dto = JSON.parse(JSON.stringify(values));
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
      values.smeRegNumber = '';
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

        if (result) {
          await handleSelectChangeOB(result['onlineBusinessType']);
          await handleSelectChangeStateRegion(result['stateRegion']);
          await handleSelectChangeCity(result['city']);
          const temp: Step1Dto = JSON.parse(JSON.stringify(result));
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
        <Form.Item label="Name of Business" required={true}>
          <Space direction={'horizontal'}>
            <DoubleAmendComponent
              readOnly={readOnly}
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
              readOnly={readOnly}
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
        <Form.Item label="Business logo attachment" name="websiteLogo">
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
            >
              <Button icon={<UploadOutlined />}>
                Upload Website Logo Attachment
              </Button>
            </Upload>
          </ImgCrop>
        </Form.Item>
        <div id="forCompanySection">
          <AmendComponent
            readOnly={readOnly}
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
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              {/* </ImgCrop> */}
            </Form.Item>
          </AmendComponent>

          <AmendComponent
            readOnly={readOnly}
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
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
              {/* </ImgCrop> */}
            </Form.Item>
          </AmendComponent>
        </div>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'smeRegNumber'}
          label={'SME Registration Number'}
        >
          <Form.Item noStyle name="smeRegNumber">
            <Input
              prefix={<NumberOutlined />}
              placeholder="SME Registration Number"
            />
          </Form.Item>
        </AmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'smeAttachment'}
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
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {/* </ImgCrop> */}
          </Form.Item>
        </AmendComponent>
        <Divider></Divider>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'onlineBusinessType'}
          label={
            <>
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
        </AmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'onlineBusinessCategory'}
          label={
            <>
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
            <Select
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
        </AmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'isProductOwner'}
          label="ကိုယ်ပိုင်ထုတ်ကုန်ရှိပါသလား"
        >
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
        </AmendComponent>
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
          readOnly={readOnly}
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
          label="Postal Code"
        >
          <Form.Item noStyle name="postalCode">
            <Input prefix={<NumberOutlined />} placeholder="Postal Code" />
          </Form.Item>
        </AddressAmendComponent>
        <AmendComponent
          readOnly={readOnly}
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
              //disabled={fileList.length === 0 ? false : true}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {/* </ImgCrop> */}
          </Form.Item>
        </AmendComponent>
        <Divider></Divider>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'contactPerson'}
          label={
            <>
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
        </AmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'contactEmail'}
          label={
            <>
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
        </AmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'contactPhoneNumber'}
          label={
            <>
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
        </AmendComponent>
        <Divider></Divider>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'numberOfEmployee'}
          label={
            <>
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
        </AmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'paymentMethod'}
          label={
            <>
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
        </AmendComponent>
        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'deliveryMethod'}
          label={
            <>
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
        </AmendComponent>
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
            {attachments.map((url, index) => (
              <Space key={index} style={{ display: 'flex', marginBottom: 8 }}>
                {index !== attachments.length - 1 && (
                  <>
                    <a target="blank" href={envConfig.imageUrl + url.file}>
                      {index + 1} . {url.attachment}
                    </a>
                    <Button
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
                  </>
                )}

                {index === attachments.length - 1 && (
                  <>
                    <Select
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
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    <Button
                      onClick={handleAddAttachment}
                      icon={<PlusOutlined />}
                    >
                      Click To Add
                    </Button>
                  </>
                )}
              </Space>
            ))}
          </Form.Item>
          {/* test 1 */}
          Upload ကို Click ၍ တွဲတင်မည့် File အားရွေးချယ်ပြီး Click to Add ကို နှိပ်ပါ။ Click to Add နှိပ်ပြီးပါက မိမိတွဲတင်လိုက်သော Attachment များ မှန်ကန်မှု ရှိ/မရှိ ပြန်လည်စစ်ဆေးပါ။
        </AmendComponent>

        {buttonComponent}
      </Form>
    </Spin>
  );
};

export default BusinessInformation;

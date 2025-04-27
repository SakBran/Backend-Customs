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
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import RegistraionProps from '../PropsType';
import AmendComponent from 'src/app/components/AmendComponent/AmendComponent';
import DoubleAmendComponent from 'src/app/components/AmendComponent/DoubleAmendComponent';
import { ReactNode, useEffect, useState } from 'react';
import useFileUploadNoCrop from 'src/app/Hooks/useFileUploadWithoutCrop';
import { AnyObject } from 'src/Models/AnyObject';
import Step2Dto from 'src/Models/Step2DTO';
import React from 'react';
import useFileUpload from 'src/app/Hooks/useFileUpload';
import ImgCrop from 'antd-img-crop';
import { Step2Put, Step2Get } from './APIActions';
import { useParams } from 'react-router-dom';
import StepButtons from '../StepButtomComponent';
import envConfig from 'src/app/config';
import useReadOnly from 'src/app/Hooks/useReadonly';
import NRCComponent from 'src/app/components/NRCComponent/NRCComponent';
import AttachmentSetup from 'src/Models/AttachmentSetup';
import { GetAttachmentSetup } from '../BusinessInformation/APIActions';

const { Text } = Typography;
const { Option } = Select;
const OwnerInformation = ({
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
  const { readOnly } = useReadOnly();

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
    const data: Step2Dto = JSON.parse(JSON.stringify(values));
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
    console.log(values);
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
        'ပိုင်ရှင်လိပ်စာမှန်ကန်ကြောင်းရပ်ကွက်ထောက်ခံစာ Attachment တွဲပေးရန် လိုအပ်ပါသည်။'
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
    const passData: Step2Dto = JSON.parse(JSON.stringify(values));
    passData.companyOrIndividualType = registrationType;
    if (applyType === 'New') {
      if (id !== '') {
        newEdit(passData);
      } else {
        newEdit(passData);
      }
    }
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

        if (result) {
          formRef.current?.setFieldsValue(result);
          const temp: Step2Dto = JSON.parse(JSON.stringify(result));
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
  useEffect(() => setButton(), []);
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Form
        ref={formRef}
        onFinish={onFinish}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
      >
        <div id="companyName">
          <Form.Item
            label={
              <>
                <Text type="danger">*</Text>Managing Director Name/Director Name
              </>
            }
          >
            <Space direction="horizontal">
              <DoubleAmendComponent
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameEnglish'}
              >
                <Form.Item name="ownerNameEnglish">
                  <Input prefix={<UserOutlined />} placeholder="(in English)" />
                </Form.Item>
              </DoubleAmendComponent>

              <DoubleAmendComponent
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameMyanmar'}
              >
                <Form.Item name="ownerNameMyanmar">
                  <Input prefix={<UserOutlined />} placeholder="(in Myanmar)" />
                </Form.Item>
              </DoubleAmendComponent>
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
              <DoubleAmendComponent
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameEnglish'}
              >
                <Form.Item name="ownerNameEnglish">
                  <Input prefix={<UserOutlined />} placeholder="(in English)" />
                </Form.Item>
              </DoubleAmendComponent>

              <DoubleAmendComponent
                readOnly={readOnly}
                applyType={applyType}
                name={'ownerNameMyanmar'}
              >
                <Form.Item name="ownerNameMyanmar">
                  <Input prefix={<UserOutlined />} placeholder="(in Myanmar)" />
                </Form.Item>
              </DoubleAmendComponent>
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
            <Radio.Group onChange={onChangeRadio}>
              <Radio value={'Citizen'} checked={true}>
                Citizen
              </Radio>
              <Radio value={'Foreigner'}>Foreigner</Radio>
            </Radio.Group>
          </Form.Item>
        </AmendComponent>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'passportPhoto'}
          label="Passport Size Photo"
        >
          <Form.Item noStyle name="passportPhoto">
            <ImgCrop beforeCrop={beforeUploadPhotoFile}>
              <Upload
                fileList={fileListPhotoFile}
                onChange={onChangePhotoFile}
                action={
                  envConfig.baseUrl +
                  'Upload/Postupload?filename=' +
                  fileListPhotoFile[fileListPhotoFile.length - 1]?.name
                }
                onPreview={onPreviewPhotoFile}
              >
                <Button icon={<UploadOutlined />}>
                  Upload Passport Size Photo
                </Button>
              </Upload>
            </ImgCrop>
          </Form.Item>
        </AmendComponent>

        <div id="citizen">
          {/* <AmendComponent
            readOnly={readOnly}
            applyType={applyType}
            name={'ownerNrcNumber'}
            label="Business Owner NRC number"
          > */}
          {/* <Form.Item
              noStyle
              name="ownerNrcNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter the business owner NRC number',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Business Owner NRC number"
              />
            </Form.Item> */}
          <NRCComponent formRef={formRef} />
          {/* </AmendComponent> */}

          <AmendComponent
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
                  fileList={fileList_Nrcf}
                  onChange={onChange_Nrcf}
                  action={
                    envConfig.baseUrl +
                    'Upload/Postupload?filename=' +
                    fileList_Nrcf[fileList_Nrcf.length - 1]?.name
                  }
                  onPreview={onPreview_Nrcf}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload NRC Scan-Attachment (Front)
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </AmendComponent>

          <AmendComponent
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
                  fileList={fileList_Nrcb}
                  onChange={onChange_Nrcb}
                  action={
                    envConfig.baseUrl +
                    'Upload/Postupload?filename=' +
                    fileList_Nrcb[fileList_Nrcb.length - 1]?.name
                  }
                  onPreview={onPreview_Nrcb}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload NRC Scan-Attachment (Back)
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </AmendComponent>
        </div>

        <div id="foreigner">
          <AmendComponent
            readOnly={readOnly}
            applyType={applyType}
            name={''}
            label="Passport Number"
          >
            <Form.Item noStyle name="passportNumber">
              <Input
                prefix={<UserOutlined />}
                placeholder="Business Owner passport number"
              />
            </Form.Item>
          </AmendComponent>

          <AmendComponent
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
                  //beforeUpload={beforeUpload_Passport}
                  fileList={fileList_Passport}
                  onChange={onChange_Passport}
                  action={
                    envConfig.baseUrl +
                    'Upload/Postupload?filename=' +
                    fileList_Passport[fileList_Passport.length - 1]?.name
                  }
                  onPreview={onPreview_Passport}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Passport Page 1
                  </Button>
                </Upload>
              </ImgCrop>
            </Form.Item>
          </AmendComponent>
        </div>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'ownerAddress'}
          label={
            <>
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
        </AmendComponent>

        <AmendComponent
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
              beforeUpload={Address_imageCropFunction}
              fileList={Address_fileList}
              onChange={Address_onChange}
              action={
                envConfig.baseUrl +
                'Upload/Postupload?filename=' +
                Address_fileList[Address_fileList.length - 1]?.name
              }
              onPreview={Address_onPreview}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {/* </ImgCrop> */}
          </Form.Item>
        </AmendComponent>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'permanantAddress'}
          label="Business Owner Permanent Address"
        >
          <Form.Item noStyle name="permanantAddress">
            <Input.TextArea placeholder="Address" />
          </Form.Item>
        </AmendComponent>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'contactEmail'}
          label={
            <>
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
        </AmendComponent>

        <AmendComponent
          readOnly={readOnly}
          applyType={applyType}
          name={'contactPhoneNumber'}
          label={
            <>
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
        </AmendComponent>

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
                      beforeUpload={beforeUpload_Attachment}
                      fileList={fileList_Attachment}
                      onChange={onChange_Attachment}
                      showUploadList={false}
                      action={
                        envConfig.baseUrl +
                        'Upload/Postupload?filename=' +
                        fileList_Attachment[fileList_Attachment.length - 1]
                          ?.name
                      }
                      onPreview={onPreview_Attachment}
                      //disabled={fileList.length === 0 ? false : true}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    <Button
                      type="dashed"
                      onClick={handleAddAttachment}
                      icon={<PlusOutlined />}
                    />
                  </>
                )}
              </Space>
            ))}
          </Form.Item>
        </AmendComponent>

        {buttonComponent}
      </Form>
    </Spin>
  );
};

export default OwnerInformation;

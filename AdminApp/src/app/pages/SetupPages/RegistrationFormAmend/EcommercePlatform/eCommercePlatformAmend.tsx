import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Space,
  Checkbox,
  FormInstance,
  UploadFile,
  Spin,
  Modal,
  Radio,
  Card,
} from 'antd';
import {
  LinkOutlined,
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './checkBox.css';
import { AnyObject } from 'src/Models/AnyObject';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import useFileUpload from 'src/app/Hooks/useFileUpload';
import ImgCrop from 'antd-img-crop';
import { useParams } from 'react-router-dom';
import envConfig from 'src/app/config';
import AmendComponent from 'src/app/components/AmendComponent/AmendComponent';
import RegistraionProps from '../../RegistrationForm/PropsType';
import {
  Step3Get,
  Step3Put,
} from '../../RegistrationForm/EcommercePlatform/APIActions';
import StepButtons from '../../RegistrationForm/StepButtomComponent';
import { GetStatus } from '../../RegistrationForm/GetStatusAPIService';
import Step3DtoAmend from '../Model/Step3DTOAmend';
import DynamicTooltip, { GetHistoryRequestDTO } from 'src/app/components/DynamicTooltip/DynamicTooltipComponent';
import axiosInstance from 'src/app/services/AxiosInstance';

type attachment = {
  attachment: string;
  file: string;
};

const EcommercePlatformAmend = ({
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
  const {
    fileList: fileList_WebsiteLogo,
    setFileList: setFileList_WebsiteLogo,
  } = useFileUpload();

  const [loading, setLoading] = useState<boolean>(false);
  const defaultAttachment = { attachment: '', file: '' };
  const [websiteUrls, setWebsiteUrls] = useState<attachment[]>([
    { attachment: '', file: '' },
  ]);
  const [socialMediaUrls, setSocialMediaUrls] = useState<attachment[]>([
    { attachment: '', file: '' },
  ]);

  const [mobileAppUrls, setMobileAppUrls] = useState<attachment[]>([
    { attachment: '', file: '' },
  ]);
  const formRef = React.useRef<FormInstance>(null);

  const [originalWebsiteUrl, setOriginalWebsiteUrl] = useState<attachment[]>([]);
  const fetchOriginalWebsiteUrlAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'websiteUrls',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setOriginalWebsiteUrl(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setOriginalWebsiteUrl([]);
    } finally {
      setLoading(false);
    }
  };

  const [originalSocialMediaUrl, setOriginalSocialMediaUrl] = useState<attachment[]>([]);
  const fetchOriginalSocialMediaUrlAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'socialMediaUrls',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setOriginalSocialMediaUrl(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setOriginalSocialMediaUrl([]);
    } finally {
      setLoading(false);
    }
  };

  const [originalMobileAppUrl, setOriginalMobileAppUrl] = useState<attachment[]>([]);
  const fetchOriginalMobileAppUrlAttachmentData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: 'mobileApplicationUrl',
      id: +id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetAttachmentDifference',
        PostBody
      );

      setOriginalMobileAppUrl(JSON.parse(response.data[PostBody.fieldName])); // Adjust according to your API response
    } catch (error) {
      setOriginalMobileAppUrl([]);
    } finally {
      setLoading(false);
    }
  };

  const checkIsOriginalWebsiteUrls = (url: string): string => {
    console.log("Check url website",url);
    let result = "green";
    console.log("Check valuelist website",originalWebsiteUrl);

    originalWebsiteUrl?.forEach((item: attachment) => {
      if (item.file === url) {
        result = "blue";
      }
      console.log("Check value websiet",item.file);

    });
    console.log("Check file website",originalWebsiteUrl);
    console.log("Check result website",result);
    return result;
  };

  const checkIsOriginalSocialMediaUrls = (url: string): string => {
    let result = 'green';
    originalSocialMediaUrl?.forEach((item: attachment) => {
      if (item.file === url) {
        result = 'blue';
      }
    });

    return result;
  };

  const checkIsOriginalMobileAppUrls = (url: string): string => {
    let result = 'green';
    originalMobileAppUrl?.forEach((item: attachment) => {
      if (item.file === url) {
        result = 'blue';
      }
    });

    return result;
  };

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
    const data: Step3DtoAmend = JSON.parse(JSON.stringify(values));
    const response = async () => {
      const result = await Step3Put(id, data);
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
    if (
      applyType === 'New' ||
      applyType === '' ||
      applyType === 'Amend' ||
      applyType === 'Amend'
    ) {
      if (
        !values.isWebsite &&
        !values.isSocialMedia &&
        !values.isMobileApplication
      ) {
        showWarning(
          'Website (သို့မဟုတ်) Social Media (သို့မဟုတ်) Mobile Application တစ်ခုခုရွေးရန် လိုအပ်ပါသည်။'
        );
        return;
      }

      if (
        values.isWebsite === '' &&
        values.isSocialMedia === '' &&
        values.isMobileApplication === ''
      ) {
        showWarning(
          'Website (သို့မဟုတ်) Social Media (သို့မဟုတ်) Mobile Application တစ်ခုခုရွေးရန် လိုအပ်ပါသည်။'
        );
        return;
      }

      if (values['isWebsite'] === true && websiteUrls.length < 2) {
        Modal.warn({
          title: 'Invalid',
          content:
            //  'Both Company Registration No & SME Registration No cannot be empty',
            'Website အချက်လက်များ ပြည့်စုံစွာ ဖြည့်ပေးပါ။',
        });
        return;
      } else if (
        values['isSocialMedia'] === true &&
        socialMediaUrls.length < 2
      ) {
        Modal.warn({
          title: 'Invalid',
          content:
            //  'Both Company Registration No & SME Registration No cannot be empty',
            'Social Medial အချက်လက်များ ပြည့်စုံစွာ ဖြည့်ပေးပါ။',
        });
        return;
      } else if (
        values['isMobileApplication'] === true &&
        mobileAppUrls.length < 2
      ) {
        Modal.warn({
          title: 'Invalid',
          content:
            //  'Both Company Registration No & SME Registration No cannot be empty',
            'Mobile Applications အချက်လက်များ ပြည့်စုံစွာ ဖြည့်ပေးပါ။',
        });
        return;
      } else {
        values['websiteLogo'] = JSON.stringify(
          imageFilter(values['websiteLogo'], fileList_WebsiteLogo)
        );
        values['isWebsite'] = values['isWebsite'] ? true : false;
        values['isSocialMedia'] = values['isSocialMedia'] ? true : false;
        values['isMobileApplication'] = values['isMobileApplication']
          ? true
          : false;
        values['websiteUrls'] = JSON.stringify(websiteUrls);
        values['socialMediaUrls'] = JSON.stringify(socialMediaUrls);
        values['mobileApplicationUrl'] = JSON.stringify(mobileAppUrls);

        setLoading(true);
        const passData: Step3DtoAmend = JSON.parse(JSON.stringify(values));
        passData.companyOrIndividualType = registrationType;

        if (id !== '') {
          newEdit(passData);
        }
      }
    } else {
      next();
    }
  };

  const handleAddWebsiteUrl = () => {
    const updatedUrls = [...websiteUrls].map((data, index) => {
      if (index === websiteUrls.length - 1) {
        const temp = data;
        temp.file = fileList_website[fileList_website.length - 1]?.name;
        return temp;
      } else {
        return data;
      }
    });
    setWebsiteUrls([...updatedUrls, defaultAttachment]);
    setFileList_website([]);
  };

  const handleAddSocialMediaUrl = () => {
    const updatedUrls = [...socialMediaUrls].map((data, index) => {
      if (index === socialMediaUrls.length - 1) {
        const temp = data;
        temp.file = fileList_social[fileList_social.length - 1]?.name;
        return temp;
      } else {
        return data;
      }
    });
    setSocialMediaUrls([...updatedUrls, defaultAttachment]);
    setFileList_socia([]);
  };

  const handleAddMobileAppUrl = () => {
    const updatedUrls = [...mobileAppUrls].map((data, index) => {
      if (index === mobileAppUrls.length - 1) {
        const temp = data;
        temp.file = fileList_app[fileList_app.length - 1]?.name;
        return temp;
      } else {
        return data;
      }
    });
    setMobileAppUrls([...updatedUrls, defaultAttachment]);
    setFileList_app([]);
  };

  const handleWebsiteUrlChange = (e: string) => {
    const updatedUrls = [...websiteUrls].map((data, index) => {
      if (index === websiteUrls.length - 1) {
        const temp = data;
        temp.attachment = e;
        return temp;
      } else {
        return data;
      }
    });
    setWebsiteUrls(updatedUrls);
  };

  const handleSocialMediaUrlChange = (e: string) => {
    const updatedUrls = [...socialMediaUrls].map((data, index) => {
      if (index === socialMediaUrls.length - 1) {
        const temp = data;
        temp.attachment = e;
        return temp;
      } else {
        return data;
      }
    });
    setSocialMediaUrls(updatedUrls);
  };

  const handleMobileAppUrlChange = (e: string) => {
    const updatedUrls = [...mobileAppUrls].map((data, index) => {
      if (index === mobileAppUrls.length - 1) {
        const temp = data;
        temp.attachment = e;
        return temp;
      } else {
        return data;
      }
    });
    setMobileAppUrls(updatedUrls);
  };

  const showWebsite = (show: boolean) => {
    const website = document.getElementById('Website');
    if (show) {
      if (website) {
        website.style.display = 'block';
      }
    } else {
      if (website) {
        website.style.display = 'none';
      }
    }
  };
  const websiteOnChange = (e: CheckboxChangeEvent) => {
    showWebsite(e.target.checked);
  };

  const showSocialMedia = (show: boolean) => {
    const dom = document.getElementById('SocialMedia');
    if (show) {
      if (dom) {
        dom.style.display = 'block';
      }
    } else {
      if (dom) {
        dom.style.display = 'none';
      }
    }
  };

  const socialMediaOnChange = (e: CheckboxChangeEvent) => {
    showSocialMedia(e.target.checked);
  };

  const showMobileApp = (show: boolean) => {
    const dom = document.getElementById('MobileApplication');
    if (show) {
      if (dom) {
        dom.style.display = 'block';
      }
    } else {
      if (dom) {
        dom.style.display = 'none';
      }
    }
  };

  const mobileAppOnChange = (e: CheckboxChangeEvent) => {
    showMobileApp(e.target.checked);
  };

  useEffect(() => {
    const website = document.getElementById('Website');
    if (website) {
      website.style.display = 'none';
    }
    const SocialMedia = document.getElementById('SocialMedia');
    if (SocialMedia) {
      SocialMedia.style.display = 'none';
    }
    const mobileApp = document.getElementById('MobileApplication');
    if (mobileApp) {
      mobileApp.style.display = 'none';
    }
    setButton();
    if (id !== '') {
      setLoading(true);
      const response = async () => {
        const result = await Step3Get(id);
        fetchOriginalWebsiteUrlAttachmentData();
        fetchOriginalSocialMediaUrlAttachmentData();
        fetchOriginalMobileAppUrlAttachmentData();
        if (result) {
          formRef.current?.setFieldsValue(result);
          const temp: Step3DtoAmend = JSON.parse(JSON.stringify(result));
          setRegistrationType(temp.companyOrIndividualType);
          console.log(result);
          showWebsite(temp.isWebsite);
          showSocialMedia(temp.isSocialMedia);
          showMobileApp(temp.isMobileApplication);
          try {
            if (result['websiteLogo'] !== null) {
              setFileList_WebsiteLogo(JSON.parse(result['websiteLogo']));
            }
          } catch (ex) {
            const error = ex;
            console.log(error);
          }
          try {
            if (result['websiteUrls'] !== null) {
              setWebsiteUrls(JSON.parse(result['websiteUrls']));
            }
          } catch (ex) {
            const error = ex;
            console.log(error);
          }
          try {
            if (result['socialMediaUrls'] !== null) {
              setSocialMediaUrls(JSON.parse(result['socialMediaUrls']));
            }
          } catch (ex) {
            const error = ex;
            console.log(error);
          }
          try {
            if (result['mobileApplicationUrl'] !== null) {
              setMobileAppUrls(JSON.parse(result['mobileApplicationUrl']));
            }
          } catch (ex) {
            const error = ex;
            console.log(error);
          }

          setLoading(false);
        }
      };
      response();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  const {
    fileList: fileList_website,
    imageCropFunction: imageCropFunction_website,
    onPreview: onPreview_website,
    setFileList: setFileList_website,
    onChange: onChange_website,
  } = useFileUpload();

  const {
    fileList: fileList_social,
    imageCropFunction: imageCropFunction_social,
    onPreview: onPreview_social,
    setFileList: setFileList_socia,
    onChange: onChange_social,
  } = useFileUpload();

  const {
    fileList: fileList_app,
    imageCropFunction: imageCropFunction_app,
    onPreview: onPreview_app,
    setFileList: setFileList_app,
    onChange: onChange_app,
  } = useFileUpload();

  const GetStatusFromAPI = useMemo(async () => await GetStatus(id), [id]);
  const [disable, setDisable] = useState<boolean>(false);
  useEffect(() => {
    const apiCall = async () => {
      const status = await GetStatusFromAPI;
      if (status === 'Pending' || status === 'Approve') {
        const dom = document.getElementById('checkBox');
        if (dom) {
          dom.style.pointerEvents = 'none';
          setDisable(true);
        }
      }
    };
    apiCall();
  }, [GetStatusFromAPI, id]);
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Form
        ref={formRef}
        onFinish={onFinish}
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 900 }}
      >
        <Form.Item label="e-Commerce Platform">
          <div id="checkBox" className="checkBoxClass">
            <Button>
              <Form.Item noStyle valuePropName="checked" name="isWebsiteAmend">
                <Checkbox>ပြင်ဆင်မည်</Checkbox>
              </Form.Item>
            </Button>
            <Form.Item name={'isWebsite'} noStyle valuePropName="checked">
              <Checkbox onChange={websiteOnChange}>
                Website(www.yourdomain.com)
              </Checkbox>
            </Form.Item>

            <DynamicTooltip fieldName={'isWebsite'} id={+id}></DynamicTooltip>

            <Button>
              <Form.Item
                noStyle
                valuePropName="checked"
                name="isSocialMediaAmend"
              >
                <Checkbox>ပြင်ဆင်မည်</Checkbox>
              </Form.Item>
            </Button>

            <Form.Item name={'isSocialMedia'} noStyle valuePropName="checked">
              <Checkbox onChange={socialMediaOnChange}>
                Social Media(Facebook,Twiter,etc..)
              </Checkbox>
            </Form.Item>

            <DynamicTooltip
              fieldName={'isSocialMedia'}
              id={+id}
            ></DynamicTooltip>

            <Button>
              <Form.Item
                noStyle
                valuePropName="checked"
                name="isMobileApplicationAmend"
              >
                <Checkbox>ပြင်ဆင်မည်</Checkbox>
              </Form.Item>
            </Button>
            <Form.Item
              name={'isMobileApplication'}
              noStyle
              valuePropName="checked"
            >
              <Checkbox onChange={mobileAppOnChange}>
                Mobile Applications......
              </Checkbox>
            </Form.Item>

            <DynamicTooltip
              fieldName={'isMobileApplication'}
              id={+id}
            ></DynamicTooltip>
          </div>
        </Form.Item>

        <div id="Website">
          <Form.Item
            label={
              <>
                <DynamicTooltip
                  fieldName={'websiteUrls'}
                  id={+id}
                ></DynamicTooltip>
                &nbsp; Website URLs
              </>
            }
            name="websiteUrls"
          >
            {websiteUrls.map((url, index) => (
              <Space key={index} style={{ display: 'flex', marginBottom: 8 }}>
                {index !== websiteUrls.length - 1 && (
                  <>
                    <a target="blank" 
                    style={{ color: checkIsOriginalWebsiteUrls(url.file) }}
                    href={envConfig.imageUrl + url.file}>
                      {index + 1} . {url.attachment}
                    </a>
                    <Button
                      disabled={disable}
                      onClick={() => {
                        const updatedUrls = [...websiteUrls].filter(
                          (data, i) => i !== index
                        );
                        setWebsiteUrls(updatedUrls);
                      }}
                      type="ghost"
                      //icon={<DeleteOutlined />}
                      size={'small'}
                    />
                  </>
                )}

                {index === websiteUrls.length - 1 && (
                  <>
                    <Input
                      value={url.attachment}
                      onChange={(e) => handleWebsiteUrlChange(e.target.value)}
                      placeholder="Website URL"
                      prefix={<LinkOutlined />}
                    />
                    <ImgCrop beforeCrop={imageCropFunction_website}>
                      <Upload
                        accept="image/jpg,image/png,image/jpeg"
                        fileList={fileList_website}
                        onChange={onChange_website}
                        //showUploadList={false}
                        action={
                          envConfig.baseUrl +
                          'Upload/Postupload?filename=' +
                          fileList_website[fileList_website.length - 1]?.name
                        }
                        onPreview={onPreview_website}
                        //disabled={fileList.length === 0 ? false : true}
                      >
                        <Button disabled={disable} icon={<UploadOutlined />}>
                          Upload
                        </Button>
                      </Upload>
                    </ImgCrop>
                    <Button
                      disabled={disable}
                      onClick={handleAddWebsiteUrl}
                      icon={<PlusOutlined />}
                    >
                      Click To Add
                    </Button>
                  </>
                )}
              </Space>
            ))}
            Upload ကို Click ၍ တွဲတင်မည့် File အားရွေးချယ်ပြီး Click to Add ကို နှိပ်ပါ။ Click to Add နှိပ်ပြီးပါက မိမိတွဲတင်လိုက်သော Attachment များ မှန်ကန်မှု ရှိ/မရှိ ပြန်လည်စစ်ဆေးပါ။  
          </Form.Item>
        </div>

        <div id="SocialMedia">
          <Form.Item
            label={
              <>
                <DynamicTooltip
                  fieldName={'socialMediaUrls'}
                  id={+id}
                ></DynamicTooltip>
                &nbsp; Social Media URLs
              </>
            }
            name="socialMediaUrls"
            rules={[
              {
                required: false,
                message: 'Please enter at least one social media URL',
              },
            ]}
          >
            {socialMediaUrls.map((url, index) => (
              <Space key={index} style={{ display: 'flex', marginBottom: 8 }}>
                {index !== socialMediaUrls.length - 1 && (
                  <>
                    <a target="blank"
                    style={{ color: checkIsOriginalSocialMediaUrls(url.file) }}
                     href={envConfig.imageUrl + url.file}>
                      {index + 1} . {url.attachment}
                    </a>
                    <Button
                      disabled={disable}
                      onClick={() => {
                        const updatedUrls = [...socialMediaUrls].filter(
                          (data, i) => i !== index
                        );
                        setSocialMediaUrls(updatedUrls);
                      }}
                      type="ghost"
                      //icon={<DeleteOutlined />}
                      size={'small'}
                    />
                  </>
                )}

                {index === socialMediaUrls.length - 1 && (
                  <>
                    <Input
                      value={url.attachment}
                      onChange={(e) =>
                        handleSocialMediaUrlChange(e.target.value)
                      }
                      placeholder="Social Media URL"
                      prefix={<LinkOutlined />}
                    />
                    <ImgCrop beforeCrop={imageCropFunction_social}>
                      <Upload
                        accept="image/jpg,image/png,image/jpeg"
                        fileList={fileList_social}
                        onChange={onChange_social}
                        //showUploadList={false}
                        action={
                          envConfig.baseUrl +
                          'Upload/Postupload?filename=' +
                          fileList_social[fileList_social.length - 1]?.name
                        }
                        onPreview={onPreview_social}
                        //disabled={fileList.length === 0 ? false : true}
                      >
                        <Button disabled={disable} icon={<UploadOutlined />}>
                          Upload
                        </Button>
                      </Upload>
                    </ImgCrop>
                    <Button
                      disabled={disable}
                      onClick={handleAddSocialMediaUrl}
                      icon={<PlusOutlined />}
                    >
                      Click To Add
                    </Button>
                  </>
                )}
              </Space>
            ))}
            Upload ကို Click ၍ တွဲတင်မည့် File အားရွေးချယ်ပြီး Click to Add ကို နှိပ်ပါ။ Click to Add နှိပ်ပြီးပါက မိမိတွဲတင်လိုက်သော Attachment များ မှန်ကန်မှု ရှိ/မရှိ ပြန်လည်စစ်ဆေးပါ။  
          </Form.Item>

          <AmendComponent
            readOnly={false}
            applyType={applyType}
            name={'influencer'}
            label={
              <>
                <DynamicTooltip
                  fieldName={'influencer'}
                  id={+id}
                ></DynamicTooltip>
                &nbsp; Influencer/Reseller
              </>
            }
          >
            <Form.Item noStyle name="influencer">
              <Radio.Group disabled={disable}>
                <Radio value={'Influencer'}>Influencer</Radio>
                <Radio value={'Reseller'}>Reseller</Radio>
              </Radio.Group>
            </Form.Item>
          </AmendComponent>
        </div>

        <div id="MobileApplication">
          <Form.Item
            label={
              <>
                <DynamicTooltip
                  fieldName={'mobileApplicationUrl'}
                  id={+id}
                ></DynamicTooltip>
                &nbsp; Mobile Application URLs
              </>
            }
            name="mobileApplicationUrl"
            rules={[
              {
                required: false,
                message: 'Please enter at least one Mobile Application URL',
              },
            ]}
          >
            {mobileAppUrls.map((url, index) => (
              <Space key={index} style={{ display: 'flex', marginBottom: 8 }}>
                {index !== mobileAppUrls.length - 1 && (
                  <>
                    <a target="blank" 
                    style={{ color: checkIsOriginalMobileAppUrls(url.file) }}
                    href={envConfig.imageUrl + url.file}>
                      {index + 1} . {url.attachment}
                    </a>
                    <Button
                      disabled={disable}
                      onClick={() => {
                        const updatedUrls = [...mobileAppUrls].filter(
                          (data, i) => i !== index
                        );
                        setMobileAppUrls(updatedUrls);
                      }}
                      type="ghost"
                      //icon={<DeleteOutlined />}
                      size={'small'}
                    />
                  </>
                )}

                {index === mobileAppUrls.length - 1 && (
                  <>
                    <Input
                      value={url.attachment}
                      onChange={(e) => handleMobileAppUrlChange(e.target.value)}
                      placeholder="Mobile App URL"
                      prefix={<LinkOutlined />}
                    />
                    <ImgCrop beforeCrop={imageCropFunction_app}>
                      <Upload
                        accept="image/jpg,image/png,image/jpeg"
                        fileList={fileList_app}
                        onChange={onChange_app}
                        //showUploadList={false}
                        action={
                          envConfig.baseUrl +
                          'Upload/Postupload?filename=' +
                          fileList_app[fileList_app.length - 1]?.name
                        }
                        onPreview={onPreview_app}
                        //disabled={fileList.length === 0 ? false : true}
                      >
                        <Button disabled={disable} icon={<UploadOutlined />}>
                          Upload
                        </Button>
                      </Upload>
                    </ImgCrop>
                    <Button
                      disabled={disable}
                      onClick={handleAddMobileAppUrl}
                      icon={<PlusOutlined />}
                    >
                      Click To Add
                    </Button>
                  </>
                )}
              </Space>
            ))}
            Upload ကို Click ၍ တွဲတင်မည့် File အားရွေးချယ်ပြီး Click to Add ကို နှိပ်ပါ။ Click to Add နှိပ်ပြီးပါက မိမိတွဲတင်လိုက်သော Attachment များ မှန်ကန်မှု ရှိ/မရှိ ပြန်လည်စစ်ဆေးပါ။  
          </Form.Item>
        </div>
        {buttonComponent}
      </Form>
    </Spin>
  );
};

export default EcommercePlatformAmend;

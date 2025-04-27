import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  UploadFile,
  FormInstance,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import envConfig from 'src/app/config';
import ImgCrop from 'antd-img-crop';
import useFileUploadNoCrop from 'src/app/Hooks/useFileUploadWithoutCrop';
import { AnyObject } from 'src/Models/AnyObject';
import axiosInstance from 'src/app/services/AxiosInstance';
import GetAnnouncemt from './APIAction';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormActions from 'src/app/Hooks/useFormActions';
import { useNavigate } from 'react-router-dom';

const AnnouncementPage = () => {
  const formRef = React.useRef<FormInstance>(null);
  const { id, action } = useFormhelper();
  const { writeLoading } = useFormActions(id, action, 'Announcement');
  const navigate = useNavigate();

  const [content, setContent] = useState('');
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

  const {
    fileList: fileList_Passport,
    setFileList: setfileList_Passport,
    beforeUpload: beforeUpload_Passport,
    onPreview: onPreview_Passport,
    onChange: onChange_Passport,
  } = useFileUploadNoCrop();

  const onFinish = async (values: AnyObject) => {
    values['logoImgUrl'] = JSON.stringify(
      imageFilter(values['logoImgUrl'], fileList_Passport)
    );

    try {
      if (action === 'New') {
        await axiosInstance.post('Announcement', values);
        message.success('Announcement created successfully!');
      } else if (action === 'Edit') {
        const jsonObject = values as { [key: string]: unknown };
        jsonObject.id = id;
        await axiosInstance.put('Announcement/' + id, values);
        message.success('Announcement Edited successfully!');
        navigate('/Announcement/List');
      } else if (action === 'Delete') {
        await axiosInstance.delete('Announcement/' + id);
        message.success('Announcement deleted successfully!');
        navigate('/Announcement/List');
      } else {
        console.log('Detail');
      }
    } catch (error) {
      message.error('An error occurred while creating the announcement.');
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    const onLoad = async () => {
      const result = await GetAnnouncemt(id);
      if (result) {
        formRef.current?.setFieldsValue(result);
        if (result['logoImgUrl'] !== null) {
          setfileList_Passport(JSON.parse(result['logoImgUrl']));
        }
      }
    };
    onLoad();
  }, [id, setfileList_Passport]);

  return (
    <div>
      <h2>Create Announcement</h2>
      <Form ref={formRef} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Content" name="content" rules={[{ required: true }]}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
          />
        </Form.Item>
        <Form.Item label="LogoImg" name="logoImgUrl">
          <ImgCrop beforeCrop={beforeUpload_Passport}>
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
              <Button icon={<UploadOutlined />}>Upload Passport Page 1</Button>
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
            <AjaxButton writeLoading={writeLoading} action={action} />
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AnnouncementPage;

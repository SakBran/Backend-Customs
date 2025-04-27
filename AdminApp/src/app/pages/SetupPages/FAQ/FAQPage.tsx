import React, { useEffect, useState } from 'react';
import { Form, Input, message, FormInstance, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useFileUploadNoCrop from 'src/app/Hooks/useFileUploadWithoutCrop';
import { AnyObject } from 'src/Models/AnyObject';
import axiosInstance from 'src/app/services/AxiosInstance';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormActions from 'src/app/Hooks/useFormActions';
import { useNavigate } from 'react-router-dom';
import GetFAQ from './APIAction';
const { Option } = Select;
const FAQPage = () => {
  const formRef = React.useRef<FormInstance>(null);
  const { id, action } = useFormhelper();
  const { writeLoading } = useFormActions(id, action, 'FAQ');
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  const { setFileList: setfileList_Passport } = useFileUploadNoCrop();

  const onFinish = async (values: AnyObject) => {
    try {
      if (action === 'New') {
        await axiosInstance.post('FAQ', values);
        message.success('FAQ created successfully!');
      } else if (action === 'Edit') {
        const jsonObject = values as { [key: string]: unknown };
        jsonObject.id = id;
        await axiosInstance.put('FAQ/' + id, values);
        message.success('FAQ Edited successfully!');
        navigate('/FAQ/List');
      } else if (action === 'Delete') {
        await axiosInstance.delete('FAQ/' + id);
        message.success('FAQ deleted successfully!');
        navigate('/FAQ/List');
      } else {
        console.log('Detail');
      }
    } catch (error) {
      message.error('An error occurred while creating the FAQ.');
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    const onLoad = async () => {
      const result = await GetFAQ(id);
      if (result) {
        formRef.current?.setFieldsValue(result);
      }
    };
    onLoad();
  }, [id, setfileList_Passport]);

  return (
    <div>
      <h2>Create FAQ</h2>
      <Form ref={formRef} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="FAQ Question"
          name="faqQuestion"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="FAQ Answer"
          name="faqAnswer"
          rules={[{ required: true }]}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
          />
        </Form.Item>
        {/* <Form.Item label="Faq Category" name="faqCategory">
          <select name="faqCategory" id="faqCategory">
            <option value="Certificate of Importer/Exporter Registration">
              Certificate of Importer/Exporter Registration
            </option>
            <option value="TradeNet Membership Application">
              TradeNet Membership Application
            </option>
            <option value="Import/Export Licence">Import/Export Licence</option>
            <option value="General">General</option>
          </select>
        </Form.Item> */}
        <Form.Item
          label="FAQ Category"
          name="faqCategory"
          rules={[
            { required: true, message: 'Please enter the faq category!' },
          ]}
        >
          <Select placeholder="Select faq category">
            <Option value={'How To Apply'}>How To Apply</Option>
            <Option value={'General'}>General</Option>
          </Select>
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

export default FAQPage;

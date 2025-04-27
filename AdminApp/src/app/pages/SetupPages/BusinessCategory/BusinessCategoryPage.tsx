import { Form, Input, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { AnyObject } from 'src/Models/AnyObject';
import { OptionDTO } from 'src/Models/OptionDTO';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormLoad from 'src/app/Hooks/useFormload';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
import axiosInstance from 'src/app/services/AxiosInstance';
const APIURL = 'BusinessCategory';
const { Option } = Select;
const GetOnlineBusinessType = async (): Promise<OptionDTO[]> => {
  try {
    const response = await axiosInstance.get('Options/GetOnlineBusinessType');
    const result = await response.data;
    console.log('On Load', result);
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

const BusinessCategoryPage = () => {
  const [onlineBusinessTypeList, setOnlineBusinessTypeList] = useState<
    OptionDTO[]
  >([]);
  const onLoad = async () => {
    const onlineBusinessTypeResult = await GetOnlineBusinessType();

    if (onlineBusinessTypeResult) {
      setOnlineBusinessTypeList(onlineBusinessTypeResult);
    }
  };
  useEffect(() => {
    onLoad();
  }, []);

  const { readOnly, id, action } = useFormhelper();
  const { formRef, loading } = useFormLoad(id, action, APIURL);
  const { onFinish, writeLoading } = useFormActions(id, action, APIURL);

  const onSave = (values: AnyObject) => {
    values['businessTypeId'] = JSON.stringify(values['businessTypeId']);
    onFinish(values);
  };
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Form
        ref={formRef}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 800 }}
        //initialValues={{ remember: true }}
        onFinish={onSave}
      >
        <Form.Item
          label="Business Category"
          name="name"
          rules={[
            { required: true, message: 'Please enter the Business Category!' },
          ]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Business Type"
          name="businessTypeId"
          rules={[{ required: true, message: 'Please selecnt one' }]}
        >
          <Select mode="multiple" placeholder="Select Type of Online Business">
            {onlineBusinessTypeList.map((item: OptionDTO, index: number) => {
              return (
                <Option key={index} value={item.value}>
                  {item.value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Is Active"
          name="isActive"
          rules={[{ required: true, message: 'Please selecnt one' }]}
        >
          <Select
            disabled={readOnly}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'In-Active', label: 'In-Active' },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
          <AjaxButton writeLoading={writeLoading} action={action} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default BusinessCategoryPage;

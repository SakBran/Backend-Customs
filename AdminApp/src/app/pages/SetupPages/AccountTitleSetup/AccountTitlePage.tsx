import { Form, Input, Select, Spin } from 'antd';
import Password from 'antd/es/input/Password';
import { useEffect, useState } from 'react';
import { OptionDTO } from 'src/Models/OptionDTO';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormLoad from 'src/app/Hooks/useFormload';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
import axiosInstance from 'src/app/services/AxiosInstance';
const APIURL = 'AccountTitle';
const { Option } = Select;
const GetAccountType = async (): Promise<OptionDTO[]> => {
  try {
    const response = await axiosInstance.get('Options/GetAccountType');
    const result = await response.data;
    console.log('On Load', result);
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
const GetChequeNo = async (): Promise<OptionDTO[]> => {
  try {
    const response = await axiosInstance.get('Options/GetChequeNo');
    const result = await response.data;
    console.log('On Load', result);
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

const AccountTitlePage = () => {
  const { readOnly, id, action } = useFormhelper();
  const { formRef, loading } = useFormLoad(id, action, APIURL);
  const { onFinish, writeLoading } = useFormActions(id, action, APIURL);
  const validateNumber = (_: any, value: string) => {
    if (!/^[0-9]+$/.test(value)) {
      return Promise.reject('Only numbers are allowed');
    }
    return Promise.resolve();
  };

  const [AccountTypeList, setAccountTypeList] = useState<OptionDTO[]>([]);
  const onLoad = async () => {
    const AccountTypeResult = await GetAccountType();

    if (AccountTypeResult) {
      setAccountTypeList(AccountTypeResult);
    }
  };

  const [ChequeNoList, setChequeNoList] = useState<OptionDTO[]>([]);
  const onLoadChequeNo = async () => {
    const ChequeNoResult = await GetChequeNo();

    if (ChequeNoResult) {
      setChequeNoList(ChequeNoResult);
    }
  };
  useEffect(() => {
    onLoadChequeNo();
    onLoad();
  }, []);
  return (
    <Spin tip="Loading..." spinning={loading}>
      <Form
        ref={formRef}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Account Title"
          name="description"
          rules={[{ required: true, message: 'Please enter the Description!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Apply Type"
          name="applyType"
          rules={[{ required: true, message: 'Please enter the apply type!' }]}
        >
          <Select placeholder="Select apply type">
            <Option value={'New'}>New</Option>
            <Option value={'Amend'}>Amend</Option>
            <Option value={'Cancel'}>Cancel</Option>
            <Option value={'Extension'}>Extension</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Registration Type"
          name="registrationType"
          rules={[
            { required: true, message: 'Please enter the registration Type!' },
          ]}
        >
          <Select placeholder="Select Registration Type">
            <Option value={'company'}>Company</Option>
            <Option value={'individual'}>Individual</Option>
            <Option value={'sme'}>SME Company</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Cheque No"
          name="chequeNo"
          rules={[{ required: true, message: 'Please enter the chequeNo!' }]}
        >
          <Select placeholder="Select Cheque No List">
            {ChequeNoList.map((item: OptionDTO, index: number) => {
              return (
                <Option key={index} value={item.value}>
                  {item.value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Account Type"
          name="accountType"
          rules={[{ required: true, message: 'Please enter the AccountType!' }]}
        >
          <Select placeholder="Select Type of Account">
            {AccountTypeList.map((item: OptionDTO, index: number) => {
              return (
                <Option key={index} value={item.value}>
                  {item.value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: 'Please enter number amount!',
            },
            {
              validator: validateNumber,
            },
          ]}
        >
          <Input type="number" placeholder="Amount..." min={0} />
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

export default AccountTitlePage;

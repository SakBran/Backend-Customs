import { Divider, Form, Input, Spin } from 'antd';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormLoad from 'src/app/Hooks/useFormload';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
const APIURL = 'SystemSetting';

const SystemSettingPage = () => {
  const { readOnly, id, action } = useFormhelper();
  const { formRef, loading } = useFormLoad(id, action, APIURL);
  const { onFinish, writeLoading } = useFormActions(id, action, APIURL);

  return (
    <Spin tip="Loading..." spinning={loading}>
      <Form
        ref={formRef}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 800 }}
        //initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="AYA Gate Way Url"
          name="mpuUrl"
          rules={[{ required: true, message: 'Please enter the MPU Url!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="AYA Enquiry Url"
          name="ayaEnquiryURl"
          rules={[{ required: true, message: 'Please enter the Enquiry Url!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Merchant"
          name="merchantId"
          rules={[{ required: true, message: 'Please enter the Merchant!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item
          label="App Key"
          name="secretKey"
          rules={[{ required: true, message: 'Please enter the App Key!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="App Secret"
          name="appSecret"
          rules={[{ required: true, message: 'Please enter the App Secret!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item
          label="currency Code"
          name="currencyCode"
          rules={[
            { required: true, message: 'Please enter the currency code!' },
          ]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          label="IM Amount"
          name="imAmount"
          rules={[{ required: true, message: 'Please enter the IM Amount!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item
          label="MOC Amount"
          name="mocAmount"
          rules={[{ required: true, message: 'Please enter the MOC Amount!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Online Fees Amount"
          name="onlineFees"
          rules={[
            { required: true, message: 'Please enter the Online Fee Amount!' },
          ]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Registration Year"
          name="registrationYear"
          help="Registration Yearက တစ်နှစ်(1 year)ဆိုရင် 365 လို့ထည့်ပေးရမည်။ ရက်အလိုက်တွက်ထားတာမလို့ပါ။"
          rules={[
            { required: true, message: 'Please enter the terms by days!' },
          ]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          label="SMS API URL"
          name="smsApiUrl"
          rules={[{ required: true, message: 'Please enter API Url!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item
          label="SMS API Username"
          name="smsUsername"
          rules={[{ required: true, message: 'Please enter the Username!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="SMS API Password"
          name="smsPassword"
          rules={[{ required: true, message: 'Please enter the Password!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Divider></Divider>
        <Form.Item
          label="S3 Access Key"
          name="s3accessKey"
          rules={[{ required: true, message: 'Please enter the Access Key!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item
          label="S3 Secret Key"
          name="s3secretKey"
          rules={[{ required: true, message: 'Please enter the Secret Key!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item
          label="Bucket Name"
          name="bucketName"
          rules={[{ required: true, message: 'Please enter the bucket Name!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item
          label="S3 Path"
          name="s3Path"
          rules={[{ required: true, message: 'Please enter the s3 Path!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Divider></Divider>
        <Form.Item
          label="Extenstion Period In Day"
          name="extensionPeriodInDays"
          rules={[
            {
              required: true,
              message: 'Please enter the Extenstion Period In Day!',
            },
          ]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
          <AjaxButton writeLoading={writeLoading} action={action} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default SystemSettingPage;

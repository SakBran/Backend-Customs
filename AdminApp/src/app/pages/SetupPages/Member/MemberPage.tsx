import { Form, Input, Select, Spin } from 'antd';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormLoad from 'src/app/Hooks/useFormload';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
const APIURL = 'Member';

const MemberPage = () => {
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
        <Form.Item label="Name" name="name">
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input readOnly={readOnly} />
        </Form.Item>
        <Form.Item label="Phone No" name="phoneNo">
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
          <AjaxButton writeLoading={writeLoading} action={action} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default MemberPage;

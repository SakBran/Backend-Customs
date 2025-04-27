import { Form, Input, Spin } from 'antd';
import Password from 'antd/es/input/Password';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormLoad from 'src/app/Hooks/useFormLoad';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
const APIURL = 'User';

const UserPage = () => {
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
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter the password!' }]}
        >
          <Password readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Permission"
          name="permission"
          rules={[{ required: true, message: 'Please enter the permission!' }]}
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

export default UserPage;

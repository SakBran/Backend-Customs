import { Form, Input, Select, Spin } from 'antd';
import Password from 'antd/es/input/Password';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormLoad from 'src/app/Hooks/useFormload';
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
          <Select
            disabled={readOnly}
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'Check User', label: 'Check User' },
              { value: 'Approve User', label: 'Approve User' },
              { value: 'Report User', label: 'Report User' },
              { value: 'Special User', label: 'Special User' },
              { value: 'Docareport User', label: 'Docareport User' },
              { value: 'Egovreport User', label: 'Egovreport User' },
              { value: 'Accountreport User', label: 'Accountreport User' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="IsActive"
          name="isActive"
          // rules={[{ required: true, message: 'Please enter the isActive!' }]}
          rules={[]} //Remove the required rule for isActive field
        >
          {/* <Select
            disabled={
              readOnly
            }
            options={[
              { value: true, label: 'Active' },
              { value: false, label: 'InActive' },
            ]}
          /> */}
          {/* <Input
            readOnly={true}
            value={formRef.current?.getFieldValue('isActive') ? 'Active' : 'InActive'}
          /> */}
          <Select
            disabled={true}
            options={[
              { value: 'True', label: 'Active' },
              { value: 'False', label: 'InActive' },
              { value: null, label: 'N/A' }
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

export default UserPage;

import { Form, Input, Select, Spin } from 'antd';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormLoad from 'src/app/Hooks/useFormload';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
const APIURL = 'AttachmentSetup';

const AttachmentSetupPage = () => {
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
          label="Step"
          name="step"
          rules={[{ required: true, message: 'Please Select One' }]}
        >
          <Select
            disabled={readOnly}
            options={[
              { value: 'Step 1', label: 'Step 1' },
              { value: 'Step 2', label: 'Step 2' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input readOnly={readOnly} />
        </Form.Item>

        <Form.Item
          label="Registration Type"
          name="registrationType"
          rules={[{ required: true, message: 'Please selecnt one' }]}
        >
          <Select
            disabled={readOnly}
            options={[
              { value: 'individual', label: 'individual' },
              { value: 'company', label: 'company' },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Is Required"
          name="isRequired"
          rules={[{ required: true, message: 'Please selecnt one' }]}
        >
          <Select
            disabled={readOnly}
            options={[
              { value: true, label: 'Required' },
              { value: false, label: 'Optional' },
            ]}
          />
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

export default AttachmentSetupPage;

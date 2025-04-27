import { Form, Input, Select, Spin } from 'antd';
import Password from 'antd/es/input/Password';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormhelper from 'src/app/Hooks/useFormhelper';
import useFormLoad from 'src/app/Hooks/useFormload';
import { AjaxButton } from 'src/app/components/AjaxButton/AjaxButton';
const APIURL = 'Question';

const QuestionPage = () => {
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {/* Question */}
        <Form.Item
          label="Question"
          name="question"
          rules={[{ required: true, message: 'Please enter the question' }]}
        >
          <Input placeholder="Enter the question" readOnly={readOnly} />
        </Form.Item>

        {/* Display Order */}
        <Form.Item
          label="Display Order"
          name="displayOrder"
          rules={[
            { required: true, message: 'Please enter the display order' },
          ]}
        >
          <Input
            type="number"
            min={1}
            readOnly={readOnly}
            placeholder="Enter display order"
          />
        </Form.Item>

        {/* Is Deleted */}
        <Form.Item
          label="Is Deleted"
          name="isDeleted"
          valuePropName="checked" // For Switch component
        >
          <Select
            disabled={readOnly}
            value={formRef.current?.getFieldValue('isDeleted')}
            options={[
              { value: true, label: 'true' },
              { value: false, label: 'false' },
            ]}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
          <AjaxButton writeLoading={writeLoading} action={action} />
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default QuestionPage;

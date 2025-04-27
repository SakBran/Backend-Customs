import { Button, Checkbox, Form, Space } from 'antd';
import { ReactNode } from 'react';
type props = {
  applyType: string;
  name: string;
  children: ReactNode;
  readOnly: boolean;
};
const DoubleAmendComponent = ({
  applyType,
  name,
  children,
  readOnly,
}: props) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  //const { readOnly } = useReadOnly();

  if (applyType === 'Amend') {
    return (
      <Space.Compact block style={{ width: '100%' }}>
        {/* <Button>
          <Form.Item noStyle name={componentName}>
            <Checkbox></Checkbox>
          </Form.Item>
        </Button> */}
        <fieldset disabled={readOnly} style={{ width: '100%' }}>
          {children}
        </fieldset>
      </Space.Compact>
    );
  } else {
    return (
      <Space.Compact block style={{ width: '100%' }}>
        <fieldset disabled={readOnly} style={{ width: '100%' }}>
          {children}
        </fieldset>
      </Space.Compact>
    );
  }
};

export default DoubleAmendComponent;

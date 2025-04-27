import { Button, Checkbox, Form, Space } from 'antd';
import { ReactNode } from 'react';
type props = {
  applyType: string;
  name: string;
  label: string | ReactNode;
  children: ReactNode;
  readOnly: boolean;
  help?: string | ReactNode;
};
const AmendComponent = ({
  applyType,
  name,
  label,
  children,
  readOnly,
  help,
}: props) => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const componentName = 'is' + capitalizeFirstLetter(name);
  //const { readOnly } = useReadOnly();
  if (applyType === 'Amend') {
    return (
      <Form.Item label={label} help={help}>
        {/* <Button>
            <Form.Item noStyle name={componentName}>
              <Checkbox></Checkbox>
            </Form.Item>
          </Button> */}
        <fieldset disabled={readOnly} style={{ width: '100%' }}>
          <Space.Compact block style={{ width: '100%' }}>
            {children}
          </Space.Compact>
        </fieldset>
      </Form.Item>
    );
  } else {
    return (
      <Form.Item label={label} help={help}>
        <Space.Compact block style={{ width: '100%' }}>
          <fieldset disabled={readOnly} style={{ width: '100%' }}>
            {children}
          </fieldset>
        </Space.Compact>
      </Form.Item>
    );
  }
};

export default AmendComponent;

import { Button, Checkbox, Form, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ReactNode } from 'react';
type props = {
  applyType: string;
  name: string;
  amendName: string;
  children: ReactNode;
  readOnly: boolean;
  setCheck: (value: boolean) => void;
  check: boolean;
};
const MultipleForDoubleAmendComponent = ({
  applyType,
  name,
  amendName,
  children,
  readOnly,
  setCheck,
  check,
}: props) => {
  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  //const { readOnly } = useReadOnly();

  if (applyType === 'Amend') {
    return (
      <fieldset disabled={readOnly} style={{ width: '100%' }}>
        <Space.Compact block style={{ width: '100%' }}>
          <Button>
            <Form.Item valuePropName="checked" noStyle name={amendName}>
              <Checkbox
                onChange={handleCheckBoxChange}
                checked={check}
              ></Checkbox>
            </Form.Item>
          </Button>
          {children}
        </Space.Compact>
      </fieldset>
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

export default MultipleForDoubleAmendComponent;

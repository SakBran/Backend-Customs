import { Button, Checkbox, Form, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ReactNode } from 'react';
type props = {
  applyType: string;
  name: string;
  amendName: string;
  label: string | ReactNode;
  check: boolean;
  setCheck: (value: boolean) => void;
  children: ReactNode;
  readOnly: boolean;
};
const MultipleCheckMarkAmendComponent = ({
  applyType,
  name,
  amendName,
  label,
  check,
  setCheck,
  children,
  readOnly,
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
      <Form.Item label={label}>
        <fieldset disabled={readOnly} style={{ width: '100%' }}>
          <Space.Compact block style={{ width: '100%' }}>
            <Button>
              <Form.Item noStyle valuePropName="checked" name={amendName}>
                <Checkbox
                  onChange={handleCheckBoxChange}
                  checked={check}
                ></Checkbox>
              </Form.Item>
            </Button>
            {children}
          </Space.Compact>
        </fieldset>
      </Form.Item>
    );
  } else {
    return (
      <Form.Item label={label}>
        <Space.Compact block style={{ width: '100%' }}>
          <fieldset disabled={readOnly} style={{ width: '100%' }}>
            {children}
          </fieldset>
        </Space.Compact>
      </Form.Item>
    );
  }
};

export default MultipleCheckMarkAmendComponent;

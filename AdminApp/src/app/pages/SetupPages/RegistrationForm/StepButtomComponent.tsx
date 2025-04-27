import { Button, Form } from 'antd';

type Props = {
  next: () => void;
  prev: () => void;
  first?: boolean;
  last?: boolean;
  id: string;
};
const StepButtons = ({ next, prev, first, last, id }: Props) => {
  if (first) {
    return (
      <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
        <Button type="primary" htmlType="submit">
          {/* {id === '' ? 'Submit' : 'Next'} */}
          Next
        </Button>
      </Form.Item>
    );
  }
  if (last) {
    return (
      <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
        <Button type="primary" onClick={() => prev()}>
          Previous
        </Button>
      </Form.Item>
    );
  }
  if (!first && !last) {
    return (
      <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
        <Button type="primary" onClick={() => prev()}>
          Previous
        </Button>
        {'   '}
        <Button type="primary" htmlType="submit">
          {/* {id === '' ? 'Submit' : 'Next'} */}
          Next
        </Button>
      </Form.Item>
    );
  }
};
export default StepButtons;

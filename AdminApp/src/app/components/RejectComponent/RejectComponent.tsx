import { Button, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from 'react';

const RejectComponent: React.FC = () => {
  return (
    <div>
      <TextArea
        showCount
        maxLength={500}
        style={{ height: 120, width: 500, marginBottom: 24 }}
        placeholder="Enter reject message"
      />
      <div style={{ marginLeft: 350 }}>
        <Space wrap >
          <Button>Cancel</Button>
          <Button type="primary" danger>Reject</Button>
        </Space>
      </div>
    </div>
  );
};

export default RejectComponent;

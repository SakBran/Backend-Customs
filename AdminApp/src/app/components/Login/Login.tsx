import { Form, Input, Button, Spin, Row, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Style.css';
import { AnyObject } from 'antd/es/table/Table';
import { useState } from 'react';

type Props = {
  Auth: (value: AnyObject) => void;
};
const LoginPage = ({ Auth }: Props) => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values: AnyObject) => {
    setLoading(true);
    Auth(values);
  };
  return (
    <Spin tip="Loading" size="large" spinning={loading}>
      <Row justify="center" align={'middle'} style={{ marginTop: '15%' }}>
        <Card
          cover={
            <img
              alt="Ministy of commerce"
              src="http://www.thaibizmyanmar.com/upload/iblock/7dd/7dd8e87e54aed43c3eaeb347bd4c2af6.jpg"
            />
          }
        >
          <Form name="loginForm" onFinish={onFinish}>
            <Form.Item
              name="Name"
              rules={[
                { required: true, message: 'Please enter your username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="Password"
              rules={[
                { required: true, message: 'Please enter your password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="form-button"
                size="large"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </Spin>
  );
};

export default LoginPage;

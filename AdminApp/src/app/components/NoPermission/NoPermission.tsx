import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Style.css';
const NoPermission: React.FC = () => {
  return (
    <div className="content">
      <ExclamationCircleOutlined className="icon" />
      <h2 className="title">Access Denied</h2>
      <p className="message">
        Sorry, you don't have permission to access this page.
      </p>
      <Link to="/" className="link">
        <Button type="primary">Go Back to Home</Button>
      </Link>
    </div>
  );
};

export default NoPermission;

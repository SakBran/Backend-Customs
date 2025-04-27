import { AnyObject } from 'antd/es/table/Table';
import { useState, useEffect } from 'react';
import { UserPayload } from '../components/Context/Context';
import LayoutComponent from '../components/Layout/LayoutComponent';
import Login from '../components/Login/Login';
import axiosInstance from '../services/AxiosInstance';
type User = {
  Name: string;
  Password: string;
  Permission: string;
};

type Token = {
  token: string;
  refreshToken: string;
  userId: string;
  permission: string;
};

const getIntial = (): UserPayload => {
  const defaultResponse: UserPayload = {
    role: '',
    userId: '',
    isSignedIn: false,
  };
  const useId = sessionStorage.getItem('userId');
  const permission = sessionStorage.getItem('permission');
  if (useId && permission) {
    try {
      const response: UserPayload = {
        role: permission,
        userId: useId,
        isSignedIn: true,
      };
      return response;
    } catch (ex) {
      return defaultResponse;
    }
  } else {
    return defaultResponse;
  }
};

const dataBind = (data: unknown): UserPayload => {
  const token: Token = JSON.parse(JSON.stringify(data));
  sessionStorage.setItem('token', token.token);
  sessionStorage.setItem('refreshToken', token.refreshToken);
  sessionStorage.setItem('userId', token.userId);
  sessionStorage.setItem('permission', token.permission);
  const payload: UserPayload = {
    role: token.permission,
    userId: token.userId,
    isSignedIn: true,
  };
  return payload;
};

const useAuthCheck = () => {
  const [data, setData] = useState<UserPayload>(getIntial());
  const Auth = async (values: AnyObject) => {
    const PostBody: User = {
      Name: values['Name'],
      Password: values['Password'],
      Permission: 'User',
    };
    try {
      const resp = await axiosInstance.post('Auth', PostBody);
      const temp = dataBind(await resp.data);
      updateData(temp);
    } catch (ex) {
      console.log(ex);
    }
  };

  const [template, setTemplate] = useState(<>Loading...</>);
  useEffect(() => {
    if (data.isSignedIn === true) {
      setTemplate(<LayoutComponent></LayoutComponent>);
    }
  }, [data]);

  const updateData = (newData: UserPayload) => {
    setData(newData);
  };
  useEffect(() => {
    if (data.isSignedIn === false) {
      setTemplate(<Login Auth={Auth}></Login>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return { template, data, updateData };
};

export default useAuthCheck;

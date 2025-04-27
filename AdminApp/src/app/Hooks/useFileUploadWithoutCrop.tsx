import { UploadFile, UploadProps } from 'antd';
import { AnyObject } from 'antd/es/table/Table';
import { useState } from 'react';
import envConfig from '../config';
import GetGUID from '../services/GUIDService';

const useFileUploadNoCrop = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const beforeUpload = (file: AnyObject): boolean => {
    const fileExtension = '.' + file.name.split('.').pop();
    const baseImageURL = envConfig.imageUrl;
    const imageId = GetGUID();
    const image: UploadFile = {
      uid: imageId,
      name: imageId + fileExtension,
      status: 'done',
      url: baseImageURL + imageId + fileExtension,
    };
    setFileList([...fileList, image]);
    return true;
  };
  const onPreview = async (fileList: AnyObject) => {
    const src = envConfig.imageUrl + fileList.name;
    if (src) {
      window.open(src, '_blank');
    }
  };
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const datalist: UploadFile[] = [];
    newFileList.forEach((file) => {
      if (!file.response) {
        datalist.push(file);
      }
    });
    setFileList(datalist);
  };

  return { fileList, setFileList, beforeUpload, onPreview, onChange };
};

export default useFileUploadNoCrop;

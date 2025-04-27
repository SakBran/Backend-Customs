import React, { useState } from 'react';
import { Modal, Spin, Tooltip } from 'antd';
import axios from 'axios';
import axiosInstance from 'src/app/services/AxiosInstance';
import { InfoCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import attachment from 'src/Models/Attachment';

export interface GetHistoryRequestDTO {
  fieldName: string;
  id: number;
}

type Props = {
  fieldName: string;
  id: number;
};

const DynamicTooltip = ({ fieldName, id }: Props) => {
  const [tooltipTitle, setTooltipTitle] = useState('Hover to load');
  const [loading, setLoading] = useState(false);

  const fetchTooltipData = async () => {
    setLoading(true);
    const PostBody: GetHistoryRequestDTO = {
      fieldName: fieldName,
      id: id,
    };
    try {
      const response = await axiosInstance.post(
        'HistoryForAmend/GetHistroy',
        PostBody
      ); // Replace with your API endpoint
      if (fieldName === 'nrc') {
        console.log(response.data);
        setTooltipTitle(response?.data?.toString());

        Modal.info({
          title: 'Previous NRC No',
          content: response.data.toString(),
        });
      }
      setTooltipTitle(response.data[fieldName]); // Adjust according to your API response
      if (
        fieldName === 'businessCategory' ||
        fieldName === 'paymentMethod' ||
        fieldName === 'deliveryMethod'
      ) {
        if (response.data[fieldName]) {
          const temp = JSON.parse(response.data[fieldName]);

          setTooltipTitle(temp.toString());
        }
      }

      if (
        fieldName === 'isProductOwner' ||
        fieldName === 'isWebsite' ||
        fieldName === 'isSocialMedia' ||
        fieldName === 'isMobileApplication'
      ) {
        if (response.data[fieldName]) {
          if (response.data[fieldName] === true) {
            setTooltipTitle('Yes');
          } else {
            setTooltipTitle('No');
          }
        } else {
          setTooltipTitle('No');
        }
      }

      if (
        fieldName === 'websiteUrls' ||
        fieldName === 'socialMediaUrls' ||
        fieldName === 'mobileApplicationUrl'
      ) {
        if (response.data[fieldName]) {
          const obj: attachment[] = JSON.parse(response.data[fieldName]);

          const stringList: string[] = [];
          obj?.forEach((x: attachment) => {
            console.log("logresult",x.attachment);
            stringList.push(x.attachment);
          });
          //setTooltipTitle(stringList.toString());
          setTooltipTitle(stringList.join('<br>'));

        }
      }
    } catch (error) {
      setTooltipTitle('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = () => {
    if (fieldName === 'nrc') {
      if (!loading) {
        fetchTooltipData();
      }
    } else {
      if (!loading && tooltipTitle === 'Hover to load') {
        fetchTooltipData();
      }
    }
  };

  return (
    <Spin tip="Loading" size="small" spinning={loading}>
      {/*<Tooltip title={loading ? 'Loading...' : tooltipTitle}>*/}
      <Tooltip title={loading ? 'Loading...' : <div
            dangerouslySetInnerHTML={{ __html: tooltipTitle }}
            style={{ whiteSpace: 'pre-wrap' }} // This ensures new lines are preserved
          />}>
        <InfoCircleOutlined
          style={{ color: 'blue' }}
          onMouseEnter={handleMouseEnter}
          onClick={handleMouseEnter}
        />
      </Tooltip>
    </Spin>
  );
};

export default DynamicTooltip;

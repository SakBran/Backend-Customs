import { Dropdown, MenuProps, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import envConfig from 'src/app/config';
type Props = {
  id: string;
};

const CheckAction = ({ id }: Props) => {
  const location = useLocation();
  const temp = [...location.pathname.split('/')];
  const link = '/' + temp[temp.length - 2];
  const [isApplyList, setisApplyList] = useState<boolean>(false);
  const [ApplyType, setApplyType] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isTakeDisabled, setIsTakeDisabled] = useState<boolean>(false); // New state

  useEffect(() => {
    const checkIsApplyList = async () => {
      try {
        console.log("CertificateNo", id);
        if (id != null) {
          const token = sessionStorage.getItem('token'); // Retrieve stored token
          if (!token) {
            console.error("No token found");
            return;
          }
  
          const response = await axios.get<boolean>(
            `${envConfig.baseUrl}BusinessRegistration/CheckIsApplyList?id=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Attach token here
              },
            }
          );
  
          console.log("API response for Applylist", response.data);
          setisApplyList(response.data === true);
        }
      } catch (error) {
        console.error("Error checking apply list:", error);
        setisApplyList(false); // Set to false if there's an error
      }
    };
  
    checkIsApplyList();
  }, []);

  useEffect(() => {
    const GetApplyType = async () => {
      //const url = `BusinessRegistration/CheckIsSuspense?certificateNo=${certificateNo}`;
      try {
        console.log('CertificateNo', id);
        if (id != null) {
          const response = await axios.get<string>(
            `${envConfig.baseUrl}BusinessRegistration/GetApplyType?id=` + id
          );
          //console.log('API URL', url);
          console.log('API response for Applylist', response.data);
          setApplyType(response.data);
          console.log('ApplyType', ApplyType);
        }
      } catch (error) {
        console.error('Error checking suspension status:', error);
        setApplyType(''); // Set to false if there's an error
      }
    };

    GetApplyType();
  }, []);
  useEffect(() => {
    const checkTakeCheckUserId = async () => {
      try {
        const token = sessionStorage.getItem('token');

        if (id != null) {
          const response = await axios.get<boolean>(
            `${envConfig.baseUrl}BusinessRegistration/CheckActionStatus?recordId=` +
              id,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          }
          );
          console.log('CheckActionStatus:', response.data);
          setIsTakeDisabled(response.data === true);
        }
      } catch (error) {
        console.error('Error fetching TakeCheckUserId:', error);
        setIsTakeDisabled(false); // Fallback to enabling the button
      }
    };

    checkTakeCheckUserId();
  }, [id]);
  const navigate = useNavigate();

  const handleTakeAction = async () => {
    
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(
        `${envConfig.baseUrl}BusinessRegistration/TakeAction?recordId=` + id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        message.success('Take Action successfully completed!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        message.error('Failed to save action');
        setIsDisabled(false);
      }
    } catch (error) {
      console.error('Error saving action:', error);
      setIsDisabled(false);
    }
    // navigate('/your-original-page');
  };

  const items: MenuProps['items'] = isApplyList
    ? [
        {
          key: '1',
          label: <Link to={link + '/Detail/' + id}>Check</Link>,
        },
        {
          key: '2',
          label: (
            <span
              onClick={!isTakeDisabled ? handleTakeAction : undefined}
              style={{
                cursor: isTakeDisabled ? 'not-allowed' : 'pointer',
                color: isTakeDisabled ? 'grey' : 'black',
                opacity: isTakeDisabled ? 0.6 : 1,
              }}
            >
              Take
            </span>
          ),
        },
      ]
    : [
        {
          key: '1',
          label: <Link to={link + '/Detail/' + id}>Check</Link>,
        },
      ];

  return (
    <td>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        arrow
        trigger={['click']}
      >
        <span style={{ cursor: 'pointer' }}>Action</span>
      </Dropdown>
    </td>
  );
};

export default CheckAction;

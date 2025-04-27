import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetButtonStatus } from './APIAction';
type Props = {
  Approve?: () => void; // make it optional
  Turndown?: () => void;
  showApprove? : boolean;
  showTurndown?: boolean;
};
const ApproveButton = ({ Approve, Turndown , showApprove = true , showTurndown = true }: Props) => {
  const { id: paramID } = useParams();
  let id = '';
  if (paramID) {
    id = paramID;
  }
  const [show, setShow] = useState(false);
  useEffect(() => {
    const callAPI = async () => {
      const result = await GetButtonStatus(id);
      if (result === 'True') {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    callAPI();
  }, [id]);

  if (show) {
    return (
      <>
      {showTurndown && Turndown && (
        <>
          <Button type="primary" danger onClick={Turndown}>
            {id === '' ? 'Submit' : 'Turndown'}
          </Button>
          {'   '}
        </>
      )}
      {showApprove && Approve && (
        
          <Button type="primary" onClick={Approve}>
            {id === '' ? 'Submit' : 'Approve'}
          </Button>
        
      )}
      </>
    );
  } else {
    return '';
  }
};
export default ApproveButton;

import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import MakeExtension from './APIAction';

const ExtensionBtn: React.FC = () => {
  const { id: paramID } = useParams();
  const navigate = useNavigate();

  let id = '';
  if (paramID) {
    id = paramID;
  }
  const Extend = () => {
    const api = async () => {
      const result = await MakeExtension(id);
      if (result) {
        navigate('/Registration/' + result);
      }
    };
    api();
  };
  return (
    <>
      &nbsp;
      {/* <Button type="primary" onClick={Extend}>
        Extension
      </Button> */}
    </>
  );
};

export default ExtensionBtn;

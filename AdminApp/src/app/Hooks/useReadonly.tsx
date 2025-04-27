import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { GetStatus } from '../pages/SetupPages/RegistrationForm/GetStatusAPIService';

const useReadOnly = () => {
  const { id: paramID } = useParams();
  const [readOnly, setReadOnly] = useState(false);

  const fetchStatus = async () => {
    try {
      if (paramID) {
        const result = await GetStatus(paramID);
        console.log(result);
        setReadOnly(result === 'Pending');
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  useEffect(() => {
    if (paramID) {
      fetchStatus();
    }
  }, [paramID]);

  // Memoize the readOnly value to prevent re-evaluation on every render
  const memoizedReadOnly = useMemo(() => readOnly, [readOnly]);

  return { readOnly: memoizedReadOnly };
};

export default useReadOnly;

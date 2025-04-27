import { FormInstance } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { GetSingle } from '../services/BasicHttpServices';

const useFormLoad = (id: string, action: string, url: string) => {
  const [loading, setLoading] = useState(true);
  const formRef = React.useRef<FormInstance>(null);
  const onLoad = useCallback(() => {
    if (action !== 'New') {
      if (id) {
        const asycMethod = async () => {
          const resp = await GetSingle(url + '/' + id);
          formRef.current?.setFieldsValue(resp);
          setLoading(false);
        };
        asycMethod();
      }
    } else {
      setLoading(false);
    }
  }, [action, id, url]);
  useEffect(() => onLoad(), [onLoad]);
  return { formRef, loading, setLoading };
};
export default useFormLoad;

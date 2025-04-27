import { useCallback, useState } from 'react';
import { Post, Put, Delete, ToggleUserActive } from '../services/BasicHttpServices';
import { Modal } from 'antd';

const useFormActions = (id: string, action: string, APIURL: string) => {
  const [writeLoading, setWriteLoading] = useState(false);
  const success = () => {
    Modal.success({
      title: 'Success',
      content: 'Operation is successfully compleed...',
    });
  };

  const error = () => {
    Modal.error({
      title: 'Error',
      content: 'Something went wrong...',
    });
  };

  const onFinish = useCallback(
    (values: unknown) => {
      setWriteLoading(true);
      if (action === 'New') {
        const action = async () => {
          try {
            await Post(APIURL, values);
            setWriteLoading(false);
            success();
          } catch (ex) {
            setWriteLoading(false);
            error();
          }
        };
        action();
      } else if (action === 'Edit') {
        const action = async () => {
          try {
            await Put(APIURL, id, values);
            setWriteLoading(false);
            success();
          } catch (ex) {
            setWriteLoading(false);
            error();
          }
        };
        action();
      } else if (action === 'Delete') {
        const action = async () => {
          try {
            await Delete(APIURL, id);
            setWriteLoading(false);
            success();
            window.history.back();
          } catch (ex) {
            setWriteLoading(false);
            error();
          }
        };
        action();
      } else if (action === "ToggleActive") {
        const action = async () => {
          try {
            await ToggleUserActive(APIURL, id);
            setWriteLoading(false);
            success();
            window.history.back();
          } catch (ex) {
            setWriteLoading(false);
            error();
          }
        };
        action();
      } else if (action === 'Detail') {
        setWriteLoading(false);
      }
    },
    [APIURL, action, id]
  );
  return { onFinish, writeLoading };
};
export default useFormActions;

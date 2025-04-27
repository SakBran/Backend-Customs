import { AnyObject } from 'src/Models/AnyObject';
import axiosInstance from 'src/app/services/AxiosInstance';

export const Step4Submit = async (id: string): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.put(
      'BusinessRegistration/Step4Submit?id=' + id
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

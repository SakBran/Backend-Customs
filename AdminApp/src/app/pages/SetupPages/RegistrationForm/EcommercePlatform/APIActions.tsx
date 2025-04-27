import { AnyObject } from 'src/Models/AnyObject';
import Step3Dto from 'src/Models/Step3DTO';
import axiosInstance from 'src/app/services/AxiosInstance';

export const Step3Put = async (
  id: string,
  data: Step3Dto
): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.put(
      'BusinessRegistration/Step3Edit?id=' + id,
      data
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const Step3Get = async (id: string): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.get(
      'BusinessRegistration/Step3Get?id=' + id
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

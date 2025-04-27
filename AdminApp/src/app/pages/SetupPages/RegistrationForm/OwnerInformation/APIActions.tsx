import { AnyObject } from 'src/Models/AnyObject';
import Step2Dto from 'src/Models/Step2DTO';
import axiosInstance from 'src/app/services/AxiosInstance';

export const Step2Put = async (
  id: string,
  data: Step2Dto
): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.put(
      'BusinessRegistration/Step2Edit?id=' + id,
      data
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const Step2Get = async (id: string): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.get(
      'BusinessRegistration/Step2Get?id=' + id
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

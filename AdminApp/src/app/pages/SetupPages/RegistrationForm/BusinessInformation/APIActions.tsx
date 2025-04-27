import { AnyObject } from 'src/Models/AnyObject';
import Step1Dto from 'src/Models/Step1DTO';
import axiosInstance from 'src/app/services/AxiosInstance';
import { BusinessCategoryOptionDTO, OptionDTO } from 'src/Models/OptionDTO';
import AttachmentSetup from 'src/Models/AttachmentSetup';

export const Step1Post = async (data: Step1Dto): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.post(
      'BusinessRegistration/Step1Save',
      data
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const Step1Put = async (
  id: string,
  data: Step1Dto
): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.put(
      'BusinessRegistration/Step1Edit?id=' + id,
      data
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const Step1Get = async (id: string): Promise<AnyObject> => {
  try {
    const response = await axiosInstance.get(
      'BusinessRegistration/Step1Get?id=' + id
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const GetOnlineBusinessType = async (): Promise<OptionDTO[]> => {
  try {
    const response = await axiosInstance.get('Options/GetOnlineBusinessType');
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const GetOnlineBusinessCategory = async (): Promise<
  BusinessCategoryOptionDTO[]
> => {
  try {
    const response = await axiosInstance.get(
      'Options/GetOnlineBusinessCategory'
    );
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const GetEcommerceType = async (): Promise<OptionDTO[]> => {
  try {
    const response = await axiosInstance.get('Options/GetEcommerceType');
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const GetPaymentMethod = async (): Promise<OptionDTO[]> => {
  try {
    const response = await axiosInstance.get('Options/GetPaymentMethod');
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};
export const GetDeliveryMethod = async (): Promise<OptionDTO[]> => {
  try {
    const response = await axiosInstance.get('Options/GetDeliveryMethod');
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

export const GetAttachmentSetup = async (): Promise<AttachmentSetup[]> => {
  try {
    const response = await axiosInstance.get('Options/GetAttachmentSetup');
    const result = await response.data;
    return result;
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

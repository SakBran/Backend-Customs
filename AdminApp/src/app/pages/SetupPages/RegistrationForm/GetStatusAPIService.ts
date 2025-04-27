import axiosInstance from "src/app/services/AxiosInstance";

export const GetStatus = async (id: string): Promise<string> => {
    try {
        const response = await axiosInstance.get(
            'BusinessRegistration/GetStatus?id=' + id
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
};


export const GetApplyType = async (id: string): Promise<string> => {
    try {
        const response = await axiosInstance.get(
            'BusinessRegistration/GetApplyType?id=' + id
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
};

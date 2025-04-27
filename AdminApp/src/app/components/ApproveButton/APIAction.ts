import axiosInstance from "src/app/services/AxiosInstance";

export const GetButtonStatus = async (id: string): Promise<string> => {
    try {
        const response = await axiosInstance.get(
            'BusinessRegistration/GetButtonStatus?id=' + id
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
};
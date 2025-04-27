import axiosInstance from "src/app/services/AxiosInstance";

export const GetMessageWithAll = async (id: string): Promise<string> => {
    try {
        if (id) {
            const response = await axiosInstance.get(
                'BusinessRegistration/GetMessageWithAll?id=' + id
                
            );
            const result = await response.data;
            return result;
        } else {
            return "";
        }

    } catch (ex) {
        console.error(ex);
        throw ex;
    }
};
import axiosInstance from "src/app/services/AxiosInstance";

export const GetCheckedMessage = async (id: string): Promise<string> => {
    try {
        if (id) {
            const response = await axiosInstance.get(
                'BusinessRegistration/GetCheckedMessage?id=' + id
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

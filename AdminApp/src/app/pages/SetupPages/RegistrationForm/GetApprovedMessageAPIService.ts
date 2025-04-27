import axiosInstance from "src/app/services/AxiosInstance";

export const GetApprovedMessage = async (id: string): Promise<string> => {
    try {
        if (id) {
            const response = await axiosInstance.get(
                'BusinessRegistration/GetApprovedMessage?id=' + id
            );
            const result = await response.data;
            return result;
        } else {
            return "";
        }

    } catch (ex) {
        console.error(ex);
        return "";
    }
};


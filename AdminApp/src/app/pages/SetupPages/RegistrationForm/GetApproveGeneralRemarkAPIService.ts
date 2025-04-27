import axiosInstance from "src/app/services/AxiosInstance";

export const GetApproveGeneralRemark = async (id: string): Promise<string> => {
    try {
        if (id) {
            const response = await axiosInstance.get(
                'BusinessRegistration/GetApproveGeneralRemark?id=' + id
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


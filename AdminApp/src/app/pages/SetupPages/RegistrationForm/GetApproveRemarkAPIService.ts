import axiosInstance from "src/app/services/AxiosInstance";

export const GetApproveRemark = async (id: string): Promise<string> => {
    try {
        if (id) {
            const response = await axiosInstance.get(
                'BusinessRegistration/GetApproveRemark?id=' + id
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


import axiosInstance from "src/app/services/AxiosInstance";

export const GetValidDate = async (id: string): Promise<string> => {
    try {
        if (id) {
            const response = await axiosInstance.get(
                'BusinessRegistration/GetValidDate?id=' + id
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

export const GetFromValidDate = async (id: string): Promise<string> => {
    try {
        if (id) {
            const response = await axiosInstance.get(
                'BusinessRegistration/GetFromValidDate?id=' + id
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



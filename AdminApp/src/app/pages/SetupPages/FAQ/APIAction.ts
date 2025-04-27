import axiosInstance from "src/app/services/AxiosInstance";

const GetFAQ = async (id: string) => {
    try {
        const response = await axiosInstance.get(
            'FAQ/' + id
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export default GetFAQ;
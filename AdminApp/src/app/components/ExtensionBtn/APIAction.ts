import axiosInstance from "src/app/services/AxiosInstance";

const MakeExtension = async (id: string): Promise<string> => {
    try {
        const response = await axiosInstance.post(
            `BusinessRegistration/MakeExtension?id=${id}`
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }

}
export default MakeExtension;
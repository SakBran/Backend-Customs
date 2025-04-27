import Business from "src/Models/Business";
import axiosInstance from "src/app/services/AxiosInstance";

const GetCertificateIndividual = async (id: string): Promise<Business> => {
    try {
        const response = await axiosInstance.get(
            `Client/GetCertificate?id=${id}&type=individual`
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }

}
export default GetCertificateIndividual;
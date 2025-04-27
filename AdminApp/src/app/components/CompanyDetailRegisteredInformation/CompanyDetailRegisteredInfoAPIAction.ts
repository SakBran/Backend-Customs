import Business from "src/Models/Business";
import axiosInstance from "src/app/services/AxiosInstance";

const GetCertificateCompany = async (id: string): Promise<Business> => {
    try {
        const response = await axiosInstance.get(
            `Client/GetCertificate?id=${id}&type=company`
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }

}
export default GetCertificateCompany;
import axiosInstance from "src/app/services/AxiosInstance";
import BusinessListByCategoryReportDTO from "./BusinessListByCategoryReportDTO";

export const GetBusinessListByCategoryReportData = async (startDate?: Date, endDate?: Date): Promise<BusinessListByCategoryReportDTO[]> => {
    try {
        let url = 'Report/BusinessListByCategoryReport';
        if (startDate && endDate) {
            url = url + '?startDate=' + startDate + '&endDate=' + endDate ;
        }
        const response = await axiosInstance.post(
            url
        );
        return await response.data;

    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}
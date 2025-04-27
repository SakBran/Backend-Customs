import axiosInstance from "src/app/services/AxiosInstance";
import CategoryReportDTO from "./CategoryReportDTO";

export const GetCategoryReportData = async (startDate?: Date, endDate?: Date, applyType?: string): Promise<CategoryReportDTO[]> => {
    try {
        let url = 'Report/CategoryReport';
        if (startDate && endDate) {
            url = url + '?startDate=' + startDate + '&endDate=' + endDate + '&applyType=' + applyType;
            // url += `?startDate=${encodeURIComponent(startDate.toISOString())}&endDate=${encodeURIComponent(endDate.toISOString())}`;

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
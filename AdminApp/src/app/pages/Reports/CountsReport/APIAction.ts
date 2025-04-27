import axiosInstance from "src/app/services/AxiosInstance";
import CountsReportDTO from "./CountsReportDTO";

export const GetCountReportData = async (startDate?: Date, endDate?: Date, applyType?: string): Promise<CountsReportDTO[]> => {
    try {
        let url = 'Report/CountsReport';
        if (startDate && endDate) {
            url = url + '?startDate=' + startDate + '&endDate=' + endDate + '&applyType=' + applyType;
        }
        if (applyType && !startDate && !endDate) {
            url = url + '?applyType=' + applyType;
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
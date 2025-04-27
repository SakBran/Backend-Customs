import axiosInstance from "src/app/services/AxiosInstance";
import YearlyReportDTO from "./YearlyReportDTO";


export const GetYearlyReportDTO = async (year?: string, applyType?: string): Promise<YearlyReportDTO[]> => {
    try {
        let url = 'Report/ApplyIssuedReport';
        if (year) {
            url = url + '?year=' + year + '&applyType=' + applyType;
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
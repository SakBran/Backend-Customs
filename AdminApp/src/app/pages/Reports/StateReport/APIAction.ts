import axiosInstance from "src/app/services/AxiosInstance";
import StateReportDTO from "./StateReportDTO";

export const GetStateReportData = async (startDate?: Date, endDate?: Date, applyType?: string): Promise<StateReportDTO[]> => {
    try {
        let url = 'Report/StateReport';
        if (startDate && endDate) {
            url = url + '?startDate=' + startDate + '&endDate=' + endDate + '&applyType=' + applyType +'&stateRegion='+"All";
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
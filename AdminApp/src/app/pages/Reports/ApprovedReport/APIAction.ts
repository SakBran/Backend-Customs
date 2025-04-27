import axiosInstance from "src/app/services/AxiosInstance";
import ApprovedReportDTO from "./ApprovedReportDTO";

export const GetApprovedReportData = async (startDate?: Date,
    endDate?: Date, applyType?: string, businessType?: string, status?: string, state?: string, city?: string, township?: string)
    : Promise<ApprovedReportDTO[]> => {
    try {
        let url = 'Report/ApprovedReport';
        /*if (startDate && endDate) {
            url = url + '?startDate=' + startDate + '&endDate=' + endDate + '&applyType=' + applyType + '&businessType=' + businessType + '&status=' + status + '&state=' + state;
        }
        if (applyType && !startDate && !endDate) {
            url = url + '?applyType=' + applyType;
        }
        if (businessType && !applyType && !startDate && !endDate) {
            url = url + '?businessType=' + businessType;
        }
        if (status && !businessType && !applyType && !startDate && !endDate) {
            url = url + '?status=' + status;
        }
        if (state && !status && !businessType && !applyType && !startDate && !endDate) {
            url = url + '?state=' + state;
        }*/

        const queryParams = [];

        if (startDate && endDate) {
            queryParams.push("startDate=" + startDate + "&endDate=" + endDate);
        }

        if (applyType) {
            queryParams.push("applyType=" + applyType);
        }

        if (businessType) {
            queryParams.push("businessType=" + businessType);
        }

        if (status) {
            queryParams.push("status=" + status);
        }

        if (state) {
            queryParams.push("state=" + state);
        }
        if (city) {
            queryParams.push("city=" + city);
        }
        if (township) {
            queryParams.push("township=" + township);
        }

        // Combine query parameters into a single string
        const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';

        url += queryString;
        console.log("url data", url);
        const response = await axiosInstance.post(
            url
        );
        return await response.data;

    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}
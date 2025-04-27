import axiosInstance from "src/app/services/AxiosInstance";
import DetailRegisteredBusinessReportDTO from "./DetailRegisteredBusinessReportDTO";

export const GetDetailRegisteredBusinessReportData = async (startDate?: Date,
    endDate?: Date, state?: string, city?: string, township?: string, certificateNo?: string, businessType?: string, ecommerceType?: string, applyType?: string)
    : Promise<DetailRegisteredBusinessReportDTO[]> => {
    try {
        let url = 'Report/DetailRegisteredBusinessReport';

        const queryParams = [];

        if (startDate && endDate) {
            queryParams.push("startDate=" + startDate + "&endDate=" + endDate);
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
        if (certificateNo) {
            queryParams.push("certificateNo=" + certificateNo);
        }
        if (businessType) {
            queryParams.push("businessType=" + businessType);
        }
        if (ecommerceType) {
            queryParams.push("ecommerceType=" + ecommerceType);
        }
        if (applyType) {
            queryParams.push("applyType=" + applyType);
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
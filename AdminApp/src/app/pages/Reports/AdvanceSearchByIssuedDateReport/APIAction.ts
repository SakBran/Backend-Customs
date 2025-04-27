import axiosInstance from "src/app/services/AxiosInstance";
import AdvanceSearchReportDTO from "./AdvanceSearchReportDTO";

export const GetAdvanceSearchByIssuedDateReportData = async (startDate?: Date,
    endDate?: Date, applyType?: string, businessType?: string, CompanyOrIndividual?: string, state?: string, city?: string, township?: string)
    : Promise<AdvanceSearchReportDTO[]> => {
    try {
        let url = 'Report/AdvanceSearchByIssuedDateReport';

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

        if (CompanyOrIndividual) {
            queryParams.push("CompanyOrIndividual=" + CompanyOrIndividual);
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
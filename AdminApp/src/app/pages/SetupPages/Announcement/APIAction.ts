import axiosInstance from "src/app/services/AxiosInstance";

const GetAnnouncemt = async (id: string) => {
    try {
        const response = await axiosInstance.get(
            'Announcement/' + id
        );
        const result = await response.data;
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export default GetAnnouncemt;
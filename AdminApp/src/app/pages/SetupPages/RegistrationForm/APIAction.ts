import { Modal } from "antd";
import { DocaSendDTO, RejectDTO } from "src/Models/RejectDTO";
import axiosInstance from "src/app/services/AxiosInstance";

export const ApproveAPI = async (id: string, data: RejectDTO) => {
    try {
        const response = await axiosInstance.put(
            'BusinessRegistration/Approve?id=' + id, data
        );
        await response.data;
        Modal.success({
            title: 'Success',
            content: 'Your application has been approved',
        });
    } catch (ex) {
        console.error(ex);
        throw ex;
    }

    
}

export const RejectAPI = async (id: string, data: RejectDTO) => {
    try {
        const response = await axiosInstance.put(
            'BusinessRegistration/Reject?id=' + id, data
        );
        await response.data;
        Modal.success({
            title: 'Success',
            content: 'Your application has been rejected',
        });
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export const SendToDOCCAAPI = async (id: string, data: DocaSendDTO) => {
    try {
        const response = await axiosInstance.put(
            'DOCCA/SendToDOCCA?id=' + id, data 
        );
        await response.data;
        Modal.success({
            title: 'Success',
            content: 'Application has been sent to DOCCA',
        });
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}
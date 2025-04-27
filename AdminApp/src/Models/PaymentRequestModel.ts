export interface PaymentRequestModel {
    
    applicationNo: string;
    createdDate: Date;
    checkedDate: Date;
    approvedDate: Date;
    paymentBlockDate: Date;
    businessName: string;
    businessNameMyanmar: string;
    companyRegNo: string;
    SMERegNo: string;
    EIRRegNo: string;
    
}


export interface ReportDTOForPaymentRequest extends PaymentRequestModel {
    
    fromDate?: string;
    toDate?: string;
    
}


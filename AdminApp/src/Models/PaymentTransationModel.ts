export interface PaymentTransactionModel {
    id: string;
    transactionId: string;
    eCommerceNo: string;
    companyRegistrationNo: string;
    companyName: string;
    applyType: string;
    applicationNo: string;
    invoiceNo: string;
    voucherNo: string;
    mocAmount: number;
    imAmount: number;
    transactionAmount: number;
    mpuStringAmount: string;
    merchantId: string;
    cardNo: string;
    responseCode: string;
    accountNo: string;
    transactionRefNo: string;
    approvalCode: string;
    transactionDateTime: Date | null;
    mpuTransactionDateTime: string;
    status: string;
    failReason: string;
    hashValue: string;
    memberId: string;
    paymentType: string;
}


export interface ReportDTOForMPUPayment extends PaymentTransactionModel {
    mpuAmount: number;
    fromDate?: string;
    toDate?: string;
    isOnlineFee : string;
}


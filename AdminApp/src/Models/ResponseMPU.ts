interface ResponseMPU {
    merchOrderId: string;
    tranId: string;
    amount: string;
    currenyCode: string;
    statusCode: string;
    paymentCardNumber: string | null;
    paymentMobileNumber: string | null;
    userRef1: string | null;
    userRef2: string | null;
    userRef3: string | null;
    userRef4: string | null;
    userRef5: string | null;
    description: string | null;
    dateTime: string;
}
export default ResponseMPU;

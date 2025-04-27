import { AnyObject } from "src/Models/AnyObject";

interface Step1DtoAmend {
    businessName: string;
    companyRegNumber: string;
    smeRegNumber: string;
    eirRegNumber: string;
    onlineBusinessType: string;
    onlineBusinessCategory: string;
    ecommerceModel: string;
    businessAddress: string;
    stateRegion: string;
    city: string;
    township: string;
    postalCode: string;
    contactPerson: string;
    contactEmail: string;
    contactPhoneNumber: string;
    numberOfEmployee: number;
    paymentMethod: string;
    deliveryMethod: string;
    businessInformationAttachment: string;
    companyOrIndividualType: string;
    productDetail: string;
    isProductOwner: string;
    addressFile: string;
    eirRegFile: string;
    websiteLogo: string;
    applyType: string;
    isName: boolean;

    isCrnoAttachment: boolean;
    isEIRRegFile: boolean;
    isSmeAttachment: boolean;
    isOnlineBusinessTypeAndCategory: boolean;
    isProductOwnerAmend: boolean;
    isBusinessAddressAndAttachment: boolean;
    isContactAttachment: boolean;
    isEmployeePaymentDelivery: boolean;
}

export default Step1DtoAmend;
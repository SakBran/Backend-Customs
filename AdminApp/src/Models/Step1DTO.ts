import { AnyObject } from "./AnyObject";

class Step1Dto {
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

    constructor(data: AnyObject) {
        this.businessName = data.businessName;
        this.companyRegNumber = data.companyRegNumber;
        this.smeRegNumber = data.smeRegNumber;
        this.eirRegNumber = data.eirRegNumber;
        this.onlineBusinessType = data.onlineBusinessType;
        this.onlineBusinessCategory = data.onlineBusinessCategory;
        this.ecommerceModel = data.ecommerceModel;
        this.businessAddress = data.businessAddress;
        this.stateRegion = data.stateRegion;
        this.city = data.city;
        this.township = data.township;
        this.postalCode = data.postalCode;
        this.contactPerson = data.contactPerson;
        this.contactEmail = data.contactEmail;
        this.contactPhoneNumber = data.contactPhoneNumber;
        this.numberOfEmployee = parseInt(data.numberOfEmployee);
        this.paymentMethod = data.paymentMethod;
        this.deliveryMethod = data.deliveryMethod;
        this.businessInformationAttachment = data.businessInformationAttachment;
        this.companyOrIndividualType = data.companyOrIndividualType;
        this.productDetail = data.productDetail;
        this.isProductOwner = data.isProductOwner;
        this.addressFile = data.addressFile;
        this.eirRegFile = data.eirRegFile;
        this.websiteLogo = data.websiteLogo;
    }
}

export default Step1Dto;
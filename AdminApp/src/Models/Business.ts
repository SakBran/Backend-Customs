interface Business {
    id: number;
    businessName: string;
    businessNameMyanmar: string;
    companyRegNo: string;
    smeRegNo: string;
    eirRegNo: string;
    businessType: string;
    businessCategory: string;
    eCommerceType: string;
    businessAddress: string;
    state: string;
    city: string;
    township: string;
    postalCode: string;
    contactPersonName: string;
    contactPersonEmail: string;
    contactPersonPhone: string;
    employeeNumber: number;
    paymentMethod: string;
    deliveryMethod: string;
    isProductOwner: string;
    productDetail: string;
    businessInformationAttachment: string;

    businessOwnerName: string;
    businessOwnerNameMyanmar: string;
    businessOwnerAddress: string;
    permanentAddress: string;
    passportSizePhoto: string;
    businessOwnerPassportNumber: string;
    passportUrl: string;
    businessOwnerNrc: string;
    nrcFrontUrl: string;
    nrcBackUrl: string;
    businessOwnerEmail: string;
    businessOwnerPhoneNo: string;
    businessOwnerAttachment: string;
    businessOwnerCitizenType: string;
    platformType: string;

    isWebsite: boolean;
    isSocialMedia: boolean;
    isMobileApplication: boolean;
    websiteUrls: string;
    websiteLogo: string;
    socialMediaUrls: string;
    mobileApplicationUrl: string;

    createdDate: Date;
    updatedDate: Date;

    createdBy: string;
    updatedBy: string;
    status: string;
    memberId: string;
    companyOrIndividualType: string;
    // businessNo: string;
    certificateNo: string;
    validDate: string;
    issuedDate: string;

    nrcCode: string;
    nrcPrefix: string;
    nrcType: string;
    nrcNo: string;

    influencer: string;
}
export default Business;
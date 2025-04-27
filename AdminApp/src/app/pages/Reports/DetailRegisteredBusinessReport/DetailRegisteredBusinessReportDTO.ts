interface DetailRegisteredBusinessReportDTO {


    businessName: string;

    companyRegNo: string;

    eirRegNo: string;
    smeRegNo: string;

    businessType: string;

    businessCategory: string;

    ecommerceType: string;
    //businessAddress { get; set; }

    contactPersonName: string;

    contactPersonEmail: string;

    contactPersonPhone: string;

    employeeNumber: string;

    paymentMethod: string;

    deliveryMethod: string;

    //businessOwnerName: string;

    passportNo: string;

    businessOwnerName: string;
    nrcPrefix: string;
    nrcCode: string;
    nrcNo: string;
    websiteUrls: string;
    socialMediaUrls: string;
    mobileApplicationUrls: string;
    certificateNo: string;
    businessAddress: string;
    township: string;
    city: string;
    businessAddressState: string;
    //public string BusinessOwnerAddress { get; set; }
    businessOwnerAddress: string;
    permanantAddress: string;

    issuedDate: string;
    applyType: string;

    //city
    //township

}
export default DetailRegisteredBusinessReportDTO;
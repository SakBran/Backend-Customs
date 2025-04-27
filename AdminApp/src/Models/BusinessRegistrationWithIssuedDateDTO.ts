interface BusinessRegistrationWithIssuedDateDTO {

      // Id: number;
      // businessRegistrationId: number;
      applicationNo: string;
      businessName: string;
      businessOwnerName: string;
      nrcNo: string;
      businessOwnerAddress: string;
      state: string;
      websiteUrls: string;
      socialMediaUrls: string;
      mobileApplicationUrl: string;
      certificateNo: string;
      createdDate: Date;
      businessAddress: string;
      issuedDate: Date;

      fromDate?: string;
      toDate?: string;

}
export default BusinessRegistrationWithIssuedDateDTO;
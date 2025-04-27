
interface BusinessWithMemberDTO {

      Id: number;
      businessRegistrationId: number;
      businessName: string;
      businessNameMyanmar: string;
      businessAddressState: string;

      companyRegNo: string;
      eirRegNo: string;
      smeRegNo: string;
      businessType: string;
      businessCategory: string;
      businessAddress: string;
      businessOwnerName: string;
      businessOwnerNameMyanmar: string;
      businessOwnerAddress: string;
      PermanantAddress: string;
      BusinessOwnerPassportNumber: string;
      BusinessOwnerNrc: string;
      BusinessOwnerEmail: string;
      BusinessOwnerPhoneNo: string;
      status: string;
      companyOrIndividualType: string;
      certificateNo: string;
      ValidDate: Date;
      CreatedDate: Date;
      ApprovedDate: Date;
      IssuedDate: Date;
      memberName: string;
      fromDate?: string;
      toDate?: string;
      applicationNo: string;
      userRef1: string;
      applyType: string;
      sendToDocaBy: string;
      checkedBy: string;
      approvedBy: string;
}
export default BusinessWithMemberDTO;
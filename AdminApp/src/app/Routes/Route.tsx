import { Routes, Route } from 'react-router-dom';
import NxWelcome from '../nx-welcome';
import Protected from '../components/PrivateRoute/PrivateRoute';
import UserList from '../pages/User/UserList';
import UserPage from '../pages/User/UserPage';
import AccountTitlePage from '../pages/SetupPages/AccountTitleSetup/AccountTitlePage';
import AccountTitleList from '../pages/SetupPages/AccountTitleSetup/AccountTitleList';
import AccountTypeList from '../pages/SetupPages/AccountTypeSetup/AccountTypeList';
import AccountTypePage from '../pages/SetupPages/AccountTypeSetup/AccountTypePage';
import PlatFormTypeList from '../pages/SetupPages/PlatFormType/PlatFormTypeList';
import PlatFormTypePage from '../pages/SetupPages/PlatFormType/PlatFormTypePage';
import PaymentMethodList from '../pages/SetupPages/PaymentMethod/PaymentMethodList';
import PaymentMethodPage from '../pages/SetupPages/PaymentMethod/PaymentMethodPage';
import EcommerceTypeList from '../pages/SetupPages/EcommerceType/EcommerceTypeList';
import EcommerceTypePage from '../pages/SetupPages/EcommerceType/EcommerceTypePage';
import DeliveryMethodList from '../pages/SetupPages/DeliveryMethod/DeliveryMethodList';
import DeliveryMethodPage from '../pages/SetupPages/DeliveryMethod/DeliveryMethodPage';
import ChequeNoList from '../pages/SetupPages/ChequeNoSetup/ChequeNoList';
import ChequeNoPage from '../pages/SetupPages/ChequeNoSetup/ChequeNoPage';
import BusinessTypeList from '../pages/SetupPages/BusinessType/BusinessTypeList';
import BusinessTypePage from '../pages/SetupPages/BusinessType/BusinessTypePage';
import BusinessCategoryList from '../pages/SetupPages/BusinessCategory/BusinessCategoryList';
import BusinessCategoryPage from '../pages/SetupPages/BusinessCategory/BusinessCategoryPage';
import MemberList from '../pages/SetupPages/Member/MemberList';
import MemberPage from '../pages/SetupPages/Member/MemberPage';
import AnnouncementList from '../pages/SetupPages/Announcement/AnnouncementList';
import AnnouncementPage from '../pages/SetupPages/Announcement/AnnouncementPage';
import SystemSettingList from '../pages/SetupPages/SystemSetting/SystemSettingList';
import SystemSettingPage from '../pages/SetupPages/SystemSetting/SystemSettingPage';
import RegistrationPage from '../pages/SetupPages/RegistrationForm/Registration';
import RegistrationList from '../pages/SetupPages/RegistrationForm/RegistrationList';
import CheckedList from '../pages/SetupPages/RegistrationForm/CheckedList';
import PaymentBlockedList from '../pages/SetupPages/RegistrationForm/PaymentBlockedList';
import PaymentAutoCancelList from '../pages/SetupPages/RegistrationForm/PaymentAutoCancelList';
import TurndownBlockedList from '../pages/SetupPages/RegistrationForm/TurndownBlockedList';
import ApprovedList from '../pages/SetupPages/RegistrationForm/ApprovedList';
import RegistrationApproveList from '../pages/SetupPages/RegistrationForm/RegistrationApproveList';
import IndividaulComponent from '../components/IndividualComponent/IndividualComponent';
import DetailRegComponent from '../components/DetailRegistration/DetailRegComponent';
import CheckAmendList from '../pages/CheckAmend/CheckAmendList';
import AttachmentSetupList from '../pages/SetupPages/AttachmentSetup/AttachmentSetupList';
import AttachmentSetupPage from '../pages/SetupPages/AttachmentSetup/AttachmentSetupPage';
import CheckCancelList from '../pages/CheckCancel/CheckCancelList';
import CheckedCancelList from '../pages/CheckCancel/CheckedCancelList';
import CheckExtensionList from '../pages/CheckExtension/CheckExtensionList';
import CheckedExtensionList from '../pages/CheckExtension/CheckedExtensionList';
import CheckedAmendList from '../pages/CheckAmend/CheckedAmendList';
import CheckContactUsList from '../pages/SetupPages/ContactUs/CheckContactUsList';
import MPUReport from '../pages/Reports/MPUReport';
import AccountTransactionReort from '../pages/Reports/AccounTransactionReport';
import FAQList from '../pages/SetupPages/FAQ/FAQList';
import FAQPage from '../pages/SetupPages/FAQ/FAQPage';
import RegisteredBusinessList from '../pages/RegisteredBusiness/RegisteredBusinessList';
import TurndownList from '../pages/SetupPages/RegistrationForm/TurndownList';
import CompanyInfoReport from '../pages/Reports/CompanyInfoReport';
import ResubmitList from '../pages/SetupPages/RegistrationForm/ResubmitList';
import CheckResubmitList from '../pages/SetupPages/RegistrationForm/CheckResubmitList';
import CompanyDetailRegisteredInformation from '../components/CompanyDetailRegisteredInformation/CompanyDetailRegisteredInformation';
import IndividualDetailRegisteredInformation from '../components/IndividualDetailRegisteredInformation/IndividualDetailRegisteredInformation';
import CheckTurndownList from '../pages/SetupPages/RegistrationForm/CheckTurndownList';
import { StateReport } from '../pages/Reports/StateReport/StateReport';
import { ApplyIssuedReport } from '../pages/Reports/ApplyIssuedReport/ApplyIssuedReport';
import ApprovedExtensionList from '../pages/ApproveExtension/ApprovedExtensionList';
import { CountsReport } from '../pages/Reports/CountsReport/CountsReport';
import CheckTurndownExtensionList from '../pages/CheckExtension/CheckTurndownExtensionList';
import CheckResubmitExtensionList from '../pages/CheckExtension/CheckResubmitExtensionList';
import ApprovedAmendList from '../pages/ApproveAmend/ApprovedAmendList';
import TurndownAmendList from '../pages/ApproveAmend/TurndownAmendList';
import ResubmitAmendList from '../pages/ApproveAmend/ResubmitAmendList';
import CheckTurndownAmendList from '../pages/CheckAmend/CheckTurndownAmendList';
import CheckResubmitAmendList from '../pages/CheckAmend/CheckResubmitAmendList';
import TurndownExtensionList from '../pages/ApproveExtension/TurndownExtensionList';
import ResubmitExtensionList from '../pages/ApproveExtension/ResubmitExtensionList';
import RegisteredBusinessReport from '../pages/Reports/RegisteredBusinessReport';
import { AdvanceSearchReport } from '../pages/Reports/AdvanceSearchReport/AdvanceSearchReport';
import { ApprovedReport } from '../pages/Reports/ApprovedReport/ApprovedReport';
import { BusinessListByCategoryReport } from '../pages/Reports/BusinessListByCategoryReport/BusinessListByCategoryReport';
import { DetailRegisteredBusinessReport } from '../pages/Reports/DetailRegisteredBusinessReport/DetailRegisteredBusinessReport';
import AyaLogReport from '../pages/Reports/AyaLogReport/AyaLogReport';
import DCCAReport from '../pages/Reports/DCCAReport';
import { CategoryReport } from '../pages/Reports/BusinessByCategoryReport/CategoryReport';
import ApproveExpireReport from '../pages/Reports/ApproveExpireReport';
import TurndownExpireReport from '../pages/Reports/TurndownExpireReport';
import SuspendedReport from '../pages/Reports/SuspendedReport';
import SuspensionList from '../pages/SetupPages/RegistrationForm/SuspensionList';
import PaymentRequestReport from '../pages/Reports/PaymentRequestReport';
import RejectReport from '../pages/Reports/RejectReport';

import PaymentRequestList from '../pages/SetupPages/RegistrationForm/PaymentRequestList';
import PaymentAutoCancelReport from '../pages/Reports/PaymentAutoCancelReport';
import { AdvanceSearchByIssuedDateReport } from '../pages/Reports/AdvanceSearchByIssuedDateReport/AdvanceSearchByIssuedDateReport';
import DoccaApprovedList from '../pages/SetupPages/RegistrationForm/DoccaApprovedList';
import DoccaPendingList from '../pages/SetupPages/RegistrationForm/DoccaPendingList';
import DoccaRejectList from '../pages/SetupPages/RegistrationForm/DoccaRejectList';
import QuesttionList from '../pages/DOCAQuestion/QuestionList';
import QuestionPage from '../pages/DOCAQuestion/QuestionPage';
import { DOCCAReport } from '../pages/Reports/DocaSearchReport/DOCCAReport';

export const RouteComponent = () => {
  const User = 'User';

  return (
    <Routes>
      <Route path="/" element={<NxWelcome title={'Hey'} />} />
      <Route
        path={'/' + User + '/List'}
        element={
          <Protected>
            <UserList />
          </Protected>
        }
      />
      <Route path={'/' + User + '/New'} element={<UserPage />} />
      <Route path={'/' + User + '/Edit/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Delete/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/ToggleActive/:id'} element={<UserPage />} />
      <Route path={'/' + User + '/Detail/:id'} element={<UserPage />} />
      {/* For Member Route */}
      <Route path={'/Member/List'} element={<MemberList />} />
      <Route path={'/Member/New'} element={<MemberPage />} />
      <Route path={'/Member/Edit/:id'} element={<MemberPage />} />
      <Route path={'/Member/Delete/:id'} element={<MemberPage />} />
      <Route path={'/Member/Detail/:id'} element={<MemberPage />} />
      {/* For SystemSetting Route */}
      <Route path={'/SystemSetting/List'} element={<SystemSettingList />} />
      <Route path={'/SystemSetting/New'} element={<SystemSettingPage />} />
      <Route path={'/SystemSetting/Edit/:id'} element={<SystemSettingPage />} />
      <Route
        path={'/SystemSetting/Delete/:id'}
        element={<SystemSettingPage />}
      />
      <Route
        path={'/SystemSetting/Detail/:id'}
        element={<SystemSettingPage />}
      />
      {/* For Announcement Route */}
      <Route path={'/Announcement/List'} element={<AnnouncementList />} />
      <Route path={'/Announcement/New'} element={<AnnouncementPage />} />
      <Route path={'/Announcement/Edit/:id'} element={<AnnouncementPage />} />
      <Route path={'/Announcement/Delete/:id'} element={<AnnouncementPage />} />
      <Route path={'/Announcement/Detail/:id'} element={<AnnouncementPage />} />
      {/* For Announcement Route */}
      <Route path={'/FAQ/List'} element={<FAQList />} />
      <Route path={'/FAQ/New'} element={<FAQPage />} />
      <Route path={'/FAQ/Edit/:id'} element={<FAQPage />} />
      <Route path={'/FAQ/Delete/:id'} element={<FAQPage />} />
      <Route path={'/FAQ/Detail/:id'} element={<FAQPage />} />
      {/* For Account Title Route */}
      <Route path={'/AccountTitle/List'} element={<AccountTitleList />} />
      <Route path={'/AccountTitle/New'} element={<AccountTitlePage />} />
      <Route path={'/AccountTitle/Edit/:id'} element={<AccountTitlePage />} />
      <Route path={'/AccountTitle/Delete/:id'} element={<AccountTitlePage />} />
      <Route path={'/AccountTitle/Detail/:id'} element={<AccountTitlePage />} />
      {/* For BusinessRegistration */}
      {/* <Route path={'/Registration'} element={<RegistrationPage />} />*/}
      <Route path={'/Registration/:id'} element={<RegistrationPage />} />
      <Route
        path={'/RegistrationForm/RegistrationList'}
        element={<RegistrationList />}
      />
      <Route
        path={'/RegistrationForm/RegistrationApproveList'}
        element={<RegistrationApproveList />}
      />
      <Route
        path={'/RegistrationForm/RegistrationAmendList'}
        element={<CheckAmendList />}
      />
      <Route
        path={'/RegistrationForm/RegistrationAmendApproveList'}
        element={<CheckedAmendList />}
      />
      <Route
        path={'/RegistrationForm/CheckTurndownAmendList'}
        element={<CheckTurndownAmendList />}
      />
      <Route
        path={'/RegistrationForm/CheckResubmitAmendList'}
        element={<CheckResubmitAmendList />}
      />
      <Route
        path={'/RegistrationForm/RegistrationCancelList'}
        element={<CheckCancelList />}
      />
      <Route
        path={'/RegistrationForm/RegistrationCancelApproveList'}
        element={<CheckedCancelList />}
      />
      <Route
        path={'/RegistrationForm/RegistrationExtensionList'}
        element={<CheckExtensionList />}
      />
      <Route
        path={'/RegistrationForm/RegistrationExtensionApproveList'}
        element={<CheckedExtensionList />}
      />
      <Route
        path={'/RegistrationForm/CheckTurndownExtensionList'}
        element={<CheckTurndownExtensionList />}
      />
      <Route
        path={'/RegistrationForm/CheckResubmitExtensionList'}
        element={<CheckResubmitExtensionList />}
      />
      <Route
        path={'/RegistrationForm/ResubmitExtensionList'}
        element={<ResubmitExtensionList />}
      />
      <Route path={'/ContactUs/List'} element={<CheckContactUsList />} />
      {/* <Route
        path={'/RegistrationForm/RegistrationAmendApproveList'}
        element={<CheckedAmendList />}
      /> */}
      <Route
        path={'/RegistrationForm/ApprovedAmendList'}
        element={<ApprovedAmendList />}
      />
      <Route
        path={'/RegistrationForm/TurndownAmendList'}
        element={<TurndownAmendList />}
      />
      <Route
        path={'/RegistrationForm/ResubmitAmendList'}
        element={<ResubmitAmendList />}
      />
      <Route path={'/RegistrationForm/CheckedList'} element={<CheckedList />} />
      <Route
        path={'/RegistrationForm/DoccaPendingList'}
        element={<DoccaPendingList />}
      />
      <Route
        path={'/RegistrationForm/DoccaApprovedList'}
        element={<DoccaApprovedList />}
      />
      <Route
        path={'/RegistrationForm/DoccaRejectList'}
        element={<DoccaRejectList />}
      />
      <Route
        path={'/RegistrationForm/ApprovedList'}
        element={<ApprovedList />}
      />
      <Route
        path={'/RegistrationForm/PaymentBlockedList'}
        element={<PaymentBlockedList />}
      />
      <Route
        path={'/RegistrationForm/PaymentAutoCancelList'}
        element={<PaymentAutoCancelList />}
      />
      <Route
        path={'/RegistrationForm/TurndownBlockedList'}
        element={<TurndownBlockedList />}
      />
      <Route path={'/Report/SuspendedReport'} element={<SuspendedReport />} />
      <Route
        path={'/RegistrationForm/PaymentRequestList'}
        element={<PaymentRequestList />}
      />

      <Route
        path={'/RegistrationForm/SuspensionList'}
        element={<SuspensionList />}
      />
      <Route
        path={'/Report/ApproveExpireReport'}
        element={<ApproveExpireReport />}
      />
      <Route
        path={'/Report/TurndownExpireReport'}
        element={<TurndownExpireReport />}
      />
      {/* <Route
        path={'/Report/UnblockReport'}
        element={<UnblockReport />}
      /> */}
      <Route
        path={'/RegistrationForm/ApprovedExtensionList'}
        element={<ApprovedExtensionList />}
      />
      <Route
        path={'/RegistrationForm/TurndownList'}
        element={<TurndownList />}
      />
      <Route
        path={'/RegistrationForm/CheckTurndownList'}
        element={<CheckTurndownList />}
      />
      <Route
        path={'/RegistrationForm/ResubmitList'}
        element={<ResubmitList />}
      />
      <Route
        path={'/RegistrationForm/TurndownExtensionList'}
        element={<TurndownExtensionList />}
      />
      <Route
        path={'/RegistrationForm/CheckResubmitList'}
        element={<CheckResubmitList />}
      />
      <Route
        path={'/RegistrationForm/Edit/:id'}
        element={<RegistrationPage />}
      />
      <Route
        path={'/RegistrationForm/Detail/:id'}
        element={<RegistrationPage />}
      />
      {/* For Account Title Route */}
      <Route path={'/AccountType/List'} element={<AccountTypeList />} />
      <Route path={'/AccountType/New'} element={<AccountTypePage />} />
      <Route path={'/AccountType/Edit/:id'} element={<AccountTypePage />} />
      <Route path={'/AccountType/Delete/:id'} element={<AccountTypePage />} />
      <Route path={'/AccountType/Detail/:id'} element={<AccountTypePage />} />
      <Route
        path={'/DetailRegComponent/DetailRegComponent'}
        element={<DetailRegComponent />}
      />
      <Route
        path={'/BusinessCategory/List'}
        element={<BusinessCategoryList />}
      />
      <Route
        path={'/BusinessCategory/New'}
        element={<BusinessCategoryPage />}
      />
      <Route
        path={'/BusinessCategory/Edit/:id'}
        element={<BusinessCategoryPage />}
      />
      <Route
        path={'/BusinessCategory/Delete/:id'}
        element={<BusinessCategoryPage />}
      />
      <Route
        path={'/BusinessCategory/Detail/:id'}
        element={<BusinessCategoryPage />}
      />
      <Route path={'/AccountType/List'} element={<AccountTypeList />} />
      <Route path={'/AccountType/New'} element={<AccountTypePage />} />
      <Route path={'/AccountType/Edit/:id'} element={<AccountTypePage />} />
      <Route path={'/AccountType/Delete/:id'} element={<AccountTypePage />} />
      <Route path={'/AccountType/Detail/:id'} element={<AccountTypePage />} />
      <Route path={'/BusinessType/List'} element={<BusinessTypeList />} />
      <Route path={'/BusinessType/New'} element={<BusinessTypePage />} />
      <Route path={'/BusinessType/Edit/:id'} element={<BusinessTypePage />} />
      <Route path={'/BusinessType/Delete/:id'} element={<BusinessTypePage />} />
      <Route path={'/BusinessType/Detail/:id'} element={<BusinessTypePage />} />
      <Route path={'/ChequeNoSetup/List'} element={<ChequeNoList />} />
      <Route path={'/ChequeNoSetup/New'} element={<ChequeNoPage />} />
      <Route path={'/ChequeNoSetup/Edit/:id'} element={<ChequeNoPage />} />
      <Route path={'/ChequeNoSetup/Delete/:id'} element={<ChequeNoPage />} />
      <Route path={'/ChequeNoSetup/Detail/:id'} element={<ChequeNoPage />} />
      <Route path={'/AttachmentSetup/List'} element={<AttachmentSetupList />} />
      <Route path={'/AttachmentSetup/New'} element={<AttachmentSetupPage />} />
      <Route
        path={'/AttachmentSetup/Edit/:id'}
        element={<AttachmentSetupPage />}
      />
      <Route
        path={'/AttachmentSetup/Delete/:id'}
        element={<AttachmentSetupPage />}
      />
      <Route
        path={'/AttachmentSetup/Detail/:id'}
        element={<AttachmentSetupPage />}
      />
      <Route path={'/Report/MPUReport'} element={<MPUReport />} />
      <Route
        path={'/Report/PaymentRequestReport'}
        element={<PaymentRequestReport />}
      />

      <Route path={'/Report/RejectReport'} element={<RejectReport />} />
      <Route path={'/Report/DOCCAReport'} element={<DOCCAReport />} />
      <Route
        path={'/Report/PaymentAutoCancelReport'}
        element={<PaymentAutoCancelReport />}
      />
      <Route
        path={'/Report/AccountSummary'}
        element={<AccountTransactionReort />}
      />
      <Route path={'/Report/DccaReport'} element={<DCCAReport />} />
      <Route path={'/Report/AyaLogReport'} element={<AyaLogReport />} />
      <Route
        path={'/Report/CompanyInfoReport'}
        element={<CompanyInfoReport />}
      />
      <Route
        path={'/Report/RegisteredBusinessReport'}
        element={<RegisteredBusinessReport />}
      />
      <Route
        path={'/Report/AdvanceSearchReport'}
        element={<AdvanceSearchReport />}
      />
      <Route
        path={'/Report/ApprovedReport'}
        element={<ApprovedReport />}
      />
      <Route
        path={'/Report/AdvanceSearchbyIssuedDateReport'}
        element={<AdvanceSearchByIssuedDateReport />}
      />
      <Route path={'/Report/CategoryReport'} element={<CategoryReport />} />
      <Route
        path={'/Report/BusinessListByCategoryReport'}
        element={<BusinessListByCategoryReport />}
      />
      <Route
        path={'/Report/DetailRegisteredBusinessReport'}
        element={<DetailRegisteredBusinessReport />}
      />
      <Route path={'/DeliveryMethod/List'} element={<DeliveryMethodList />} />
      <Route path={'/DeliveryMethod/New'} element={<DeliveryMethodPage />} />
      <Route
        path={'/RegisteredBusinessCompany/RegisteredBusinessCompanyList'}
        element={<RegisteredBusinessList />}
      />
      <Route
        path={'/RegisteredBusinessIndividual/RegisteredBusinessIndividualList'}
        element={<RegisteredBusinessList />}
      />
      <Route
        path={'/CertificateForCompany/:id'}
        element={<CompanyDetailRegisteredInformation />}
      />
      <Route
        path={'/CertificateForIndividual/:id'}
        element={<IndividualDetailRegisteredInformation />}
      />
      <Route
        path={'/DeliveryMethod/Edit/:id'}
        element={<DeliveryMethodPage />}
      />
      <Route
        path={'/DeliveryMethod/Delete/:id'}
        element={<DeliveryMethodPage />}
      />
      <Route
        path={'/DeliveryMethod/Detail/:id'}
        element={<DeliveryMethodPage />}
      />
      <Route path={'/EcommerceType/List'} element={<EcommerceTypeList />} />
      <Route path={'/EcommerceType/New'} element={<EcommerceTypePage />} />
      <Route path={'/EcommerceType/Edit/:id'} element={<EcommerceTypePage />} />
      <Route
        path={'/EcommerceType/Delete/:id'}
        element={<EcommerceTypePage />}
      />
      <Route
        path={'/EcommerceType/Detail/:id'}
        element={<EcommerceTypePage />}
      />
      <Route path={'/PaymentMethod/List'} element={<PaymentMethodList />} />
      <Route path={'/PaymentMethod/New'} element={<PaymentMethodPage />} />
      <Route path={'/PaymentMethod/Edit/:id'} element={<PaymentMethodPage />} />
      <Route
        path={'/PaymentMethod/Delete/:id'}
        element={<PaymentMethodPage />}
      />
      <Route
        path={'/PaymentMethod/Detail/:id'}
        element={<PaymentMethodPage />}
      />
      <Route path={'/PlatFormType/List'} element={<PlatFormTypeList />} />
      <Route path={'/PlatFormType/New'} element={<PlatFormTypePage />} />
      <Route path={'/PlatFormType/Edit/:id'} element={<PlatFormTypePage />} />
      <Route path={'/PlatFormType/Delete/:id'} element={<PlatFormTypePage />} />
      <Route path={'/PlatFormType/Detail/:id'} element={<PlatFormTypePage />} />

      <Route path={'/Questions/List'} element={<QuesttionList />} />
      <Route path={'/Questions/New'} element={<QuestionPage />} />
      <Route path={'/Questions/Edit/:id'} element={<QuestionPage />} />
      <Route path={'/Questions/Delete/:id'} element={<QuestionPage />} />
      <Route path={'/Questions/Detail/:id'} element={<QuestionPage />} />

      <Route path={'/Report/StateReport'} element={<StateReport />} />
      <Route path={'/Report/CountsReport'} element={<CountsReport />} />
      <Route
        path={'/Report/ApplyIssuedReport'}
        element={<ApplyIssuedReport />}
      />
    </Routes>
  );
};

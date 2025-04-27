import {
  TeamOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
  DollarOutlined,
  BankOutlined,
  AuditOutlined,
  BookOutlined,
  ContainerOutlined,
  CarOutlined,
  CloudServerOutlined,
  EuroOutlined,
  LaptopOutlined,
  FileDoneOutlined,
  SettingOutlined,
  NotificationOutlined,
  CheckOutlined,
  HighlightOutlined,
  FileTextOutlined,
  CommentOutlined,
  CloseOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import AppContext from '../Context/Context';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Link } from 'react-router-dom';
import useActivateLink from 'src/app/Hooks/useActivatedLink';
import React from 'react';
type Props = {
  collapsed: boolean;
  setCollapse: () => void;
};
export const SideNav = ({ collapsed, setCollapse }: Props) => {
  const { link } = useActivateLink();
  const { data } = React.useContext(AppContext);
  const setupItems: MenuProps['items'] = [
    {
      label: 'User',
      key: 'SubMenu-User',
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link to="/User/List">List</Link>,
          key: '/User/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/User/New">New</Link>,
          key: '/User/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'RegisteredApplications',
      key: 'SubMenu-RegisteredApplications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegisteredBusinessCompany/RegisteredBusinessCompanyList">
              RegisteredBusiness List
            </Link>
          ),
          key: '/RegisteredBusinessCompany/RegisteredBusinessCompanyList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/RegistrationForm/ApprovedList">Approved List</Link>,
          key: '/RegistrationForm/ApprovedList',
          icon: <CheckOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/PaymentBlockedList">
              Approve Expired List
            </Link>
          ),
          key: '/RegistrationForm/PaymentBlockedList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/TurndownBlockedList">
              Turndown Expired List
            </Link>
          ),
          key: '/RegistrationForm/TurndownBlockedList',
          icon: <UnorderedListOutlined />,
        },
        // {
        //   label: (
        //     <Link to="RegistrationForm/SuspensedReport">
        //       Suspensed Report List
        //     </Link>
        //   ),
        //   key: '/RegistrationForm/SuspensedReport',
        //   icon: <UnorderedListOutlined />,
        // },
        {
          label: (
            <Link to="/RegistrationForm/SuspensionList">Suspension List</Link>
          ),
          key: '/RegistrationForm/SuspensionList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/PaymentRequestList">
              Payment Request List
            </Link>
          ),
          key: '/RegistrationForm/PaymentRequestList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/PaymentAutoCancelList">
              Payment Auto Cancel List
            </Link>
          ),
          key: '/RegistrationForm/PaymentAutoCancelList',
          icon: <UnorderedListOutlined />,
        },
      ],
    },

    {
      label: 'SystemSetting',
      key: 'SubMenu-SystemSetting',
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/SystemSetting/List">List</Link>,
          key: '/SystemSetting/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/SystemSetting/New">New</Link>,
          key: '/SystemSetting/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Attachment Setup',
      key: 'SubMenu-Attachment Setup',
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link to="/AttachmentSetup/List">List</Link>,
          key: '/AttachmentSetup/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/AttachmentSetup/New">New</Link>,
          key: '/AttachmentSetup/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Member',
      key: 'SubMenu-Member',
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link to="/Member/List">List</Link>,
          key: '/AccountTMemberitle/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Member/New">New</Link>,
          key: '/Member/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Account Title',
      key: 'SubMenu-AccountTitle',
      icon: <DollarOutlined />,
      children: [
        {
          label: <Link to="/AccountTitle/List">List</Link>,
          key: '/AccountTitle/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/AccountTitle/New">New</Link>,
          key: '/AccountTitle/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Account Type',
      key: 'SubMenu-AccountType',
      icon: <BankOutlined />,
      children: [
        {
          label: <Link to="/AccountType/List">List</Link>,
          key: '/AccountType/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/AccountType/New">New</Link>,
          key: '/AccountType/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Questions',
      key: 'Questions',
      icon: <SettingOutlined />,
      children: [
        {
          label: <Link to="/Questions/List">List</Link>,
          key: '/Questions/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Questions/New">New</Link>,
          key: '/Questions/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Announcement',
      key: 'SubMenu-Announcement',
      icon: <NotificationOutlined />,
      children: [
        {
          label: <Link to="/Announcement/List">List</Link>,
          key: '/Announcement/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Announcement/New">New</Link>,
          key: '/Announcement/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },

    {
      label: 'FAQ',
      key: 'SubMenu-FAQ',
      icon: <CommentOutlined />,
      children: [
        {
          label: <Link to="/FAQ/List">List</Link>,
          key: '/FAQ/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/FAQ/New">New</Link>,
          key: '/FAQ/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },

    {
      label: 'ContactUs',
      key: 'SubMenu-ContactUs',
      icon: <HighlightOutlined />,
      children: [
        {
          label: <Link to="/ContactUs/List">List</Link>,
          key: '/ContactUs/List',
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: 'Report',
      key: 'SubMenu-Report',
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link to="/Report/MPUReport">MPUReport</Link>,
          key: '/Report/MPUReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/PaymentRequestReport">PaymentRequestReport</Link>
          ),
          key: '/Report/PaymentRequestReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Report/RejectReport">RejectReport</Link>,
          key: '/Report/RejectReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Report/DOCCAReport">DOCAReport</Link>,
          key: '/Report/DOCCAReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/PaymentAutoCancelReport">
              PaymentAutoCancelReport
            </Link>
          ),
          key: '/Report/PaymentAutoCancelReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/AccountSummary">AccountTransactionReport</Link>
          ),
          key: '/Report/AccountSummary',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/DccaReport">Account Summary</Link>,
          key: '/Report/DccaReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/CompanyInfoReport">CompanyInfoReport</Link>,
          key: '/Report/CompanyInfoReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/RegisteredBusinessReport">
              RegisteredBusinessReport
            </Link>
          ),
          key: '/Report/RegisteredBusinessReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/CategoryReport">CategoryReport</Link>,
          key: '/Report/CategoryReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/StateReport">State Report</Link>,
          key: '/Report/StateReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Report/CountsReport">Count Report</Link>,
          key: '/Report/CountsReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/AdvanceSearchReport">Advance Search Report</Link>
          ),
          key: '/Report/AdvanceSearchReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/ApprovedReport">Approved Report</Link>,
          key: '/Report/ApprovedReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/AdvanceSearchByIssuedDateReport">
              Advance Search By IssuedDate Report
            </Link>
          ),
          key: '/Report/AdvanceSearchByIssuedDateReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/BusinessListByCategoryReport">
              Business List By Category Report
            </Link>
          ),
          key: '/Report/BusinessListByCategoryReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/DetailRegisteredBusinessReport">
              Detail Registered Business Report
            </Link>
          ),
          key: '/Report/DetailRegisteredBusinessReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/ApplyIssuedReport">
              Apply Issued Report Report
            </Link>
          ),
          key: '/Report/ApplyIssuedReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/AyaLogReport">Aya Request Response Log</Link>
          ),
          key: '/Report/AyaLogReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/ApproveExpireReport">Approve Expired Report</Link>
          ),
          key: '/Report/ApproveExpireReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/TurndownExpireReport">
              Turndown Expired Report
            </Link>
          ),
          key: '/Report/TurndownExpireReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/SuspendedReport">Suspended Report </Link>,
          key: '/Report/SuspendedReport',
          icon: <PlusCircleOutlined />,
        },
        // {
        //   label: (
        //     <Link to="/Report/UnblockReport">
        //       UnblockReport
        //     </Link>
        //   ),
        //   key: '/Report/UnblockReport',
        //   icon: <PlusCircleOutlined />,
        // },
      ],
    },
    {
      label: 'Business Category',
      key: 'SubMenu-BusinessCategory',
      icon: <AuditOutlined />,
      children: [
        {
          label: <Link to="/BusinessCategory/List">List</Link>,
          key: '/BusinessCategory/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/BusinessCategory/New">New</Link>,
          key: '/BusinessCategory/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Business Type',
      key: 'SubMenu-BusinessType',
      icon: <BookOutlined />,
      children: [
        {
          label: <Link to="/BusinessType/List">List</Link>,
          key: '/BusinessType/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/BusinessType/New">New</Link>,
          key: '/BusinessType/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Cheque No Setup',
      key: 'SubMenu-ChequeNoSetup',
      icon: <ContainerOutlined />,
      children: [
        {
          label: <Link to="/ChequeNoSetup/List">List</Link>,
          key: '/ChequeNoSetup/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/ChequeNoSetup/New">New</Link>,
          key: '/ChequeNoSetup/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Delivery Method',
      key: 'SubMenu-DeliveryMethod',
      icon: <CarOutlined />,
      children: [
        {
          label: <Link to="/DeliveryMethod/List">List</Link>,
          key: '/DeliveryMethod/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/DeliveryMethod/New">New</Link>,
          key: '/DeliveryMethod/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Ecommerce Type',
      key: 'SubMenu-EcommerceType',
      icon: <CloudServerOutlined />,
      children: [
        {
          label: <Link to="/EcommerceType/List">List</Link>,
          key: '/EcommerceType/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/EcommerceType/New">New</Link>,
          key: '/EcommerceType/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Payment Method',
      key: 'SubMenu-PaymentMethod',
      icon: <EuroOutlined />,
      children: [
        {
          label: <Link to="/PaymentMethod/List">List</Link>,
          key: '/PaymentMethod/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/PaymentMethod/New">New</Link>,
          key: '/PaymentMethod/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'Platform Type',
      key: 'SubMenu-PlatformType',
      icon: <LaptopOutlined />,
      children: [
        {
          label: <Link to="/PlatformType/List">List</Link>,
          key: '/PlatformType/List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/PlatformType/New">New</Link>,
          key: '/PlatformType/New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
  ];

  const checkUserItems: MenuProps['items'] = [
    {
      label: 'Applications',
      key: 'SubMenu-Applications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegistrationForm/RegistrationList">Apply List</Link>
          ),
          key: '/RegistrationForm/RegistrationList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/RegistrationForm/CheckedList">Checked List</Link>,
          key: '/RegistrationForm/CheckedList',
          icon: <CheckOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/CheckTurndownList">Turndown List</Link>
          ),
          key: '/RegistrationForm/CheckTurndownList',
          icon: <CloseOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/CheckResubmitList">Resubmit List</Link>
          ),
          key: '/RegistrationForm/CheckResubmitList',
          icon: <ImportOutlined />,
        },
      ],
    },
    {
      label: 'Amend Applications',
      key: 'SubMenu-Amend-Applications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegistrationForm/RegistrationAmendList">Apply List</Link>
          ),
          key: '/RegistrationForm/RegistrationAmendList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/RegistrationAmendApproveList">
              Checked List
            </Link>
          ),
          key: '/RegistrationForm/RegistrationAmendApproveList',
          icon: <CheckOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/CheckTurndownAmendList">
              Turndown List
            </Link>
          ),
          key: '/RegistrationForm/CheckTurndownAmendList',
          icon: <CloseOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/CheckResubmitAmendList">
              Resubmit List
            </Link>
          ),
          key: '/RegistrationForm/CheckResubmitAmendList',
          icon: <ImportOutlined />,
        },
      ],
    },
    {
      label: 'Cancel Applications',
      key: 'SubMenu-Cancel-Applications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegistrationForm/RegistrationCancelList">
              Apply List
            </Link>
          ),
          key: '/RegistrationForm/RegistrationCancelList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/RegistrationCancelApproveList">
              Checked List
            </Link>
          ),
          key: '/RegistrationForm/RegistrationCancelApproveList',
          icon: <CheckOutlined />,
        },
      ],
    },
    {
      label: 'Extension Applications',
      key: 'SubMenu-Extension-Applications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegistrationForm/RegistrationExtensionList">
              Apply List
            </Link>
          ),
          key: '/RegistrationForm/RegistrationExtensionList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/RegistrationExtensionApproveList">
              Checked List
            </Link>
          ),
          key: '/RegistrationForm/RegistrationExtensionApproveList',
          icon: <CheckOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/CheckTurndownExtensionList">
              Turndown List
            </Link>
          ),
          key: '/RegistrationForm/CheckTurndownExtensionList',
          icon: <CloseOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/CheckResubmitExtensionList">
              Resubmit List
            </Link>
          ),
          key: '/RegistrationForm/CheckResubmitExtensionList',
          icon: <ImportOutlined />,
        },
      ],
    },

    {
      label: 'RegisteredApplications',
      key: 'SubMenu-RegisteredApplications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegisteredBusinessCompany/RegisteredBusinessCompanyList">
              Company RegisteredBusiness List
            </Link>
          ),
          key: '/RegisteredBusinessCompany/RegisteredBusinessCompanyList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegisteredBusinessIndividual/RegisteredBusinessIndividualList">
              Individual RegisteredBusiness List
            </Link>
          ),
          key: '/RegisteredBusinessIndividual/RegisteredBusinessIndividualList',
          icon: <UnorderedListOutlined />,
        },
      ],
    },
  ];

  const approveUserItems: MenuProps['items'] = [
    {
      label: 'Applications',
      key: 'SubMenu-Applications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: <Link to="/RegistrationForm/CheckedList">Apply List</Link>,
          key: '/RegistrationForm/CheckedList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/DoccaPendingList">
              DOCA Pending List
            </Link>
          ),
          key: '/RegistrationForm/DoccaPendingList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/DoccaApprovedList">
              DOCA Aproved List
            </Link>
          ),
          key: '/RegistrationForm/DoccaApprovedList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/DoccaRejectList">DOCA Reject List</Link>
          ),
          key: '/RegistrationForm/DoccaRejectList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/RegistrationForm/ApprovedList">Checked List</Link>,
          key: '/RegistrationForm/ApprovedList',
          icon: <CheckOutlined />,
        },
        {
          label: <Link to="/RegistrationForm/TurndownList">Turndown List</Link>,
          key: '/RegistrationForm/TurndownList',
          icon: <CloseOutlined />,
        },
        {
          label: <Link to="/RegistrationForm/ResubmitList">Resubmit List</Link>,
          key: '/RegistrationForm/ResubmitList',
          icon: <ImportOutlined />,
        },
        /* {
          label: (
            <Link to="/RegistrationForm/PaymentBlockedList">
              Payment Blocked List
            </Link>
          ),
          key: '/RegistrationForm/PaymentBlockedList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/TurndownBlockedList">
              Turndown Blocked List
            </Link>
          ),
          key: '/RegistrationForm/TurndownBlockedList',
          icon: <UnorderedListOutlined />,
        },*/
      ],
    },

    {
      label: 'Amend Applications',
      key: 'SubMenu-Amend-Applications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegistrationForm/RegistrationAmendApproveList">
              Apply List
            </Link>
          ),
          key: '/RegistrationForm/RegistrationAmendApproveList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/ApprovedAmendList">Checked List</Link>
          ),
          key: '/RegistrationForm/ApprovedAmendList',
          icon: <CheckOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/TurndownAmendList">Turndown List</Link>
          ),
          key: '/RegistrationForm/TurndownAmendList',
          icon: <CloseOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/ResubmitAmendList">Resubmit List</Link>
          ),
          key: '/RegistrationForm/ResubmitAmendList',
          icon: <ImportOutlined />,
        },
      ],
    },
    {
      label: 'Extension Applications',
      key: 'SubMenu-ExtensionApplications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegistrationForm/RegistrationExtensionApproveList">
              Apply List
            </Link>
          ),
          key: '/RegistrationForm/RegistrationExtensionApproveList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/ApprovedExtensionList">
              Checked List
            </Link>
          ),
          key: '/RegistrationForm/ApprovedExtensionList',
          icon: <CheckOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/TurndownExtensionList">
              Turndown List
            </Link>
          ),
          key: '/RegistrationForm/TurndownExtensionList',
          icon: <CloseOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/ResubmitExtensionList">
              Resubmit List
            </Link>
          ),
          key: '/RegistrationForm/ResubmitExtensionList',
          icon: <ImportOutlined />,
        },
      ],
    },
    {
      label: 'RegisteredApplications',
      key: 'SubMenu-RegisteredApplications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegisteredBusinessCompany/RegisteredBusinessCompanyList">
              Company RegisteredBusiness List
            </Link>
          ),
          key: '/RegisteredBusinessCompany/RegisteredBusinessCompanyList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegisteredBusinessIndividual/RegisteredBusinessIndividualList">
              Individual RegisteredBusiness List
            </Link>
          ),
          key: '/RegisteredBusinessIndividual/RegisteredBusinessIndividualList',
          icon: <UnorderedListOutlined />,
        },
      ],
    },
  ];

  const reportUserItems: MenuProps['items'] = [
    {
      label: 'Report',
      key: 'SubMenu-Report',
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link to="/Report/MPUReport">MPUReport</Link>,
          key: '/Report/MPUReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/PaymentRequestReport">PaymentRequestReport</Link>
          ),
          key: '/Report/PaymentRequestReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Report/RejectReport">RejectReport</Link>,
          key: '/Report/RejectReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/PaymentAutoCancelReport">
              PaymentAutoCancelReport
            </Link>
          ),
          key: '/Report/PaymentAutoCancelReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/AccountSummary">AccountTransactionReport</Link>
          ),
          key: '/Report/AccountSummary',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/DccaReport">Account Summary</Link>,
          key: '/Report/DccaReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/CompanyInfoReport">CompanyInfoReport</Link>,
          key: '/Report/CompanyInfoReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/RegisteredBusinessReport">
              RegisteredBusinessReport
            </Link>
          ),
          key: '/Report/RegisteredBusinessReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/CategoryReport">CategoryReport</Link>,
          key: '/Report/CategoryReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/StateReport">StateReport</Link>,
          key: '/Report/StateReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/CountsReport">CountsReport</Link>,
          key: '/Report/CountsReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/AdvanceSearchReport">Advance Search Report</Link>
          ),
          key: '/Report/AdvanceSearchReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/ApprovedReport">Approved Report</Link>,
          key: '/Report/ApprovedReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/AdvanceSearchByIssuedDateReport">
              Advance Search By IssuedDate Report
            </Link>
          ),
          key: '/Report/AdvanceSearchByIssuedDateReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/DetailRegisteredBusinessReport">
              Detail Registered Business Report
            </Link>
          ),
          key: '/Report/DetailRegisteredBusinessReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/ApplyIssuedReport">
              Apply Issued Report Report
            </Link>
          ),
          key: '/Report/ApplyIssuedReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/AyaLogReport">Aya Request Response Log</Link>
          ),
          key: '/Report/AyaLogReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/ApproveExpireReport">Approve Exipire Report</Link>
          ),
          key: '/Report/ApproveExpireReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/TurndownExpireReport">
              Turndown Exipire Report
            </Link>
          ),
          key: '/Report/TurndownExpireReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/SuspendedReport">Suspended Report </Link>,
          key: '/Report/SuspendedReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/DOCCAReport">DOCAReport</Link>,
          key: '/Report/DOCCAReport',
          icon: <UnorderedListOutlined />,
        },
      ],
    },
  ];

  const docareportUserItems: MenuProps['items'] = [
    {
      label: 'DOCAReport',
      key: 'SubMenu-DOCAReport',
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link to="/Report/StateReport">StateReport</Link>,
          key: '/Report/StateReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/DetailRegisteredBusinessReport">
              Detail Registered Business Report
            </Link>
          ),
          key: '/Report/DetailRegisteredBusinessReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Report/DOCCAReport">DOCAReport</Link>,
          key: '/Report/DOCCAReport',
          icon: <UnorderedListOutlined />,
        },
      ],
    },
  ];
  const egovreportUserItems: MenuProps['items'] = [
    {
      label: 'EGOVReport',
      key: 'SubMenu-EgovReport',
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link to="/Report/StateReport">StateReport</Link>,
          key: '/Report/StateReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/CountsReport">Count Report</Link>,
          key: '/Report/CountsReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Report/CategoryReport">CategoryReport</Link>,
          key: '/Report/CategoryReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/AdvanceSearchByIssuedDateReport">
              Advance Search By IssuedDate Report
            </Link>
          ),
          key: '/Report/AdvanceSearchByIssuedDateReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/DetailRegisteredBusinessReport">
              Detail Registered Business Report
            </Link>
          ),
          key: '/Report/DetailRegisteredBusinessReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: (
            <Link to="/Report/ApplyIssuedReport">
              Apply Issued Report Report
            </Link>
          ),
          key: '/Report/ApplyIssuedReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/ApproveExpireReport">Approve Expired Report</Link>
          ),
          key: '/Report/ApproveExpireReport',
          icon: <PlusCircleOutlined />,
        },

        {
          label: (
            <Link to="/Report/PaymentRequestReport">PaymentRequestReport</Link>
          ),
          key: '/Report/PaymentRequestReport',
          icon: <UnorderedListOutlined />,
        },

        {
          label: (
            <Link to="/Report/PaymentAutoCancelReport">
              PaymentAutoCancelReport
            </Link>
          ),
          key: '/Report/PaymentAutoCancelReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/TurndownExpireReport">
              Turndown Expired Report
            </Link>
          ),
          key: '/Report/TurndownExpireReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/RejectReport">RejectReport</Link>,
          key: '/Report/RejectReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Report/SuspendedReport">Suspended Report </Link>,
          key: '/Report/SuspendedReport',
          icon: <PlusCircleOutlined />,
        },
        {
          label: <Link to="/Report/DOCCAReport">DOCAReport</Link>,
          key: '/Report/DOCCAReport',
          icon: <UnorderedListOutlined />,
        },
      ],
    },
  ];

  const specialUserItems: MenuProps['items'] = [
    {
      label: 'RegisteredApplications',
      key: 'SubMenu-RegisteredApplications',
      icon: <FileDoneOutlined />,
      children: [
        {
          label: (
            <Link to="/RegisteredBusinessCompany/RegisteredBusinessCompanyList">
              RegisteredBusiness List
            </Link>
          ),
          key: '/RegisteredBusinessCompany/RegisteredBusinessCompanyList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/RegistrationForm/ApprovedList">Approved List</Link>,
          key: '/RegistrationForm/ApprovedList',
          icon: <CheckOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/PaymentBlockedList">
              Payment Blocked List
            </Link>
          ),
          key: '/RegistrationForm/PaymentBlockedList',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/RegistrationForm/TurndownBlockedList">
              Turndown Blocked List
            </Link>
          ),
          key: '/RegistrationForm/TurndownBlockedList',
          icon: <UnorderedListOutlined />,
        },
      ],
    },
  ];
  const accountreportUserItems: MenuProps['items'] = [
    {
      label: 'AccountReport',
      key: 'SubMenu-AccountReport',
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link to="/Report/MPUReport">MPUReport</Link>,
          key: '/Report/MPUReport',
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <Link to="/Report/AccountSummary">AccountTransactionReport</Link>
          ),
          key: '/Report/AccountSummary',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
  ];

  let items: MenuProps['items'] = [];
  if (data?.role) {
    const permission = data?.role;
    if (permission === 'Admin') {
      items = setupItems;
    } else if (permission === 'Check User') {
      items = checkUserItems;
    } else if (permission === 'Approve User') {
      items = approveUserItems;
    } else if (permission === 'Report User') {
      items = reportUserItems;
    } else if (permission === 'Special User') {
      items = specialUserItems;
    } else if (permission === 'Docareport User') {
      items = docareportUserItems;
    } else if (permission === 'Egovreport User') {
      items = egovreportUserItems;
    } else if (permission === 'Accountreport User') {
      items = accountreportUserItems;
    } else {
      items = [];
    }
  }
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={25}
      width={350}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        //backgroundColor: 'white',
        zIndex: 100000,
      }}
    >
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        selectedKeys={[link.toString()]}
        items={items}
      ></Menu>
    </Sider>
  );
};

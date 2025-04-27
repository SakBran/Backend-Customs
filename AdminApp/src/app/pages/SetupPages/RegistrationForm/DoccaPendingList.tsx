import { CheckApproveTable } from "src/app/components/Table/CheckApproveTable";
import { Get } from "src/app/services/BasicHttpServices";
import React from 'react';
import DoccaAction from "src/app/components/TableAction/DoccaAction";

const columnMapping = {
    'doccaSendDate': 'docaSendDate',
}
const DoccaPendingList: React.FC = () => (
    <CheckApproveTable
        api={"DOCCA/GetDOCCAPendingList"}
        displayData={[
            'applicationNo',
            'createdDate',
            'checkDate',
            'doccaSendDate',
            'businessName',
            'businessNameMyanmar',
            'companyRegNo',
            'smeRegNo',
            'eirRegNo',
            'isReSubmit',
            'sendToDocaBy',
            'id',
        ]}
        columnLabels={columnMapping}
        fetch={Get}
        actionColumn={(record) => <DoccaAction id={record.id} source="DoccaPendingList" />}
    />
)

export default DoccaPendingList;
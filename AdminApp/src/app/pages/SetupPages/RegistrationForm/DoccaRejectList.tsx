import { CheckApproveTable } from "src/app/components/Table/CheckApproveTable";
import { Get } from "src/app/services/BasicHttpServices";
import React from 'react';
import DoccaAction from "src/app/components/TableAction/DoccaAction";

const columnMapping = {
    'doccaPassDate': 'docaPassDate',
}
const DoccaRejectList: React.FC = () => (
    <CheckApproveTable
        api={"DOCCA/GetDOCCARejectList"}
        displayData={[
            'applicationNo',
            'createdDate',
            'checkDate',
            'doccaPassDate',
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
        actionColumn={(record) => <DoccaAction id={record.id} source="DoccaRejectList" />}
    />
)

export default DoccaRejectList;
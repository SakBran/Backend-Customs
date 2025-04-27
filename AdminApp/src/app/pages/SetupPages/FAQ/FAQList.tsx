import React from 'react';
import { BasicTable } from 'src/app/components/Table/BasicTable';
import { Get } from 'src/app/services/BasicHttpServices';

const FAQList: React.FC = () => (
  <BasicTable
    api={'FAQ'}
    displayData={['faqQuestion', 'faqAnswer', 'faqCategory', 'id']}
    fetch={Get}
  ></BasicTable>
);

export default FAQList;

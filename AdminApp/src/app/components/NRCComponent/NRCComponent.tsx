import React, { useState } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import NRCDataType from './DataType';
import NRCData from './NRC';
import { AnyObject } from 'src/Models/AnyObject';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import DynamicTooltip from '../DynamicTooltip/DynamicTooltipComponent';
import { useParams } from 'react-router-dom';

const { Option } = Select;

type Props = {
  formRef: AnyObject;
  applyType?: string;
  amendName?: string;
  setCheck?: (value: boolean) => void;
  check?: boolean;
};

const NRCComponent: React.FC<Props> = ({
  formRef,
  applyType,
  amendName,
  check,
  setCheck,
}) => {
  const { id: paramID } = useParams();
  let id = '';
  if (paramID) {
    id = paramID;
  }
  const [divisionList, setDivisionList] = useState<NRCDataType[]>([]);
  const [prefix, setPrefix] = useState<string>('');
  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      if (setCheck) setCheck(true);
    } else {
      if (setCheck) setCheck(false);
    }
  };
  const onHandleChange = (value: string) => {
    if (value) {
      const tempList: NRCDataType[] = NRCData.filter(
        (x) => +x.nrc_code === +value
      );
      setDivisionList(tempList);
      setPrefix('');
      formRef.current.setFieldsValue({
        NRCPrefix: '',
      });
    }
  };

  const Options = Array.from({ length: 14 }, (_, i) => (
    <Option key={i + 1} value={(i + 1).toString()}>
      {i + 1}
    </Option>
  ));

  const NRCCode = (
    <Form.Item noStyle name="nrcCode">
      <Select
        defaultValue="1"
        style={{ width: '40%' }}
        onChange={onHandleChange}
      >
        {Options}
      </Select>
    </Form.Item>
  );

  const NRCPrefix = (
    <Form.Item name="nrcPrefix" noStyle initialValue={prefix}>
      <Select
        style={{ width: '100%' }}
        onChange={(value) => {
          setPrefix(value);
        }}
      >
        {divisionList.map((x) => (
          <Option key={x.id} value={x.name_en}>
            {x.name_en}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const NRCType = (
    <Form.Item noStyle name="nrcType">
      <Select style={{ width: '100%' }}>
        <Option value="(C)">(C) နိုင်ငံသား</Option>
        <Option value="(AC)">(AC) ဧည့်နိုင်ငံသား</Option>
        <Option value="(NC)">(NC) နိုင်ငံသားပြုခွင့်ရသူ</Option>
        <Option value="(V)">(V) နိုင်ငံသားစိစစ်ခံမည့်သူ</Option>
        <Option value="(M)">(M) သာသနာဝင်</Option>
        <Option value="(N)">(N) သာသနာနွယ်ဝင်</Option>
      </Select>
    </Form.Item>
  );

  const checkBtn = (
    <Button>
      <Form.Item noStyle valuePropName="checked" name={amendName}>
        <Checkbox onChange={handleCheckBoxChange} checked={check}></Checkbox>
      </Form.Item>
    </Button>
  );
  const NRCNo = (
    <Form.Item noStyle name="nrcNo">
      <Input />
    </Form.Item>
  );

  return (
    <Form.Item
      label={
        <>
          <DynamicTooltip fieldName={'nrc'} id={+id}></DynamicTooltip>
          &nbsp;Business Owner NRC number
        </>
      }
    >
      <Space.Compact block>
        {applyType === 'Amend' ? checkBtn : ''}
        {NRCCode}
        {NRCPrefix}
        {NRCType}
        {NRCNo}
      </Space.Compact>
    </Form.Item>
  );
};

export default NRCComponent;

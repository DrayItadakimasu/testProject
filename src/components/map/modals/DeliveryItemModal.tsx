import React, { useState, forwardRef, Ref, useImperativeHandle } from 'react';
import { Modal, Row, Col } from 'antd';
import { ValueType } from '@/src/models/form-types/form-types';
import { deliveryPoints, IDeliveryMapItem } from '../../../models/delivery-map';
import Input from '../../form-elements/Input';
import Select from '../../form-elements/Select';

interface IProps {
  onOk: (item: IDeliveryMapItem) => void;
  onCansel: () => void | null;
  visible: boolean;
}

export interface ObjectRef {
  setData: (data: IDeliveryMapItem) => void;
  setTitle: (title: string) => void;
}

const DeliveryItemModal = forwardRef<ObjectRef, IProps>(function DeliveryItemModal(
  { onOk, onCansel, visible = false }: IProps,
  ref: Ref<ObjectRef>
) {
  useImperativeHandle(ref, () => ({ setData, setTitle }));
  // state
  const [data, setData] = useState<IDeliveryMapItem>({
    loadingPoint: {
      lat: 0,
      lon: 0,
      name: '',
    },
    unloadingPoint: {
      lat: 0,
      lon: 0,
      name: '',
    },
    payloadName: '',
  });
  const [title, setTitle] = useState<string>('Edit');
  // data

  // actions
  const handleOk = () => onOk(data);
  const handleData = (name: string, value: ValueType) => {
    setData({ ...data, [name]: value });
  };
  const handleSelectPoint = (fieldName: string, optionId: ValueType) => {
    const optionSelected = deliveryPoints.find((item) => item.id === optionId);
    const lat = optionSelected?.extra?.lat;
    const lon = optionSelected?.extra?.lon;
    const name = optionSelected?.title;
    setData({ ...data, [fieldName]: { lat, lon, name } });
  };
  return (
    <Modal title={title} onOk={handleOk} onCancel={onCansel} visible={visible}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input placeholder="payload name" name="payloadName" onInput={handleData} value={data.payloadName} />
        </Col>
        <Col span={24}>
          <Select
            placeholder="loading point"
            name="loadingPoint"
            onSelect={handleSelectPoint}
            options={deliveryPoints}
            value={deliveryPoints.find((item) => item.title === data.loadingPoint.name)?.id}
          />
        </Col>
        <Col span={24}>
          <Select
            placeholder="unloading point"
            name="unloadingPoint"
            onSelect={handleSelectPoint}
            options={deliveryPoints}
            value={deliveryPoints.find((item) => item.title === data.unloadingPoint.name)?.id}
          />
        </Col>
      </Row>
    </Modal>
  );
});

export default DeliveryItemModal;

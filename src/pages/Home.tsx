import React, { useState, useEffect, useRef } from 'react';
import '../assets/pages/home.scss';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Table, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { deliveryMapMockData, deliveryItemRaw, IDeliveryMapItem, IPoint } from '../models/delivery-map';
import { TableRowSelection } from 'antd/es/table/interface';
import { ColumnsType } from 'antd/lib/table';
import Router from '../components/map/Router';
import DeliveryItemModal, { ObjectRef } from '../components/map/modals/DeliveryItemModal';
import DraggableLayout from '../components/common/DraggableLayout';
function Home() {
  // state
  const [loading, setLoading] = useState<boolean>(true);
  const [mapLoading, setMapLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<IDeliveryMapItem[]>([]);

  const [selectedRow, setRow] = useState<number[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<IDeliveryMapItem>();

  const deliveryModal = useRef<ObjectRef>(null);
  const [isDeliveryModalShow, showDeliveryModal] = useState<boolean>(false);

  const [width, setWidth] = useState(30);
  // data
  const columns: ColumnsType<IDeliveryMapItem> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'payload name', dataIndex: 'payloadName', key: 'payloadName' },
    {
      title: 'Loading point',
      dataIndex: 'loadingPoint',
      key: 'loadingPoint',
      render: (record: IPoint) => <div>{record.name}</div>,
    },
    {
      title: 'Unloading point',
      dataIndex: 'unloadingPoint',
      key: 'unloadingPoint',
      render: (record: IPoint) => <div>{record.name}</div>,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (record: IDeliveryMapItem) => (
        <div>
          <a onClick={() => deleteDeliveryMapItem(record)}>Delete</a>
          <br />
          <a onClick={() => handleOpenDeliveryModal(record)}>Edit</a>
        </div>
      ),
    },
  ];
  const rowSelection: TableRowSelection<IDeliveryMapItem> = {
    type: 'checkbox',
    hideSelectAll: true,
    selectedRowKeys: selectedRow,
    onSelect: (record) => {
      if (record.id === selectedRow[0]) {
        setRow([]);
        setSelectedPoint(undefined);
      } else {
        setRow([record.key as number]);
        setSelectedPoint(record);
      }
    },
  };
  // actions
  const deleteDeliveryMapItem = (item: IDeliveryMapItem) => {
    if (selectedRow[0] === item.id) {
      setRow([]);
      setSelectedPoint(undefined);
    }
    setDataSource(dataSource.filter((item) => item.id !== item.id));
  };
  const handleOpenDeliveryModal = (item?: IDeliveryMapItem) => {
    if (item) {
      deliveryModal?.current?.setData(item);
      deliveryModal?.current?.setTitle('Edit');
    } else {
      deliveryModal?.current?.setData(deliveryItemRaw());
      deliveryModal?.current?.setTitle('Create');
    }
    showDeliveryModal(true);
  };
  const handleCloseDeliveryModal = () => showDeliveryModal(false);
  const handleCreateOrEditDeliveryItem = (deliveryItem: IDeliveryMapItem) => {
    if (deliveryItem.id) {
      setDataSource(dataSource.map((item) => (item.id === deliveryItem.id ? deliveryItem : item)));
    } else {
      deliveryItem.key = dataSource.length + 1;
      deliveryItem.id = dataSource.length + 1;
      setDataSource([...dataSource, deliveryItem]);
    }
    showDeliveryModal(false);
  };
  // mount hook
  useEffect(() => {
    setTimeout(() => {
      setDataSource(deliveryMapMockData);
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="delivery-map">
      <DraggableLayout
        width={width}
        onWidthChange={(width: number) => {
          setWidth(width);
          setMapLoading(true);
        }}
        onMouseUp={() => setMapLoading(false)}
      >
        <div className="delivery-map__table-container">
          <div className="delivery-map__table-container__actions">
            <Button type="primary" onClick={() => handleOpenDeliveryModal()}>
              <PlusOutlined />
            </Button>
          </div>
          <div>
            <Table
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              rowSelection={rowSelection}
              pagination={false}
            />
          </div>
        </div>
      </DraggableLayout>
      <DraggableLayout width={100 - width} hasDrag={false}>
        <div className="delivery-map__map-container">
          {!mapLoading ? (
            <MapContainer center={[55.7522, 37.6156]} zoom={5} className="leaflet-map-container">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {selectedRow.length && <Router points={selectedPoint} />}
            </MapContainer>
          ) : (
            <div className="delivery-map__map-container__loader">
              <Spin size="large" />
            </div>
          )}
        </div>
      </DraggableLayout>

      <DeliveryItemModal
        ref={deliveryModal}
        visible={isDeliveryModalShow}
        onOk={handleCreateOrEditDeliveryItem}
        onCansel={handleCloseDeliveryModal}
      />
    </div>
  );
}

export default Home;

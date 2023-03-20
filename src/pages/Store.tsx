import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import storeItems from '../data/items.json';
import MetaData from './MetaData';
import { requestProvider } from 'webln';
import { useState } from 'react';

export function Store() {
  const [nodeInfo, setNodeInfo] = useState('');

  async function loadRequestProvider() {
    const webln = await requestProvider();
    const nodeInfo = await webln.getInfo();
    setNodeInfo(nodeInfo.node.alias);
  }

  return (
    <>
      <MetaData title="Store" />
      <h1>Store</h1>
      <h3>All prices are in Satoshis</h3>
      <h5>All items come in packs of 5 units.</h5>
      <button onClick={loadRequestProvider}>Connect to LN⚡ provider</button>
      <p> Connected to: {nodeInfo}</p>

      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map(item => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

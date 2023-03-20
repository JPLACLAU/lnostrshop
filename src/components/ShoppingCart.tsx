import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { CartItem } from './CartItem';
import storeItems from '../data/items.json';
import { requestProvider } from 'webln';
import { useState } from 'react';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [nodeInfo, setNodeInfo] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentRequest, setPaymentRequest] = useState('');

  async function loadRequestProvider() {
    const webln = await requestProvider();
    const nodeInfo = await webln.getInfo();
    setNodeInfo(nodeInfo.node.alias);
    console.log(nodeInfo);
  }

  async function handleInvoice(e) {
    const webln = await requestProvider();
    e.preventDefault();
    const invoice = await webln.makeInvoice(amount);
    console.log(invoice);
    setPaymentRequest(invoice.paymentRequest);
  }

  async function handlePayment() {
    const webln = await requestProvider();
    await webln.sendPayment(paymentRequest);
  }

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}

          <div className="ms-auto fw-bold fs-5">
            Total:{' '}
            {cartItems.reduce((total, cartItem) => {
              const item = storeItems.find(i => i.id === cartItem.id);
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)}
          </div>
        </Stack>
        <div>LN buy button here </div>
        <div>
          <button onClick={loadRequestProvider}>Connect to provider</button>
          <p> Connected to: {nodeInfo}</p>
          <h4>Create invoice</h4>
          <form onSubmit={handleInvoice}>
            <input
              type="number"
              onChange={e => setAmount(e.target.value)}
              value={amount}
              required
            />{' '}
            <br />
            <button>Create invoice</button>
          </form>
          <br />
          <button onClick={handlePayment}>Pay invoice</button>
          <br />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

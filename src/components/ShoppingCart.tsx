import { useEffect, useState } from 'react';

import { Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import { CartItem } from './CartItem';
import storeItems from '../data/items.json';
import { requestProvider } from 'webln';
// import React, { useState } from 'react';
import { LightningAddress, fiat } from 'alby-tools';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const [fiatValue, setFiatValue] = useState(0);
  const [satsValue, setSatsValue] = useState(0);

  async function prepareLNAddress() {
    const ln = new LightningAddress('jplaclau@getalby.com');
    await ln.fetch();
    console.log(ln.lnurlpData);
    console.log(ln.keysendData);
  }

  async function getAnInvoice() {
    const ln = new LightningAddress('jplaclau@getalby.com');
    await ln.fetch();
    // request an invoice for 1 satoshis
    // this returns a new `Invoice` class that can also be used to validate the payment
    const invoice = await ln.requestInvoice({ satoshi: 1 });
    console.log(invoice.paymentRequest); // print the payment request
    console.log(invoice.paymentHash); // print the payment hash
  }

  async function VerifyAPayment() {
    const ln = new LightningAddress('jplaclau@getalby.com');
    await ln.fetch();
    // request an invoice for 1 satoshis
    // this returns a new `Invoice` class that can also be used to validate the payment
    const invoice = await ln.requestInvoice({ satoshi: 1 });
    console.log(invoice.paymentRequest); // print the payment request
    console.log(invoice.paymentHash); // print the payment hash
    // if the LNURL providers supports LNURL-verify:
    const paid = await invoice.verifyPayment(); // returns true of false
    if (paid) {
      console.log(invoice.preimage);
    }
  }

  async function SatToUSD() {
    const usdvalue = await fiat.getFiatValue({
      satoshi: 1000,
      currency: 'usd',
    });
    console.log(usdvalue);
  }
  async function SatToUSDTotal() {
    const totalamount = cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(i => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    const usdvalueTotal = await fiat.getFiatValue({
      satoshi: totalamount,
      currency: 'usd',
    });
    console.log(usdvalueTotal);
  }

  async function setFiatValue2() {
    const totalamount2: number = cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(i => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    const fiatValue2: number = await fiat.getFiatValue({
      satoshi: totalamount2,
      currency: 'USD',
    });
    const fixed: number = Number(fiatValue2.toFixed(2));
    setFiatValue(fixed);
  }

  async function setSatsValue2() {
    const totalamount2 = cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(i => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
    setSatsValue(totalamount2);
  }

  useEffect(() => {
    setFiatValue2();
    setSatsValue2();
  });

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

  async function handleInvoice(event: any) {
    const webln = await requestProvider();
    event.preventDefault();
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
            Total: {satsValue} Satoshies.
            <br />
            <h6> ( ₿ {(satsValue * 0.000000001).toFixed(9)}BTC )</h6>
            <h6> In US dollars this is equal to ${fiatValue}USD</h6>
          </div>
        </Stack>
        <div>
          <br />
          (LN buy button will be here in the future, for now it is just testings
          buttons){' '}
        </div>
        <br />

        <div>
          <button onClick={prepareLNAddress}>prepareLN</button>
          <br />
          <br />
          <button onClick={getAnInvoice}>getAnInvoice</button>
          <br />
          <br />
          <button onClick={VerifyAPayment}>VerifyAPayment</button>
          <br />
          <br />
          <h4>1000 Sats to usd</h4>
          <button onClick={SatToUSD}>SatToUSD</button>
          <br />
          <button onClick={SatToUSDTotal}>SatToUSDTotal</button>
          <br />
          <button onClick={setFiatValue2}>setFiatValue2</button>
          <br />
          <div>
            Here are some standard webln functions from the webln guide: <br />
          </div>
          <button onClick={loadRequestProvider}>Connect to provider</button>
          <p> Connected to: {nodeInfo}</p>
          <h4>Create invoice</h4>
          <form onSubmit={handleInvoice}>
            <input
              type="number"
              onChange={e => setAmount(parseInt(e.target.value))}
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

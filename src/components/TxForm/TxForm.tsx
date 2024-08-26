import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const domainsForSale = [
  { domain: 'act.tg', price: '0.1', available: true, payload: 'te6cckEBAQEAGwAAMgAAAABCdXkgYWN0LnRnIE5GVEBQaWcudGcYNvBL' },
  { domain: 'aim.tg', price: '0.11', available: true, payload: 'te6cckEBAQEAGwAAMgAAAABCdXkgYWltLnRnIE5GVEBQaWcudGceHKoS' },
  // 更多域名...
  { domain: 'wit.tg', price: '1.0', available: true, payload: 'te6cckEBAQEAGwAAMgAAAABCdXkgd2l0LnRnIE5GVEBQaWcudGfEo0cK' }
];

const TxForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

  const handlePurchase = useCallback((domain: { domain: string; price: string; available: boolean; payload: string }) => {
    if (!wallet) {
      tonConnectUI.connectWallet();
      return;
    }

    setPurchasingDomain(domain.domain);

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{
        address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
        amount: domain.price,
        payload: domain.payload,
      }]
    };

    tonConnectUI.sendTransaction(transaction)
      .then(() => {
        alert(`Successfully purchased domain: ${domain.domain}`);
        setPurchasingDomain(null);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to purchase domain, please retry.');
        setPurchasingDomain(null);
      });
  }, [tonConnectUI, wallet]);

  return (
    <div className="tx-form container">
      <h2>Available Domains</h2>
      <div className="domain-grid">
        {domainsForSale.map((domain) => (
          <div className="domain-card" key={domain.domain}>
            <h3>{domain.domain}</h3>
            <p className="price">{domain.price} TON</p>
            <button
              className={`buy-button ${domain.available ? '' : 'sold'}`}
              onClick={() => handlePurchase(domain)}
              disabled={!domain.available || purchasingDomain === domain.domain}
            >
              {domain.available ? (purchasingDomain === domain.domain ? 'Processing...' : 'Buy') : 'Sold'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TxForm;

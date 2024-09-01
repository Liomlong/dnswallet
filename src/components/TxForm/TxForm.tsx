import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { domainsForSale, DomainForSale } from './domains_data';

const TxForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

  const handlePurchase = useCallback((domain: DomainForSale) => {
    if (!wallet) {
      tonConnectUI.connectWallet();
      return;
    }

    setPurchasingDomain(domain.domain);

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{
        address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
        amount: (domain.price * 1_000_000_000).toString(),  // Convert TON to nanoton
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
            <p className="price">
              {domain.price}  <img src="/ton_symbol.svg" alt="TON" className="ton-symbol"/>
            </p>
            <button
              className={`buy-button ${domain.status === 'Available' ? '' : 'sold'}`}
              onClick={() => handlePurchase(domain)}
              disabled={domain.status !== 'Available' || purchasingDomain === domain.domain}
            >
              {domain.status === 'Available' ? (purchasingDomain === domain.domain ? 'Processing...' : 'Buy') : 'Sold'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TxForm;

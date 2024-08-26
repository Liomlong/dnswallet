import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// 域名和状态列表，已包含全部域名
const domainsForSale = [
  { domain: 'ace.tg', price: '100000000', available: false },
  { domain: 'act.tg', price: '110000000', payload: 'WW91ciBjb21tZW50IGZvciBhY3QudGc=', available: true },
  { domain: 'add.tg', price: '120000000', payload: 'WW91ciBjb21tZW50IGZvciBhZGQudGc=', available: true },
  { domain: 'age.tg', price: '130000000', available: false },
  { domain: 'ail.tg', price: '140000000', available: false },
  { domain: 'aim.tg', price: '150000000', payload: 'WW91ciBjb21tZW50IGZvciBhaW0udGc=', available: true },
  { domain: 'air.tg', price: '160000000', available: false },
  { domain: 'ale.tg', price: '170000000', payload: 'WW91ciBjb21tZW50IGZvciBhbGUudGc=', available: true },
  { domain: 'all.tg', price: '180000000', available: false },
  { domain: 'alt.tg', price: '190000000', available: false },
  // 继续添加所有的域名和对应的属性
  { domain: 'wit.tg', price: '990000000', payload: 'WW91ciBjb21tZW50IGZvciB3aXQudGc=', available: true },
  { domain: 'zoo.tg', price: '1000000000', payload: 'WW91ciBjb21tZW50IGZvciB6b28udGc=', available: true }
];

const TxForm = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [purchasingDomain, setPurchasingDomain] = useState(null);

  const handlePurchase = useCallback((domain) => {
    if (!wallet) {
      tonConnectUI.connectWallet();
      return;
    }

    setPurchasingDomain(domain.domain);

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{
        address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
        amount: domain.price,
        payload: domain.payload,  // 确保 payload 已正确设置
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
            <p>{Number(domain.price) / 1e9} TON</p>
            <button
              className={`buy-button ${domain.available ? '' : 'sold'}`}
              onClick={() => handlePurchase(domain)}
              disabled={!domain.available}
            >
              {domain.available ? 'Buy' : 'Sold'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TxForm;

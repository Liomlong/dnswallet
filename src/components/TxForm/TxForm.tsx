import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const domainsForSale = [
  { domain: 'act.tg', price: '5000000', available: true },
  // 更多域名...
];

const TxForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet(); // 使用 Wallet 而不是 ExtendedWallet
  const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

  const handlePurchase = useCallback((domain: { domain: string; price: string, available: boolean }) => {
    if (!wallet || !wallet.user) {
      // 如果钱包未连接或用户信息不可用，弹出连接钱包窗口
      tonConnectUI.connectWallet();
      return;
    }

    setPurchasingDomain(domain.domain);

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{
        address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
        amount: domain.price,
        payload: '你的payload', // 确保正确处理 payload
      }]
    };

    tonConnectUI.sendTransaction(transaction)
      .then(() => {
        alert(`成功购买域名：${domain.domain}`);
        setPurchasingDomain(null);
      })
      .catch((error) => {
        console.error(error);
        alert('购买失败，请重试。');
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
            <p className="price">{Number(domain.price) / 1e9} TON</p>
            <button
              className={`buy-button ${domain.available ? '' : 'sold'}`}
              onClick={() => handlePurchase(domain)}
              disabled={!domain.available || purchasingDomain === domain.domain}
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

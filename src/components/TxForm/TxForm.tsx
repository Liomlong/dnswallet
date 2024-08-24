import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const domainsForSale = [
  { domain: 'act.tg', price: '5000000', available: true },
  { domain: 'add.tg', price: '5000000', available: false },
  // more domains...
];

const TxForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet() as ExtendedWallet; // 使用扩展的 Wallet 类型
  const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

  const handlePurchase = useCallback((domain: { domain: string; price: string, available: boolean }) => {
    if (!wallet || !wallet.user) {
      // 如果钱包未连接或用户信息不可用，弹出连接钱包窗口
      tonConnectUI.connectWallet();
      return;
    }

    setPurchasingDomain(domain.domain);

    // 这里使用 base64 编码 payload
    const encodedPayload = btoa(JSON.stringify({
      domain: domain.domain,
      price: domain.price,
      buyer: wallet.user.username,
    }));

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{
        address: '你的钱包地址',
        amount: domain.price,
        payload: encodedPayload, // 添加编码后的 payload
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

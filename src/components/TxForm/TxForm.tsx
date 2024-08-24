import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// 假设 Wallet 类型已经正确定义，并且包含 user 属性
interface Wallet {
  user: {
    username: string;
  };
}

const domainsForSale = [
  { domain: 'act.tg', price: '5000000', available: true },
  { domain: 'add.tg', price: '5000000', available: false },
  { domain: 'are.tg', price: '5000000', available: true },
  // 继续添加其他域名和价格...
];

const TxForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet() as Wallet; // 确保类型转换正确
  const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

  const handlePurchase = useCallback((domain: { domain: string; price: string, available: boolean }) => {
    if (!wallet) {
      // 如果钱包未连接，弹出连接钱包窗口
      tonConnectUI.connectWallet();
      return;
    }

    setPurchasingDomain(domain.domain);

    const payload = btoa(JSON.stringify({
      domain: domain.domain,
      price: domain.price,
      buyer: wallet.user.username, // 使用 Wallet 类型的 user 属性
    }));

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{
        address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm', // 你的钱包地址
        amount: domain.price,
        payload, // 发送含 payload 的交易
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
        {domainsForSale.map(domain => (
          <div className="domain-card" key={domain.domain}>
            <h3>{domain.domain}</h3>
            <p className="price">{Number(domain.price) / 1e9} TON</p>
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

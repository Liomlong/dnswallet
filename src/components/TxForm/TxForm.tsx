import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import btoa from 'btoa'; // 确保在客户端环境中使用或正确导入

interface Domain {
  domain: string;
  price: string;
  available: boolean;
}

const domainsForSale: Domain[] = [
    { domain: 'act.tg', price: '5000000', available: true },
    { domain: 'add.tg', price: '5000000', available: false },
    // 继续添加其他域名和价格...
];

const TxForm: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

    const handlePurchase = useCallback((domain: Domain) => {
        if (!wallet || !wallet.user) {
            tonConnectUI.connectWallet();
            return;
        }

        setPurchasingDomain(domain.domain);
        const payloadData = JSON.stringify({
            domain: domain.domain,
            price: domain.price,
            buyerUsername: wallet.user.username
        });
        const encodedPayload = btoa(payloadData);

        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [{
                address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
                amount: domain.price,
                payload: encodedPayload,
                stateInit: ''
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
                            {domain.available ? (purchasingDomain === domain.domain ? 'Processing...' : 'Buy') : 'Sold'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TxForm;

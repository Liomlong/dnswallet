import React, { useCallback, useState, useEffect } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// 域名和状态列表
const domainsForSale = [
    { domain: 'act.tg', price: '110000000', available: true },
    { domain: 'add.tg', price: '120000000', available: false },
    // 继续添加其他域名和价格...
];

const TxForm: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet(); // 获取当前连接的钱包状态
    const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

    const handlePurchase = useCallback((domain: { domain: string; price: string; available: boolean }) => {
        if (!wallet) {
            // 如果钱包未连接，弹出连接钱包窗口
            tonConnectUI.connectWallet();
            return;
        }

        setPurchasingDomain(domain.domain);

        const payload = btoa(`Purchase of ${domain.domain} for ${Number(domain.price) / 1e9} TON by ${wallet?.username}`);

        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [{
                address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
                amount: domain.price,
                payload, // 使用新构建的payload
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

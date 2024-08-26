import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// 定义域名销售的数组，包括域名、价格、可用性和特定的payload
const domainsForSale = [
    { domain: 'act.tg', price: '110000000', available: true, payload: 'WW91ciBjb21tZW50IGZvciBhY3QudGc=' },
    { domain: 'aim.tg', price: '120000000', available: true, payload: 'WW91ciBjb21tZW50IGZvciBhaW0udGc=' },
    { domain: 'ale.tg', price: '130000000', available: true, payload: 'WW91ciBjb21tZW50IGZvciBhbGUudGc=' },
    { domain: 'are.tg', price: '140000000', available: true, payload: 'WW91ciBjb21tZW50IGZvciBhcmUudGc=' },
    { domain: 'arm.tg', price: '150000000', available: true, payload: 'WW91ciBjb21tZW50IGZvciBhcm0udGc=' },
    // 继续添加其他域名和价格...
    { domain: 'wit.tg', price: '300000000', available: true, payload: 'WW91ciBjb21tZW50IGZvciB3aXQudGc=' },
];

const TxForm: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet(); // 获取当前连接的钱包状态
    const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

    const handlePurchase = useCallback((domain: { domain: string; price: string; available: boolean; payload: string }) => {
        if (!wallet) {
            // 如果钱包未连接，弹出连接钱包窗口
            tonConnectUI.connectWallet();
            return;
        }

        setPurchasingDomain(domain.domain);

        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600, // 交易有效期
            messages: [{
                address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm', // 接收地址
                amount: domain.price, // 金额
                payload: domain.payload, // 特定格式的payload
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

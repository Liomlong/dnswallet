import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// 域名和状态列表
const domainsForSale = [
    { domain: 'act.tg', available: true },
    { domain: 'add.tg', available: false },
    // 添加其他所有域名...
    { domain: 'zoo.tg', available: false },
];

const TxForm: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

    const handlePurchase = useCallback((domain: { domain: string, available: boolean }) => {
        if (!wallet) {
            tonConnectUI.connectWallet();
            return;
        }

        setPurchasingDomain(domain.domain);
        const price = "100000000"; // 0.1 TON expressed in smallest unit
        const payload = "te6ccsEBAQEADAAMABQAAAAASGVsbG8hCaTc/g=="; // 统一的 payload 内容

        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [{
                address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
                amount: price,
                payload,
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
                        <p className="price">0.1 TON</p>
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

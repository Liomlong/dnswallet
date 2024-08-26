import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// 域名和状态列表
const domainsForSale = [
  { domain: 'add.tg', price: '5000000', available: false },
  { domain: 'ape.tg', price: '5000000', available: false },
  { domain: 'are.tg', price: '5000000', available: true, payload: 'te6cckEBAQEAGwAAMgAAAABCdXkgYXJlLnRnIE5GVEBQaWcudGduCNKs' },
  { domain: 'arm.tg', price: '5000000', available: true, payload: 'te6cckEBAQEAGwAAMgAAAABCdXkgYXJtLnRnIE5GVEBQaWcudGd1e5Ge' },
  { domain: 'art.tg', price: '5000000', available: false },
  { domain: 'ask.tg', price: '5000000', available: false },
  { domain: 'bad.tg', price: '5000000', available: true, payload: 'te6cckEBAQEAGwAAMgAAAABCdXkgYmFkLnRnIE5GVEBQaWcudGfC2a8u' },
  { domain: 'bag.tg', price: '5000000', available: true, payload: 'te6cckEBAQEAGwAAMgAAAABCdXkgYmFnLnRnIE5GVEBQaWcudGfB3jyG' },
  { domain: 'bar.tg', price: '5000000', available: false },
  // 继续添加所有域名...
  { domain: 'you.tg', price: '5000000', available: false },
  { domain: 'zip.tg', price: '5000000', available: false },
  { domain: 'zoo.tg', price: '5000000', available: false }
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
                address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm', // 接收地址
                amount: domain.price,
                payload: domain.payload, // 使用对应域名的payload
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

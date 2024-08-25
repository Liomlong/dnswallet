import React, { useCallback, useState } from 'react';
import './style.scss';
import { beginCell } from '@ton/ton';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

// 创建 payload 的函数
function createPayload(message) {
  const body = beginCell()
    .storeUint(0, 32) // 写入32个零位，表示这是一个文本评论
    .storeStringTail(message) // 写入实际的文本评论
    .endCell();
  return body.toBoc().toString("base64");
}

// 域名和状态列表
const domainsForSale = [
    { domain: 'act.tg', price: '110000000', available: true },
    { domain: 'add.tg', price: '120000000', available: false },
    { domain: 'are.tg', price: '130000000', available: true },
    { domain: 'arm.tg', price: '140000000', available: true },
    { domain: 'ape.tg', price: '150000000', available: false },
    // 继续添加其他域名和价格...
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

        const payload = createPayload(`Purchase of ${domain.domain} for ${domain.price / 1e9} TON`);

        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [{
                address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
                amount: domain.price,
                payload: payload,
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

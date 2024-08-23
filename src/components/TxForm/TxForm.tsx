import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI } from "@tonconnect/ui-react";
import { FiShoppingCart } from 'react-icons/fi'; // 使用 react-icons 库中的购物车图标

// 域名和价格列表
const domainsForSale = [
    { domain: 'awesome-domain.tg', price: '5000000' },  // 0.005 TON
    { domain: 'mydomain.tg', price: '10000000' },       // 0.01 TON
    { domain: 'bestname.tg', price: '15000000' },       // 0.015 TON
    // 添加更多域名
];

const TxForm: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

    const handlePurchase = useCallback((domain: { domain: string; price: string }) => {
        setPurchasingDomain(domain.domain);
        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [
                {
                    address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm', // 接收支付的地址
                    amount: domain.price,
                    stateInit: '' // 如果需要，可以添加 stateInit
                }
            ]
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
    }, [tonConnectUI]);

    return (
        <div className="tx-form container">
            <h2>可购买的域名</h2>
            <div className="domain-grid">
                {domainsForSale.map((domain) => (
                    <div className="domain-card" key={domain.domain}>
                        <h3>{domain.domain}</h3>
                        <p className="price">{Number(domain.price) / 1e9} TON</p>
                        <button
                            className="buy-button"
                            onClick={() => handlePurchase(domain)}
                            disabled={purchasingDomain === domain.domain}
                        >
                            {purchasingDomain === domain.domain ? '处理中...' : '购买'}
                            <FiShoppingCart style={{ marginLeft: '8px' }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TxForm;

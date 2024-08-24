import React, { useCallback, useState, useContext } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet, WebAppContext } from "@tonconnect/ui-react";

// 域名和状态列表
const domainsForSale = [
    { domain: 'act.tg', price: '5000000', available: true },
    { domain: 'add.tg', price: '5000000', available: false },
    { domain: 'are.tg', price: '5000000', available: true },
    { domain: 'arm.tg', price: '5000000', available: true },
    { domain: 'ape.tg', price: '5000000', available: false },
    // 继续添加其他域名和价格...
];

const TxForm: React.FC = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet(); // 获取当前连接的钱包状态
    const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);
    const webAppContext = useContext(WebAppContext); // 从 Ton WebApp API 获取用户上下文

    const handlePurchase = useCallback((domain: { domain: string; price: string, available: boolean }) => {
        if (!wallet) {
            // 如果钱包未连接，弹出连接钱包窗口
            tonConnectUI.connectWallet();
            return;
        }

        setPurchasingDomain(domain.domain);

        const payload = `${domain.domain};${domain.price};${webAppContext.user.username}`; // 创建包含域名，价格和用户名的payload
        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 600,
            messages: [
                {
                    address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm', // 你的钱包地址
                    amount: domain.price,
                    payload, // 将payload添加到交易信息中
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
    }, [tonConnectUI, wallet, webAppContext.user.username]); // 添加依赖于用户名的更新

    return (
        <div className="tx-form container">
            <h2>Available Domains</h2>
            <div className="domain-grid">
                {domainsForSale.map((domain) => (
                    <div className="domain-card" key={domain.domain}>
                        <h3>{domain.domain}</h3>
                        <p className="price">
                            {Number(domain.price) / 1e9} TON
                            <img src="https://www.pig.tg/ton_symbol.svg" alt="TON" className="ton-symbol" />
                        </p>
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

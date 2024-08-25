import React, { useCallback, useState } from 'react';
import './style.scss';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import TonWeb from 'tonweb';

// ... (保持现有的 domainsForSale 数组不变)

const generateTonPayload = async (message: string): Promise<string> => {
  const cell = new TonWeb.boc.Cell();
  cell.bits.writeUint(0, 32);
  cell.bits.writeString(message);
  const bocBytes = await cell.toBoc();
  return TonWeb.utils.bytesToBase64(bocBytes);
};

const TxForm: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [purchasingDomain, setPurchasingDomain] = useState<string | null>(null);

  const handlePurchase = useCallback(async (domain: { domain: string, available: boolean }) => {
    if (!wallet) {
      tonConnectUI.connectWallet();
      return;
    }

    setPurchasingDomain(domain.domain);
    const price = "100000000"; // 0.1 TON expressed in smallest unit
    const payload = await generateTonPayload(`Purchase ${domain.domain}`);

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [{
        address: 'EQAA5oqBWLaH2Wo1sDLC6tuTe4Ro7Mg3c1yw7tf5r-Pcbgfm',
        amount: price,
        payload,
      }]
    };

    try {
      await tonConnectUI.sendTransaction(transaction);
      alert(`Successfully purchased domain: ${domain.domain}`);
    } catch (error) {
      console.error(error);
      alert('Failed to purchase domain, please retry.');
    } finally {
      setPurchasingDomain(null);
    }
  }, [tonConnectUI, wallet]);

  // ... (保持现有的 return 语句不变)
};

export default TxForm;
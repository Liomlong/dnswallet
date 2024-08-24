
import React, { useEffect, useState } from 'react';
import './App.scss';
import './trackers';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import TxForm from "./components/TxForm/TxForm";

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // 检查是否在 Telegram 小程序环境中运行
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        setUsername(tg.initDataUnsafe.user.username || '');
      }
    } else {
      console.warn("Not running inside Telegram WebApp");
    }
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl="https://www.pig.tg/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          // Wallet configurations...
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/tc_twa_demo_bot/start'
      }}
    >
      <div className="app">
        <Header title={`@${username || 'Guest'}：Pig.tg Ton DNS`} />
        <TxForm />
        <Footer />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;

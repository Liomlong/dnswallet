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
      console.log('Telegram WebApp:', tg); // 调试信息：输出 Telegram WebApp 对象
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const fetchedUsername = tg.initDataUnsafe.user.username || 'Guest';
        console.log('Fetched Username:', fetchedUsername); // 调试信息：输出获取到的用户名
        setUsername(fetchedUsername);
      } else {
        console.warn("User data is unavailable in Telegram WebApp");
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

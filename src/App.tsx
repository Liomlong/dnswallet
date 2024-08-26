import React, { useEffect, useState } from 'react';
import './App.scss';
import './trackers';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import TxForm from "./components/TxForm/TxForm";

function App() {
  const [username, setUsername] = useState('Guest'); // 默认用户为 'Guest'

  useEffect(() => {
    // 检查是否在 Telegram WebApp 环境中运行
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      console.log('Running inside Telegram WebApp:', tg); // 确认正在 Telegram 环境中运行

      // 检查 initDataUnsafe 是否存在，并尝试获取用户信息
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        console.log('initDataUnsafe:', tg.initDataUnsafe); // 输出未加密的初始化数据
        if (tg.initDataUnsafe.user.username) {
          const fetchedUsername = tg.initDataUnsafe.user.username;
          console.log('Fetched Username:', fetchedUsername); // 输出获取到的用户名
          setUsername(fetchedUsername);
        } else {
          console.warn("Username is not available."); // 用户名不可用时的警告
        }
      } else {
        console.warn("initDataUnsafe or user object is unavailable."); // initDataUnsafe 或用户对象不可用时的警告
      }
    } else {
      console.warn("Not running inside Telegram WebApp."); // 不在 Telegram 环境中运行时的警告
    }
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl="https://www.pig.tg/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      walletsListConfiguration={{
        includeWallets: [
          // 钱包配置信息，根据需要填充
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/pigtgbot/start' // 设置返回 URL
      }}
    >
      <div className="app">
        <Header title={`Pig.tg Ton DNS`} />
        <TxForm />
        <Footer />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
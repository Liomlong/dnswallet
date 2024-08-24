import React, { useEffect, useState } from 'react';
import './App.scss';
import './trackers';
import { THEME, TonConnectUIProvider } from "@tonconnect/ui-react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import TxForm from "./components/TxForm/TxForm";

function App() {
  const [username, setUsername] = useState('Guest'); // 默认值为 'Guest'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Window Object:', window); // 输出整个 window 对象

      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        console.log('Telegram WebApp:', tg);

        if (tg.initDataUnsafe) {
          console.log('initDataUnsafe:', tg.initDataUnsafe);

          if (tg.initDataUnsafe.user) {
            const fetchedUsername = tg.initDataUnsafe.user.username || 'Guest';
            console.log('Fetched Username:', fetchedUsername);
            setUsername(fetchedUsername);
          } else {
            console.warn("User object is unavailable in initDataUnsafe.");
          }
        } else {
          console.warn("initDataUnsafe is unavailable.");
        }
      } else {
        console.warn("Not running inside Telegram WebApp.");
      }
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
        <Header title={`@${username}：Pig.tg Ton DNS`} />
        <TxForm />
        <Footer />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;

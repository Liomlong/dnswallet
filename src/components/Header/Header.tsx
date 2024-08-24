import React from 'react';
import { TonConnectButton } from "@tonconnect/ui-react";
import './header.scss';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <span>{title}</span>
      <TonConnectButton />
    </header>
  );
}

export default Header;

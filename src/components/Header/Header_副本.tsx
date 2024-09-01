import React, { useState } from 'react';
import { TonConnectButton } from "@tonconnect/ui-react";
import './header.scss';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showMyDomainsModal, setShowMyDomainsModal] = useState(false);

  const handleMyDomainsClick = () => {
    setShowMyDomainsModal(true);
  };

  const handleAboutClick = () => {
    setShowAboutModal(true);
  };

  const closeModal = () => {
    setShowAboutModal(false);
    setShowMyDomainsModal(false);
  };

  return (
    <header>
      <div className="title">{title}</div>
      <div className="buttons">
        <button className="button" onClick={handleMyDomainsClick}>
          My domains
        </button>
        <button className="button" onClick={handleAboutClick}>
          About
        </button>
        <TonConnectButton />
      </div>
      {showAboutModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>About Pig.tg Ton DNS</h2>
            <div className="modal-body">
              <p>Pig.tg is a Web3 innovation that transforms traditional .tg domains into unique NFTs on the TON blockchain.</p>
              <h3>Key Features:</h3>
              <ul>
                <li>Purchase premium .tg domains via our Telegram mini-app</li>
                <li>Receive a corresponding NFT as proof of ownership</li>
                <li>Manage domains through the "my domains" feature</li>
                <li>Set up DNS, redirect to social media, and transfer ownership</li>
                <li>24-hour review period to ensure domain availability</li>
              </ul>
              <p>NFT issuance follows the review period.</p>
              <p>For support, contact us via <a href="https://t.me/pigtgbot" target="_blank" rel="noopener noreferrer">https://t.me/pigtgbot</a></p>
            </div>
          </div>
        </div>
      )}
      {showMyDomainsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>My Domains</h2>
            <div className="modal-body">
              <p>You have no domains yet.</p>
              <p>If you have purchased a domain, please wait patiently as we will add it to your list within 24 hours.</p>
              <h3>What to expect:</h3>
              <ul>
                <li>Domain verification process (up to 24 hours)</li>
                <li>NFT issuance upon successful verification</li>
                <li>Access to domain management tools</li>
              </ul>
              <p>For any questions, please contact our support team.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
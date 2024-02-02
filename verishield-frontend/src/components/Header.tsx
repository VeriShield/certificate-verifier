// components/Header.js
// import Link from "next/link";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Network } from "../Network";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleDisconnectWallet = () => {
    setIsWalletConnected(false);
  };

  return (
    <header className="py-6 w-full mb-8">
      <nav className="container w-[80%] mx-auto flex justify-between items-center gap-8">
        <Link to="/" className="text-white font-bold text-lg">
          VeriShield
        </Link>
        <Link
          onClick={handleConnectWallet}
          to="/visit"
          className="text-white font-bold text-lg"
        >
          <Network
            onConnectWallet={handleConnectWallet}
            onDisconnectWallet={handleDisconnectWallet}
            isConnected={isWalletConnected}
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;

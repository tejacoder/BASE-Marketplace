import React from 'react';
import { CartIcon, WalletIcon, ChevronDownIcon } from './icons';

interface FarcasterProfile {
  username: string;
  pfpUrl: string;
}

interface HeaderProps {
  cartItemCount: number;
  onToggleCart: () => void;
  walletAddress: string | null;
  farcasterProfile: FarcasterProfile | null;
  onConnectWallet: () => void;
  onDisconnect: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onToggleCart, walletAddress, farcasterProfile, onConnectWallet, onDisconnect }) => {
  return (
    <header className="sticky top-0 z-30 bg-base-dark/80 backdrop-blur-lg border-b border-base-gray/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-base-blue to-base-accent">
              Base Marketplace
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleCart}
              className="relative p-2 rounded-full text-base-light hover:bg-base-gray/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-dark focus:ring-white transition-colors"
            >
              <CartIcon className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {walletAddress ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg transition-colors">
                  {farcasterProfile ? (
                    <>
                      <img src={farcasterProfile.pfpUrl} alt="Farcaster PFP" className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-medium">{farcasterProfile.username}</span>
                    </>
                  ) : (
                    <>
                       <WalletIcon className="w-5 h-5 text-base-accent" />
                       <span className="text-sm font-mono">{`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}</span>
                    </>
                  )}
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-40">
                   <button onClick={onDisconnect} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 rounded-md">Disconnect</button>
                </div>
              </div>
            ) : (
              <button
                onClick={onConnectWallet}
                className="px-4 py-2 bg-base-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
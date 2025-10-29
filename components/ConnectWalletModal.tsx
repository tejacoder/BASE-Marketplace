import React from 'react';
import { CloseIcon, CoinbaseIcon, FarcasterIcon } from './icons';

type WalletType = 'coinbase' | 'farcaster';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: WalletType) => void;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  if (!isOpen) return null;

  const handleConnect = (walletType: WalletType) => {
      if (!window.ethereum) {
          alert("No Ethereum browser wallet detected. Please install the Coinbase Wallet extension.");
          window.open("https://www.coinbase.com/wallet/downloads", "_blank");
          return;
      }
      onConnect(walletType);
  }

  return (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-wallet-title"
    >
      <div 
        className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-xs m-4 relative" 
        onClick={e => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-700"
            aria-label="Close connection modal"
        >
          <CloseIcon className="w-6 h-6 text-gray-400" />
        </button>

        <div className="p-6">
          <h2 id="connect-wallet-title" className="text-2xl font-bold text-center mb-6 text-white">Connect Wallet</h2>
          <div className="space-y-3">
            <button 
                onClick={() => handleConnect('farcaster')} 
                className="w-full flex items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-base-blue"
            >
              <FarcasterIcon className="w-8 h-8 mr-4 text-purple-400" />
              <div className="text-left">
                <p className="font-semibold text-lg text-white leading-tight">Farcaster</p>
                <p className="text-xs text-gray-400 leading-tight">Sign in with wallet</p>
              </div>
            </button>
            <button 
                onClick={() => handleConnect('coinbase')} 
                className="w-full flex items-center p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-base-blue"
            >
              <CoinbaseIcon className="w-8 h-8 mr-4 text-blue-500" />
              <span className="font-semibold text-lg text-white">Coinbase Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
import React, { useState, useMemo } from 'react';
import { Product, CartItem } from './types';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import ConnectWalletModal from './components/ConnectWalletModal';
import { ethers } from 'ethers';

interface FarcasterProfile {
  username: string;
  pfpUrl: string;
}

declare global {
    interface Window {
        ethereum?: any;
    }
}

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [farcasterProfile, setFarcasterProfile] = useState<FarcasterProfile | null>(null);

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
      if (newQuantity <= 0) {
          handleRemoveItem(productId);
          return;
      }
      setCartItems(prevItems => prevItems.map(item => 
        item.product.id === productId ? {...item, quantity: newQuantity} : item
      ));
  };

  const handleRemoveItem = (productId: number) => {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };
  
  const handleCheckout = () => {
    if (!walletAddress) {
        setIsConnectModalOpen(true);
        return;
    }
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const handlePurchaseComplete = () => {
    setCartItems([]);
    // The modal will handle its own closing after this is called
  };

  const handleConnect = async (walletType: 'coinbase' | 'farcaster') => {
    if (!window.ethereum) {
      alert("Browser wallet not found. Please install a wallet like Coinbase Wallet.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        const address = accounts[0];
        setWalletAddress(address);
        if (walletType === 'farcaster') {
          // Simulate fetching a Farcaster profile based on the wallet address
          setFarcasterProfile({
            username: `user-${address.slice(2, 8)}`,
            pfpUrl: `https://i.pravatar.cc/150?u=${address}`,
          });
        }
      }
      setIsConnectModalOpen(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Check the console for more details.");
    }
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
    setFarcasterProfile(null);
  };

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotals = useMemo(() => {
    const totalETH = cartItems.reduce((sum, item) => sum + item.product.priceETH * item.quantity, 0);
    const totalUSD = cartItems.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
    return { totalETH, totalUSD };
  }, [cartItems]);


  return (
    <div className="min-h-screen bg-base-dark font-sans">
      <Header
        walletAddress={walletAddress}
        farcasterProfile={farcasterProfile}
        cartItemCount={cartItemCount}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        onConnectWallet={() => setIsConnectModalOpen(true)}
        onDisconnect={handleDisconnect}
      />
      <main>
        <ProductList onAddToCart={handleAddToCart} />
      </main>
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        walletAddress={walletAddress}
      />
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onPurchaseComplete={handlePurchaseComplete}
        totalETH={cartTotals.totalETH}
        totalUSD={cartTotals.totalUSD}
      />
      <ConnectWalletModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onConnect={handleConnect}
      />
    </div>
  );
};

export default App;
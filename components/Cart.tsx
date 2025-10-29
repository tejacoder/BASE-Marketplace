
import React from 'react';
import { CartItem } from '../types';
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon } from './icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
  walletAddress: string | null;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout, walletAddress }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalETH = cartItems.reduce((sum, item) => sum + item.product.priceETH * item.quantity, 0);
  const totalUSD = cartItems.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  
  const handleCheckout = () => {
    if(walletAddress) {
        onCheckout();
    } else {
        alert("Please connect your wallet to proceed to checkout.");
    }
  }

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Your Cart ({totalItems})</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700">
            <CloseIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-400">
            <p className="text-lg">Your cart is empty.</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-base-blue text-white rounded-lg">
                Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-slate-800 p-2 rounded-lg">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-grow">
                    <p className="font-semibold text-white">{item.product.name}</p>
                    <p className="text-sm text-base-accent">{item.product.priceETH} ETH</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600"><MinusIcon className="w-4 h-4" /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-full bg-slate-700 hover:bg-slate-600"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => onRemoveItem(item.product.id)} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-500/10"><TrashIcon className="w-5 h-5"/></button>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-700 space-y-4">
                <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{totalETH.toFixed(4)} ETH</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>${totalUSD.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={!walletAddress}
                  className="w-full py-3 bg-base-blue text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-base-gray disabled:cursor-not-allowed transition-colors"
                >
                  {walletAddress ? "Proceed to Checkout" : "Connect Wallet to Checkout"}
                </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

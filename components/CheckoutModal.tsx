
import React, { useState, useEffect } from 'react';
import { CloseIcon, SpinnerIcon, CheckCircleIcon } from './icons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchaseComplete: () => void;
  totalETH: number;
  totalUSD: number;
}

type CheckoutStep = 'initial' | 'approving' | 'approved' | 'confirming' | 'complete';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onPurchaseComplete, totalETH, totalUSD }) => {
  const [step, setStep] = useState<CheckoutStep>('initial');

  useEffect(() => {
    if (isOpen) {
      setStep('initial');
    }
  }, [isOpen]);

  const handleApprove = () => {
    setStep('approving');
    setTimeout(() => {
      setStep('approved');
    }, 2000); // Simulate approval delay
  };

  const handleConfirm = () => {
    setStep('confirming');
    setTimeout(() => {
      setStep('complete');
      onPurchaseComplete();
    }, 3000); // Simulate confirmation delay
  };

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (step) {
      case 'initial':
      case 'approved':
        return (
          <>
            <button
              onClick={handleApprove}
              disabled={step === 'approved'}
              className="w-full flex items-center justify-center py-3 mb-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 disabled:bg-green-600 disabled:cursor-not-allowed transition-colors"
            >
              {step === 'approved' ? (
                <>
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  1. Spend Approved
                </>
              ) : (
                '1. Approve USDC Spend'
              )}
            </button>
            <button
              onClick={handleConfirm}
              disabled={step !== 'approved'}
              className="w-full py-3 bg-base-blue text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-base-gray disabled:cursor-not-allowed transition-colors"
            >
              2. Confirm Purchase
            </button>
          </>
        );
      case 'approving':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <SpinnerIcon className="w-12 h-12 text-base-accent mb-4" />
            <h3 className="text-xl font-bold">Waiting for Approval</h3>
            <p className="text-gray-400 mt-2">Please approve the transaction in your wallet.</p>
          </div>
        );
      case 'confirming':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <SpinnerIcon className="w-12 h-12 text-base-blue mb-4" />
            <h3 className="text-xl font-bold">Submitting Transaction</h3>
            <p className="text-gray-400 mt-2">Confirm the purchase in your wallet to complete the transaction.</p>
          </div>
        );
      case 'complete':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold">Purchase Complete!</h3>
            <p className="text-gray-400 mt-2">Your digital assets have been transferred to your wallet.</p>
            <button onClick={onClose} className="mt-6 w-full py-3 bg-base-blue text-white font-bold rounded-lg hover:bg-blue-600">
              Close
            </button>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-md m-4 relative">
        <button onClick={onClose} disabled={step === 'confirming' || step === 'approving'} className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-700 disabled:opacity-50">
          <CloseIcon className="w-6 h-6 text-gray-400" />
        </button>

        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-2">Checkout</h2>
            {step !== 'complete' && (
                <div className="text-center bg-slate-900 p-4 rounded-lg mb-6">
                    <p className="text-gray-400">Total Due</p>
                    <p className="text-3xl font-bold text-white mt-1">{totalETH.toFixed(4)} ETH</p>
                    <p className="text-sm text-gray-500">${totalUSD.toFixed(2)}</p>
                </div>
            )}
            
            <div className="mt-4">
              {renderStepContent()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;

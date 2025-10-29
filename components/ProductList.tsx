
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Genesis Farcaster Frame Kit',
    description: 'A complete toolkit for building engaging Farcaster Frames. Includes templates and developer guides.',
    priceETH: 0.1,
    priceUSD: 330.00,
    imageUrl: 'https://picsum.photos/seed/framekit/600/400',
    sellerAddress: '0xFrame...Dev',
  },
  {
    id: 2,
    name: 'Based Degen PFP Collection',
    description: 'A limited edition PFP celebrating the Base builder community. 1 of 1000.',
    priceETH: 0.05,
    priceUSD: 165.00,
    imageUrl: 'https://picsum.photos/seed/degenpfp/600/400',
    sellerAddress: '0xArt...Based',
  },
  {
    id: 3,
    name: 'Onchain Summer 2024 VIP Pass',
    description: 'Exclusive access to all Onchain Summer events, private channels, and merch drops.',
    priceETH: 0.25,
    priceUSD: 825.00,
    imageUrl: 'https://picsum.photos/seed/summerpass/600/400',
    sellerAddress: '0xBase...Events',
  },
  {
    id: 4,
    name: 'DeSo Analytics Subscription (1 Year)',
    description: 'Unlock premium analytics for the decentralized social ecosystem. Track trends and top casters.',
    priceETH: 0.3,
    priceUSD: 990.00,
    imageUrl: 'https://picsum.photos/seed/analytics/600/400',
    sellerAddress: '0xData...Nerd',
  },
   {
    id: 5,
    name: 'Smart Wallet Dev Course',
    description: 'Learn to build and deploy next-gen smart contract wallets on Base. For intermediate developers.',
    priceETH: 0.4,
    priceUSD: 1320.00,
    imageUrl: 'https://picsum.photos/seed/devcourse/600/400',
    sellerAddress: '0xEdu...Chain',
  },
  {
    id: 6,
    name: 'Collectible "I DEGEN" Physical Pin',
    description: 'A token-gated physical collectible for true onchain degens. Shipped worldwide.',
    priceETH: 0.08,
    priceUSD: 264.00,
    imageUrl: 'https://picsum.photos/seed/degenpin/600/400',
    sellerAddress: '0xMerch...DAO',
  },
];


interface ProductListProps {
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">Farcaster & Base Goods</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
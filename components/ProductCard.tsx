
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-base-blue/50 transition-shadow duration-300 group flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-base-light">{product.name}</h3>
        <p className="text-sm text-gray-400 mt-1 flex-grow">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-xl font-semibold text-base-accent">{product.priceETH} ETH</p>
            <p className="text-xs text-gray-500">${product.priceUSD.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-base-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

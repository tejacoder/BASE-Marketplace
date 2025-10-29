
export interface Product {
  id: number;
  name: string;
  description: string;
  priceETH: number;
  priceUSD: number;
  imageUrl: string;
  sellerAddress: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

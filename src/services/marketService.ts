import { API_CONFIG } from '../config/api';
import { MarketPrice } from '../types';

export const fetchMarketPrices = async (state: string): Promise<MarketPrice[]> => {
  const url = `${API_CONFIG.MARKET_API.baseUrl}/prices?state=${encodeURIComponent(state)}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_CONFIG.MARKET_API.key}`
    }
  });
  
  if (!response.ok) throw new Error('Market prices fetch failed');
  
  const data = await response.json();
  return data.map((item: any) => ({
    crop: item.commodity,
    price: item.modal_price,
    market: item.market,
    date: item.arrival_date
  }));
};
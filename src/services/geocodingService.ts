import { API_CONFIG } from '../config/api';
import { Location } from '../types';

export const getLocationDetails = async (lat: number, lon: number): Promise<Partial<Location>> => {
  const url = `${API_CONFIG.GEOCODING_API.baseUrl}/json?latlng=${lat},${lon}&key=${API_CONFIG.GEOCODING_API.key}`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Geocoding fetch failed');
  
  const data = await response.json();
  
  // Extract district and state from address components
  const addressComponents = data.results[0]?.address_components || [];
  const district = addressComponents.find(c => c.types.includes('administrative_area_level_2'))?.long_name;
  const state = addressComponents.find(c => c.types.includes('administrative_area_level_1'))?.long_name;
  
  return { district, state };
};
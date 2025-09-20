'use client';

export function useArroKey() {
  const get = () => 
    typeof window !== 'undefined' ? localStorage.getItem('arro_api_key') || '' : '';
  
  const set = (key: string) => 
    typeof window !== 'undefined' ? localStorage.setItem('arro_api_key', key) : undefined;
  
  const clear = () => 
    typeof window !== 'undefined' ? localStorage.removeItem('arro_api_key') : undefined;
  
  return { get, set, clear };
}

import { useEffect, useState } from 'react';
import { getCache, setCache } from '../../shared/utils/cache';

export default function useFetch(url: string, params: any) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = `${url}?${JSON.stringify(params)}`;

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const cached = getCache<any>(cacheKey);
    if (cached) {
      setData(cached);
      setIsLoading(false);
      return;
    }

    const abortController = new AbortController();

    const queryString = new URLSearchParams(params).toString();
    const finalUrl = queryString ? `${url}?${queryString}` : url;
    fetch(finalUrl, {
      headers: {
        'X-API-KEY': import.meta.env.VITE_TOKEN,
      },
      signal: abortController.signal,
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setError(null);
        setCache(cacheKey, data);
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          setError(error.message);
          console.error('Fetch error:', error);
        }
      })
      .finally(() => setIsLoading(false));
    return () => {
      abortController.abort();
    };
  }, [url, cacheKey]);
  return { data, isLoading, error };
}

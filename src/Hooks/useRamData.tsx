// src/hooks/useFetchRamData.tsx
import { useState, useEffect } from 'react';
import { SystemData } from '../types/types';
import axios from 'axios';

const useFetchSystemData = (url= 'http://127.0.0.1:3000/livedata', interval = 1000) => {
  const [data, setData] = useState<SystemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError('Error al intentar obtener la información');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, interval); // Fetch data every 'interval' milliseconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [url, interval]);

  return { data, loading, error };
};

export default useFetchSystemData;
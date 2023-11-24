// useMenuScroll.js
import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useMenuScroll = () => {
  const axiosPublic = useAxiosPublic();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const perWindow = 6;

  const loadItems = async () => {
    setLoading(true);
    try {
      const result = await axiosPublic.get(`menu/scroll?page=${items.length}&perWindow=${perWindow}`);
      
      const newData = result.data;
      setItems((prevItems) => [...prevItems, ...newData]);

      if (newData.length < perWindow) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      loadItems();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return { items, loading, hasMore };
};

export default useMenuScroll;

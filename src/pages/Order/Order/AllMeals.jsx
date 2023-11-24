import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import LoaderAnimations from '../../Shared/Loader/LoaderAnmations';

const AllMeals = () => {
  const axiosPublic = useAxiosPublic();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const perWindow = 6;

  const fetchMoreItems = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
        
      const result = await axiosPublic.get(`/menu/scroll?page=${page}&perWindow=${perWindow}`);
      const newData = result.data.items;

      if (newData.length === 0) {
        setHasMore(false); // Set hasMore to false to prevent further requests
     
      } else {
        setMenu((prevMenu) => [...prevMenu, ...newData]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleScroll = () => {
        if (
            window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100 &&
            !loading &&
            hasMore
          ) {
            // Trigger fetching more items
            fetchMoreItems();
          }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasMore,page]);

  return (
    <div>
      {menu.map((menuItem, idx) => (
        <div className='meal' key={idx}>
          <p className='min-h-screen'>{idx}{menuItem.title}</p>
          {/* Render other meal details as needed */}
        </div>
      ))}
      {loading && <LoaderAnimations></LoaderAnimations>}
      {!loading && !hasMore && <p>You have seen it all</p>}
    </div>
  );
};

export default AllMeals;



// export default AllMeals;
// import  { useState, useEffect } from 'react';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import LoaderAnimations from '../../Shared/Loader/LoaderAnmations';
// import { NavLink } from 'react-router-dom';
// import { FaSearch } from "react-icons/fa";
// const AllMeals = () => {
//   const axiosPublic = useAxiosPublic();
//   const [menu, setMenu] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const perWindow = 6;

//   const fetchMoreItems = async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     try {
//       const result = await axiosPublic.get(`/menu/scroll?page=${page}&perWindow=${perWindow}`);
//       const newData = result.data.items;

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         setMenu((prevMenu) => [...prevMenu, ...newData]);
//         setPage(page + 1);
//       }
//     } catch (error) {
//       console.error('Error fetching more data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMoreItems();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100 &&
//         !loading &&
//         hasMore
//       ) {
//         fetchMoreItems();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loading, hasMore, page]);

//   useEffect(() => {
//     if (!hasMore) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       setMenu([]);
//       setPage(1);
//       setHasMore(true);
//     }
//   }, [hasMore]);

//   return (
//     <div>
//           <div className='fixed top-24 z-10 left-1/2 transform -translate-x-1/2 text-center w-1/3'>
//                 <div className='border-2 border-sky-500 bg-white rounded-full p-2 flex justify-center items-center'>
//                     <input className='w-full bg-white bg-transparent outline-none pl-4 pr-12' type="search" placeholder='Search' />
//                     <div className='absolute right-2'>
//                         <FaSearch /> {/* Replace with your actual search icon component */}
//                     </div>
//                 </div>
//             </div>
//         <div className='grid my-24 md:grid-cols-2 lg:grid-cols-3'>
//       {menu.map((menuItem, idx) => (
//         <div className='meal' key={idx}>
//           <div className="card w-96 bg-base-100 shadow-xl">
//             <figure><img src={menuItem?.image} alt="Shoes" /></figure>
//             <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${menuItem?.price}</p>
//             <div className="card-body flex flex-col items-center">
//               <h2 className="card-title">{menuItem?.title}</h2>
//               <p>{menuItem?.ingredients}</p>
//               <div className="card-actions justify-end">
//                 <NavLink to={`menudetails/${menuItem?._id}`}>
//                   <button className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Details</button>
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
      
//       {!loading && !hasMore && <p>You have seen it all</p>}
//     </div>
//     <div>{loading && <LoaderAnimations />}</div>
//     </div>
//   );
// };

// export default AllMeals;

import { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import LoaderAnimations from '../../Shared/Loader/LoaderAnmations';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const AllMeals = () => {
  const axiosPublic = useAxiosPublic();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const perWindow = 3;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');


  const [searchQuery, setSearchQuery] = useState('');

  const fetchMoreItems = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await axiosPublic.get(`/menu/scroll?page=${page}&perWindow=${perWindow}`);
      const newData = result.data.items;

      if (newData.length === 0) {
        setHasMore(false);
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
        fetchMoreItems();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasMore, page]);

  useEffect(() => {
    if (!hasMore) {
      
      
      setHasMore(false);
    }
  }, [hasMore]);

  const categoryOptions = ['All', 'Lunch', 'Breakfast', 'Dinner'];
  const priceRangeOptions = ['All', '1-50', '51-150', '151 or more'];

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handlePriceRangeChange = (selectedPriceRange) => {
    setPriceRange(selectedPriceRange);
  };

  const filteredItems = () => {
    return menu.filter((menuItem) => {
      // Filter by selected category
      if (selectedCategory !== 'All' && menuItem?.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
  
      // Filter by price range
      if (priceRange !== 'All') {
        const [minPrice, maxPrice] = priceRange.split('-').map((val) => {
          if (val.includes('or more')) {
            return parseInt(val); // Consider the first part as the minimum price
          } else {
            return parseInt(val); // For other ranges, consider both min and max
          }
        });
  
        const itemPrice = Number(menuItem.price);
  
        if (maxPrice === 'more') {
          // Consider the price as greater than or equal to minPrice
          if (itemPrice < minPrice) {
            return false;
          }
        } else {
          // Consider the price within the specified range
          if (itemPrice < minPrice || itemPrice > maxPrice) {
            return false;
          }
        }
      }

      if (searchQuery && !menuItem.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
  
      // Return true for items that pass all filters
      return true;
    });
  };

  const displayedItems = filteredItems();

  return (
    <div>
         <Helmet>
                <title>Hotel Meal | All Meals</title>
            </Helmet>
      {/* Dropdowns for filtering */}
      <div className='flex justify-center my-4 gap-8'>
      <div className='text-center w-48'>
                <div className=' border-2 border-sky-500 bg-white rounded-full p-2 flex justify-center items-center'>
                    <input className='w-full bg-white bg-transparent outline-none pl-4 pr-12' type="search" placeholder='Search'
                    
                    value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
                    
                    />
                    <div className=''>
                       <FaSearch /> {/* Replace with your actual search icon component */}
                    </div>
                </div>
            </div>
        <div className='mr-4'>
          <label htmlFor='categoryFilter' className='mr-2'>
            Filter by Category:
          </label>
          <select
            id='categoryFilter'
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categoryOptions.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='priceRangeFilter' className='mr-2'>
            Filter by Price Range:
          </label>
          <select
            id='priceRangeFilter'
            value={priceRange}
            onChange={(e) => handlePriceRangeChange(e.target.value)}
          >
            {priceRangeOptions.map((range, idx) => (
              <option key={idx} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display filtered items */}
      <div className='grid my-24 md:grid-cols-2 gap-12 justify-center items-center lg:grid-cols-3'>
        {displayedItems.map((menuItem, idx) => (
          <div className='meal' key={idx}>
            <div className='card w-72 bg-base-100 shadow-xl'>
              <figure>
                <img className='w-full h-32' src={menuItem?.image} alt='Shoes' />
              </figure>
              <p className='absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white'>
                ${menuItem?.price}
              </p>
              <div className='card-body flex flex-col items-center'>
                <h2 className='card-title'>{menuItem?.title}</h2>
                <p>{menuItem?.ingredients}</p>
                <div className='card-actions justify-end'>
                  <NavLink to={`mealdetails/${menuItem?._id}`}>
                    <button className='btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4'>
                      Details
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>{loading && <LoaderAnimations />}</div>
    </div>
  );
};

export default AllMeals;




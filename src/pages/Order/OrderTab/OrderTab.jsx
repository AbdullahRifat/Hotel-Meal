// import FoodCard from '../../../components/FoodCard/FoodCard';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";
// import "swiper/css";
// import "swiper/css/pagination";

// const OrderTab = ({ items }) => {
//     const pagination = {
//         clickable: true,
//         renderBullet: function (index, className) {
//             return '<span class="' + className + '">' + (index + 1) + "</span>";
//         },
//     };
//     return (
//         <div >

//             <Swiper
//                 pagination={pagination}
//                 modules={[Pagination]}
//                 className="mySwiper"
//             >
//                 <SwiperSlide>
//                     <div className='grid md:grid-cols-3 gap-10'>
//                         {
//                             items.map(item => <FoodCard
//                                 key={item._id}
//                                 item={item}
//                             ></FoodCard>)
//                         }
//                     </div>

//                 </SwiperSlide>

//             </Swiper>
//         </div>
//     );
// };

// export default OrderTab;

import { useState, useEffect } from 'react';
import FoodCard from '../../../components/FoodCard/FoodCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderAnimations from '../../Shared/Loader/LoaderAnmations';

const OrderTab = ({ items }) => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6; // Display 6 items per page

    useEffect(() => {
        // Set the initial visible items to the first 6 items
        const initialVisibleItems = items.slice(0, itemsPerPage);
        setVisibleItems(initialVisibleItems);
        
        // Check if there are more items to load
        if (initialVisibleItems.length >= items.length) {
            setHasMore(false);
        }
    }, [items]);

    const fetchMoreData = () => {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newVisibleItems = items.slice(startIndex, endIndex);

        setVisibleItems(prevItems => [...prevItems, ...newVisibleItems]);
        setPage(page + 1);

        // Check if all items are loaded
        if (endIndex >= items.length) {
            setHasMore(false);
        }
    };

    return (
        <InfiniteScroll
            dataLength={visibleItems.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoaderAnimations className="min-h-1/2" />}
            endMessage={<p className='text-3xl font-bold text-center'>No more items to show</p>}
        >
            <Swiper pagination={{ clickable: true }} className="mySwiper">
                <SwiperSlide>
                    <div className="grid md:grid-cols-3 gap-10">
                        {visibleItems.map((item, index) => (
                            <FoodCard key={index} item={item}></FoodCard>
                        ))}
                    </div>
                </SwiperSlide>
            </Swiper>
        </InfiniteScroll>
    );
};

export default OrderTab;



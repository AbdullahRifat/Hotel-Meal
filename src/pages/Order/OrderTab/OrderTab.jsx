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
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderAnimations from '../../Shared/Loader/LoaderAnmations';

const OrderTab = ({ items }) => {
    const [visibleItems, setVisibleItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6; // Adjust this as per your requirement
    const delayDuration = 1000; // Adjust the delay duration in milliseconds

    useEffect(() => {
        // Reset the visible items when items prop changes (e.g., due to tab change)
        setVisibleItems([]);
        setPage(1);
        setHasMore(true);
    }, [items]);

    const fetchMoreData = () => {
        // Calculate the range of items to display based on pagination
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newVisibleItems = items.slice(startIndex, endIndex);

        setVisibleItems(prevItems => [...prevItems, ...newVisibleItems]);
        setPage(page + 1);

        // Show loader and delay for the next set of items
        setTimeout(() => {
            // Check if all items are loaded
            if (endIndex >= items.length) {
                setHasMore(false);
            }
        }, delayDuration);
    };

    return (
        <InfiniteScroll
            dataLength={visibleItems.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoaderAnimations></LoaderAnimations>}
            endMessage={<p className=' text-3xl font-bold text-center'>No more items to show</p>}
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


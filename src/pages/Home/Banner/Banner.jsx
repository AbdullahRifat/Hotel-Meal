import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';

import { FaSearch } from "react-icons/fa"; // Example icon from react-icons

const Banner = () => {
    return (
        <div className='relative'>
            <Carousel>
                <div>
                    <img src={img1} />
                </div>
                <div>
                    <img src={img2} />
                </div>
             
            </Carousel>
            <div className='absolute top-32 z-10 left-1/2 transform -translate-x-1/2 text-center w-1/3'>
                <div className='border-2 border-sky-500 bg-white rounded-full p-2 flex justify-center items-center'>
                    <input className='w-full bg-white bg-transparent outline-none pl-4 pr-12' type="search" placeholder='Search' />
                    
                    <div className='absolute right-2'>
                        <FaSearch /> {/* Replace with your actual search icon component */}
                    </div>
                </div>
                <p className='text-3xl mt-8 font-bold text-primary-500 rounded-md italic bg-sky-400'>Healthy And Best Food For University Students</p>
            </div>
        </div>
    );
};

export default Banner;

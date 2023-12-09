import axios from "axios";
//https://hotel-meal.vercel.app

const axiosPublic = axios.create(
    {
        baseURL: 'https://hotel-meal.vercel.app'
    }
);

const useAxiosPublic = () => {
   
    return axiosPublic;
};

export default useAxiosPublic;